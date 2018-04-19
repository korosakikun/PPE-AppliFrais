
var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongoose = require('mongoose');
var moment = require('moment');
var userSchema = require('../schema/user.js');

mongoose.connect(config.connectionString, function(err) {
  if (err) {
    throw err;
  }
});

var userModel = mongoose.model('user', userSchema);

var service = {};

service.authenticate = authenticate;
service.getAll = getAll;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function authenticate(Login, password) {
  var deferred = Q.defer();
  userModel.findOne({
    Login: Login
  }, function(err, user) {
		if (err) {
			deferred.reject(err.name + ': ' + err.message);
		}

    if (user && bcrypt.compareSync(password, user.hash)) {
      // authentication successful
      deferred.resolve({
        _id: user._id,
        Nom: user.Nom,
        Prenom: user.Prenom,
        Adresse: user.Adresse,
        Ville: user.Ville,
        cp: user.cp,
        dateEmbauche: user.dateEmbauche,
        type: user.type,
        token: jwt.sign({
          sub: user._id
        }, config.secret)
      });
    } else {
      // authentication failed
      deferred.resolve();
    }
  });

  return deferred.promise;
}

function getAll() {
  var deferred = Q.defer();

  userModel.find({type: { $ne: "admin"}}, function(err, users) {
    if (err) {
      deferred.reject(err.name + ': ' + err.message);
    }

    // return users (without hashed passwords)
    users = _.map(users, function(user) {
      return _.omit(user, 'hash');
    });

    deferred.resolve(users);
  });

  return deferred.promise;
}

function create(userParam) {
  var deferred = Q.defer();
  // validation
  userModel.findOne({
      Login: userParam.Login
    },
    function(err, user) {
      if (err) {
        deferred.reject(err.name + ': ' + err.message);
      }
      if (user) {
        deferred.reject(`Nom d'utilisateur ${userParam.Login} déja existants`);
      } else {
        var user = new userModel(_.omit(userParam, 'password'));
        user.hash = bcrypt.hashSync(userParam.password, 10);
        user.save(function(err) {
          if (err) {
            return deferred.reject(`Erreur création utilisateur ${userParam.Login}`)
          }
					deferred.resolve();
        });

      }
    });
  return deferred.promise;
}

function update(Login, userParam) {
  var deferred = Q.defer();

  // validation
  userModel.findOne(Login, function(err, user) {
    if (err) deferred.reject(err.name + ': ' + err.message);

    if (user.Login !== userParam.Login) {
      // username has changed so check if the new username is already taken
      userModel.findOne({
          username: userParam.username
        },
        function(err, user) {
          if (err) deferred.reject(err.name + ': ' + err.message);

          if (user) {
            // username already exists
            deferred.reject(`Nom d'utilisateur ${req.body.username} déja existants`)
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
      Login: userParam.Login,
      Nom: userParam.Nom,
      Prenom: userParam.Prenom,
      Adresse: userParam.Adresse,
      Ville: userParam.Ville,
      cp: userParam.cp,
      dateEmbauche: userParam.dateEmbauche
    };

    // update password if it was entered
    if (userParam.password) {
      set.hash = bcrypt.hashSync(userParam.password, 10);
    }

    userModel.update({
        Login: userParam.Login
      }, {
        set
      },
      function(err, doc) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        deferred.resolve();
      });
  }

  return deferred.promise;
}

function _delete(Login) {
  var deferred = Q.defer();

  userModel.remove({
      Login: Login
    },
    function(err) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve();
    });

  return deferred.promise;
}
