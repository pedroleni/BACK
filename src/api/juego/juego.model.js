const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
	{
		name: { type: String, required: true },
		descripcion: { type: String },
		desarrolladora:  { type: String },
		year: { type: String, required: true },
		type: { type: String },
		pegi: { type: String },
		image: { type: String },
		plataformas: { type: String },
		likes: {type: Array, default: []}
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('juego', schema);
