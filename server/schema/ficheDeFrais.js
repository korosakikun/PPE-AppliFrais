var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fraisSchema = require('./frais.js');

var ficheDeFraisSchema = new Schema({
	user: {type: Schema.Types.ObjectId, ref: "user"},
	mois: String,
	annee: Number,
	etat: String,
	fraisForfait: [ fraisSchema ],
	fraisHorsForfait: [ fraisSchema ],
	dateCreation: { type: Date, default: Date.now},
	dateModification: { type: Date, default: Date.now}
})

module.exports = ficheDeFraisSchema;
