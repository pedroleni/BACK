const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
	{
		name: { type: String },
		company: { type: String },
		year: { type: String },
		image: { type: String }
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('plataforma', schema);
