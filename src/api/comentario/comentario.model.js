const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
	{
		autor: { type: String, required: true },
		contenido: { type: String, unique: true, required: true },
		likes: {type: Array, default: []},
		articulo: { type: Schema.Types.ObjectId, ref: "articulo", default: [] }
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('comentario', schema);
