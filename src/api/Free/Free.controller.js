const Free = require('./Free.model');
const { setError } = require('../../helpers/utils');
const { deleteFile } = require('../../middleware/delete-file');

//----------------------------------------------------------------------------------------------
const getAll = async (req, res, next) => {
	try {
		const free = await Free.find();
		return res.json({
			status: 200,
			message: 'Recovered all free game',
			data: { free },
		});
	} catch (error) {
		return next(setError(500, 'Failed all free game'));
	}
};
//----------------------------------------------------------------------------------------------
const getById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const free = await Free.findById(id);
		if (!free) return next(setError(404, 'free game not found'));
		return res.json({
			status: 200,
			message: 'Recovered free game by id',
			data: { free },
		});
	} catch (error) {
		return next(setError(500, 'Failed free game by id'));
	}
};
//----------------------------------------------------------------------------------------------
const create = async (req, res, next) => {
	let image;
	try {
		const freeToSave = new Free(req.body);
		const freeInDb = await freeToSave.save();

		return res.json({
			status: 201,
			message: 'Created new gamne',
			data: { freeInDb },
		});
	} catch (error) {

		return next(setError(500, 'Failed created game'));
	}
};
//----------------------------------------------------------------------------------------------

const update = async (req, res, next) => {
	try {
		const { id } = req.params;
		const freeDB = await Free.findById(id);
		if (!freeDB) {
			return next('free  game not found');
		}


		const patchFreeDB = new Free(req.body);

		patchFreeDB._id = id;

		const FreeDB = await Free.findByIdAndUpdate(
			id,
			patchFreeDB
		);
		return res.status(200).json({ new: patchFreeDB, old: FreeDB });
	} catch (error) {
		return next('Error to modify free game', error);
	}
};

//----------------------------------------------------------------------------------------------
const remove = async (req, res, next) => {
	try {
		const { id } = req.params;
		const freeDB = await Free.findByIdAndDelete(id);

		if (!freeDB) {
			return next('free game not found');
		}

		return res.status(200).json(freeDB);
	} catch (error) {
		return next("This free game can't delete ", error);
	}
};


//----------------------------------------------------------------------------------------------

module.exports = {
	getAll,
	getById,
	update,
	remove,
	create
};
