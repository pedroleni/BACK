const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const { validationPassword, setError } = require('../../helpers/utils');

const schema = new Schema(
	{
		name: { type: String, required: true },
		nick: { type: String, unique: true, required: true },
		password: { type: String, required: true },
		isAdmin: { type: String },
		email: { type: String },
		image: { type: String },
		location: { type: String },
	},
	{
		timestamps: true,
	}
);

schema.pre('save', function (next) {
	if (!validationPassword(this.password))
		return next(setError('400', 'Contraseña Invalida '));
	this.password = bcrypt.hashSync(this.password, 16);
	next();
});

module.exports = mongoose.model('user', schema);
