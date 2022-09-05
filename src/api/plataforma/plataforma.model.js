const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
	{
		name: { type: String },
		company: { type: String },
		year: { type: String },
		image: { type: String },

		// juego:{type: String },
		// plataforma:{type: String },
		// comentarios:{type: String },
		// likes: {type: Array, default: []},
		// juego: [{ type: Schema.Types.ObjectId, ref: "companies", required: true }],
		// plataformas: [{ type: Schema.Types.ObjectId, ref: "companies", required: true }],
		// comentarios: [{ type: Schema.Types.ObjectId, ref: "companies", required: true }],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('plataforma', schema);
