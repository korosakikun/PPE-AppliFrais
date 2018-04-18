var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fraisSchema = require('./frais.js');

var ficheDeFraisSchema = new Schema({
	user: Schema.Types.ObjectId,
	mois: String,
	annee: Number,
	etat: String,
	fraisForfait: [ fraisSchema ],
	fraisHorsForfait: [ fraisSchema ],
	dateCreation: { type: Date, default: Date.now},
	dateModification: { type: Date, default: Date.now}
})

module.exports = ficheDeFraisSchema;
