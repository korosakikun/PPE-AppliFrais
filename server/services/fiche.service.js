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

module.exports = service;

function createFiche(_id) {
  var deferred = Q.defer();
  console.log(_id);
  ficheDeFraisModel.findOne({
    user: _id,
    dateCreation: {
      "$gte": moment().startOf('month').add(10, 'd').toDate(),
      "$lt": moment().endOf('month').add(10, 'd').toDate()
    }
  }, function(err, fiche) {
    if (err) {
      deferred.reject(err.name + ": " + err.message);
    }
    if (fiche) {
      deferred.resolve();
    } else {
      var annee = moment().year();
      var mois = moment().subtract(9, 'd').month();
      var fiche = new ficheDeFraisModel({
        user: _id,
        etat: "Creer",
        fraisForfait: [],
        annee,
        mois
      });
      fiche.save(function(err) {
        if (err) {
          deferred.reject(err.name + ': ' + err.message);
        }
      });
    }
  })
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
  ficheDeFraisModel.find(null, function(err, ficheDeFrais) {
    if (err) {
      deferred.reject(err.name + ': ' + err.message);
    }
    deferred.resolve(ficheDeFrais);
  });

  return deferred.promise;
}

function ajoutFrais(userParam) {
  var deferred = Q.defer();
  console.log(userParam);
  ficheDeFraisModel.update({
      user: userParam._id,
      dateCreation: {
        "$gte":moment().startOf('month').add(10, 'd').toDate(),
        "$lt": moment().endOf('month').add(10, 'd').toDate()
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
  console.log(userParam);
  ficheDeFraisModel.update({
      user: userParam._id,
      dateCreation: {
        "$gte":moment().startOf('month').add(10, 'd').toDate(),
        "$lt": moment().endOf('month').add(10, 'd').toDate()
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
