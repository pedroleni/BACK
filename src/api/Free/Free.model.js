const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
	{
		title: { type: String },
		thumbnail: { type: String},
		short_description: { type: String},
        game_url: { type: String},
        genre: { type: String},
        platform: { type: String},
        publisher: { type: String},
        developer: { type: String},
        release_date: { type: String},
        freetogame_profile_url: { type: String},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('free', schema);
