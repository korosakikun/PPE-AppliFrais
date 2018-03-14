var mongoose = require('mongoose');
var Schema = mongoose.Schema;
import { fraisForfaitSchema } from './fraisForfait.js';

export var ficheDeFraisSchema = new Schema({
	user: Schema.ObjectID,
	mois: {type: Date, default: Date.now},
	etat: String,
	fraisForfait: [ fraisForfaitSchema ]
	dateCreation: { type: Date, default: Date.now},
	dateModification: { type: Date, default: Date.now}
})
