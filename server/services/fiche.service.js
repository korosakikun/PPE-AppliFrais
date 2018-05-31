var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var moment = require('moment');
var mongoose = require('mongoose');
mongoose.connect(config.connectionString, function(err) {
  if (err) {
    throw err;
  }
});

var ficheDeFraisSchema = require('../schema/ficheDeFrais.js');

var ficheDeFraisModel = mongoose.model('ficheDeFrais', ficheDeFraisSchema);

var service = {};

service.create = createFiche;
service.getAllForUser = getAllForUser;
service.ajoutFrais = ajoutFrais;
service.ajoutFraisHorsForfait = ajoutFraisHorsForfait;
service.getAll = getAll;
service.getAllNonTraite = getAllNonTraite;
service.changeStateFrais = changeStateFrais;
service.changeStateFiches = changeStateFiches;
service.changeStateFraisHorsForfait = changeStateFraisHorsForfait;
service.delete = _delete;
service.deleteHorsForfait = _deleteHorsForfait;

module.exports = service;

function createFiche(_id) {
  var deferred = Q.defer();
  //on verifie si une fiche existe déja pour le mois en cours
  var date = moment().subtract(9, 'd');
  var dateBegin = date.startOf('month').add(10, 'd').toDate()
  var dateEnd = date.endOf('month').add(10, 'd').toDate()
  ficheDeFraisModel.findOne({
    user: _id,
    dateCreation: {
      "$gte": dateBegin,
      "$lt": dateEnd
    }
  }, function(err, fiche) {
    if (err) {
      deferred.reject(err.name + ": " + err.message);
    }
    //si c'est le cas on ne fait rien
    if (fiche) {
      deferred.resolve();
    } else {
      //sinon on crée une nouvelles fiche pour le mois en cours
      getAllForUser(_id).then(function(fiches) {
        fiches.forEach( (fiche) => {
          changeStateFiches(fiche._id, "cloturée").then(function(){
          }).catch(function(err){
            console.log(err);
          })
        })
        var annee = moment().year();
        var mois = moment().subtract(9, 'd').month();
        var fiche = new ficheDeFraisModel({
          user: _id,
          etat: "Creer",
          fraisForfait: [],
          fraisHorsForfait: [],
          annee,
          mois
        });
        fiche.save(function(err) {
          if (err) {
            deferred.reject(err.name + ': ' + err.message);
          }
        });
        deferred.resolve();
      }).catch( function(err) {
        deferred.reject(err.name + ": " + err.message);
      })
    }
  })
  return deferred.promise;
}

function changeStateFiches(_id, etat) {
  var deferred = Q.defer();
  //on update le frais specifier avec un nouveau etat
  ficheDeFraisModel.update(
    {
      _id: _id
    },
    {
      "$set": {
        "etat": etat
      }
    },
    function(err) {
      if (err) {
        deferred.reject(err.name + ': ', err.message)
      };
      deferred.resolve();
    });
  return deferred.promise;
}

function getAllForUser(_id) {
  var deferred = Q.defer();
  ficheDeFraisModel.find({user: _id}, function(err, ficheDeFrais) {
    if (err) {
      deferred.reject(err.name + ': ' + err.message);
    }
    deferred.resolve(ficheDeFrais);
  });

  return deferred.promise;
}

function getAll() {
  var deferred = Q.defer();
  //on récupere toute les fiche de frais trier par visiteurs et on rajoute les informations sur les visiteurs
  ficheDeFraisModel.find(null).sort({"user": 1}).populate("user").exec(function(err, ficheDeFrais) {
    if (err) {
      deferred.reject(err.name + ': ' + err.message);
    }
    deferred.resolve(ficheDeFrais);
  });

  return deferred.promise;
}

function getAllNonTraite() {
  var deferred = Q.defer();
  //on récupere toute les fiche de frais trier par visiteurs et on rajoute les informations sur les visiteurs
  ficheDeFraisModel.find({
    $or : [
      { 'fraisForfait.etat': 'Creer'},
      { 'fraisHorsForfait.etat':'Creer'}
    ]
  },
  {fraisForfait: 1, fraisHorsForfait: 1, user: 1}
  ).populate("user").exec(function(err, ficheDeFrais) {
    if (err) {
      deferred.reject(err.name + ': ' + err.message);
    }
    deferred.resolve(ficheDeFrais);
  });

  return deferred.promise;
}

function changeStateFrais(fiche, frai, etat) {
  var deferred = Q.defer();
  //on update le frais specifier avec un nouveau etat
  ficheDeFraisModel.update(
    {
      _id: fiche, "fraisForfait._id" : frai
    },
    {
      "$set": {
        "fraisForfait.$.etat": etat
      }
    },
    function(err) {
      if (err) {
        deferred.reject(err.name + ': ', err.message)
      };
      deferred.resolve();
    });
  return deferred.promise;
}

function changeStateFraisHorsForfait(fiche, frai, etat) {
  var deferred = Q.defer();
  //on update le frais specifier avec un nouveau etat
  ficheDeFraisModel.update(
    {
      _id: fiche, "fraisHorsForfait._id" : frai
    },
    {
      "$set": {
        "fraisHorsForfait.$.etat": etat
      }
    },
    function(err) {
      if (err) {
        deferred.reject(err.name + ': ', err.message)
      };
      deferred.resolve();
    });
  return deferred.promise;
}

function ajoutFrais(userParam) {
  var deferred = Q.defer();
  var date = moment().subtract(9, 'd');
  var dateBegin = date.startOf('month').add(10, 'd').toDate()
  var dateEnd = date.endOf('month').add(10, 'd').toDate()
  // ajoute un frais sur le mois en cours
  ficheDeFraisModel.update({
      user: userParam._id,
      dateCreation: {
        "$gte": dateBegin,
        "$lt": dateEnd
      }
    }, {
      $push: {
        'fraisForfait': userParam.fraisForfait
      }
    },
    function(err) {
      if (err) {
        deferred.reject(err.name + ': ' + err.message)
      };
      deferred.resolve();
    });
  return deferred.promise;
}

function ajoutFraisHorsForfait(userParam) {
  var deferred = Q.defer();
  var date = moment().subtract(9, 'd');
  var dateBegin = date.startOf('month').add(10, 'd').toDate()
  var dateEnd = date.endOf('month').add(10, 'd').toDate()
  //ajoute un frais hors forfait sur le mois en cours
  ficheDeFraisModel.update({
      user: userParam._id,
      dateCreation: {
        "$gte": dateBegin,
        "$lt": dateEnd
      }
    }, {
      $push: {
        'fraisHorsForfait': userParam.fraisHorsForfait
      }
    },
    function(err) {
      if (err) {
        deferred.reject(err.name + ': ' + err.message)
      };
      deferred.resolve();
    });
  return deferred.promise;
}

function _delete(fiche, frai) {
  var deferred = Q.defer();

  ficheDeFraisModel.update({
      _id: fiche,
      "fraisForfait._id" : frai
    },
    {
      $pull : {
        "fraisForfait": {
          "_id": frai
        }
      }
    }, function(err) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve();
    });

  return deferred.promise;
}

function _deleteHorsForfait(fiche, frai) {
  var deferred = Q.defer();

  ficheDeFraisModel.update({
      _id: fiche,
      "fraisHorsForfait._id" : frai
    },
    {
      $pull : {
        "fraisHorsForfait": {
          "_id": frai
        }
      }
    }, function(err) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve();
    });

  return deferred.promise;
}
