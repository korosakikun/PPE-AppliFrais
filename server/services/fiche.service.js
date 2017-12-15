var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, {
  native_parser: true
});
db.bind('users');

var service = {};

service.create = createFiche;
service.update = update;
service.delete = _delete;
service.ajoutFrais = ajoutFrais;

module.exports = service;

function createFiche(userParam) {
  var deferred = Q.defer();
  var date = userParam.date;
  console.log(date);
  db.users.findOne({
      _id: mongo.helper.toObjectID(userParam.user._id),
      fichesDeFrais: {
        $elemMatch: {
          date
        }
      }
    },
    function(err, ficheDeFrais) {
      if (err) deferred.reject(err.name + ": " + err.message);
      console.log(ficheDeFrais)
      if (ficheDeFrais) {
        deferred.reject(`Fiche de frais pour ce mois déja crée`);
      } else {
        db.users.findAndModify({
            _id: mongo.helper.toObjectID(userParam.user._id)
          }, [], {
            $push: {
              fichesDeFrais: {
                date,
                fraisForfait: []
              }
            }
          }, {
            new: true,
            upsert: true
          },
          function(err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);
            deferred.resolve(user.value.fichesDeFrais);
          })
      }
    });
  return deferred.promise;
}

function ajoutFrais(userParam) {
  var deferred = Q.defer();
  var date = userParam.date;
  console.log(userParam);
  db.users.update({
      _id: mongo.helper.toObjectID(userParam._id),
      'fichesDeFrais.date': date
    }, {
      $push: {
        'fichesDeFrais.$.fraisForfait': userParam.fraisForfait
      }
    },
    function(err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve();
    });
  return deferred.promise;

}

function update(_id, userParam) {
  var deferred = Q.defer();

  // validation
  db.users.findById(_id, function(err, user) {
    if (err) deferred.reject(err.name + ': ' + err.message);

    if (user.username !== userParam.username) {
      // username has changed so check if the new username is already taken
      db.users.findOne({
          username: userParam.username
        },
        function(err, user) {
          if (err) deferred.reject(err.name + ': ' + err.message);

          if (user) {
            // username already exists
            deferred.reject('Username "' + req.body.username + '" is already taken')
          } else {
            updateUser();
          }
        });
    } else {
      updateUser();
    }
  });

  function updateUser() {
    // fields to update
    var set = {
      firstName: userParam.firstName,
      lastName: userParam.lastName,
      username: userParam.username,
    };

    // update password if it was entered
    if (userParam.password) {
      set.hash = bcrypt.hashSync(userParam.password, 10);
    }

    db.users.update({
        _id: mongo.helper.toObjectID(_id)
      }, {
        $set: set
      },
      function(err, doc) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        deferred.resolve();
      });
  }

  return deferred.promise;
}

function _delete(_id) {
  var deferred = Q.defer();

  db.users.remove({
      _id: mongo.helper.toObjectID(_id)
    },
    function(err) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve();
    });

  return deferred.promise;
}
