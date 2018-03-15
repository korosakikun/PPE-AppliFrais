var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fraisForfaitSchema = new Schema({
	date_consommation: { type: Date, default: Date.now},
	quantite: Number,
	type: {
		libelle: String,
		montant_unitaire: Number
	},
	dateCreation: { type: Date, default: Date.now},
	dateModification: { type: Date, default: Date.now}
})

module.exports = fraisForfaitSchema;
