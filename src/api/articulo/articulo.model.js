const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
	{
		titulo: { type: String, required: true },
		autor: { type: String, required: true },
		contenido: { type: String, required: true },
		resumen: { type: String},
		image: { type: String },
		plataformas: { type: String },
		juego:{type: String },
		likes: {type: Array, default: []}
		
		
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('articulo', schema);
