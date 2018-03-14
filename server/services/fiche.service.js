var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongoose = require('mongoose');
mongoose.connect(config.connectionString, function(err){
	if (err) { throw err; }
});

import { ficheDeFraisSchema } from './schema/ficheDeFrais.js';

var ficheDeFraisModel = mongoose.model('ficheDeFrais', ficheDeFraisSchema);

var service = {};

service.create = createFiche;
service.update = update;
service.delete = _delete;
service.ajoutFrais = ajoutFrais;

module.exports = service;

function createFiche(userParam) {
  var deferred = Q.defer();
	var date = moment();
	ficheDeFraisModel.findOne({
		user: userParam._id,
		mois: {"$gte": moment().startOf('month').toDate(), "$lt": moment().endOf('month').toDate()}
	}, function(err, fiche){
		if (err) {
      deferred.reject(err.name + ": " + err.message);
		}
		if (fiche) {
			deferred.resolve();
		} else {
			var fiche = new ficheDeFraisModel({
				user: userParam._id,
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

function ajoutFrais(userParam) {
  var deferred = Q.defer();
  ficheDeFraisModel.update({
			user: userParam._id,
			mois: {"$gte": moment().startOf('month').toDate(), "$lt": moment().endOf('month').toDate()}
    }, {
      $push: {
        'fraisForfait': userParam.fraisForfait
      }
    },
    function(err) {
      if (err){
				deferred.reject(err.name + ': ' + err.message)
			};
      deferred.resolve();
    });
  return deferred.promise;
}
