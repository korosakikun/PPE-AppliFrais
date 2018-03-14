var mongoose = require('mongoose');
var Schema = mongoose.Schema;

export var userSchema = new Schema({
	Login: String,
	hash: String,
	Nom: String,
	Prenom: String,
	Adresse: String,
	Ville: String,
	cp: String,
	dateEmbauche: { type: Date, default: Date.now},
	dateCreation: { type: Date, default: Date.now},
	dateModification: { type: Date, default: Date.now}
})
