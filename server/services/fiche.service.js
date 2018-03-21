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
service.getAll = getAll;
service.ajoutFrais = ajoutFrais;

module.exports = service;

function createFiche(_id) {
  var deferred = Q.defer();
  var date = moment();
  console.log(_id);
  ficheDeFraisModel.findOne({
    user: _id,
    mois: {
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
      var fiche = new ficheDeFraisModel({
        user: _id,
        etat: "Creer",
        fraisForfait: []
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

function getAll(_id) {
  var deferred = Q.defer();
  ficheDeFraisModel.find({user: _id}, function(err, ficheDeFrais) {
    if (err) {
      deferred.reject(err.name + ': ' + err.message);
    }

    deferred.resolve(ficheDeFrais);
  });

  return deferred.promise;
}

function ajoutFrais(userParam) {
  var deferred = Q.defer();
  console.log(userParam.fraisForfait);
  ficheDeFraisModel.update({
      user: userParam._id,
      mois: {
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
