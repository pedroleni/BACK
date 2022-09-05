const Plataforma = require('./plataforma.model');
const { setError } = require('../../helpers/utils');
const { deleteFile } = require('../../middleware/delete-file');

//----------------------------------------------------------------------------------------------
const getAll = async (req, res, next) => {
	try {
		const plataforma = await Plataforma.find();
		return res.json({
			status: 200,
			message: 'Recovered all plataforma',
			data: { plataforma },
		});
	} catch (error) {
		return next(setError(500, 'Failed all plataforma'));
	}
};
//----------------------------------------------------------------------------------------------
const getById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const plataforma = await Plataforma.findById(id);
		if (!plataforma) return next(setError(404, 'plataforma not found'));
		return res.json({
			status: 200,
			message: 'Recovered plataforma by id',
			data: { plataforma },
		});
	} catch (error) {
		return next(setError(500, 'Failed plataforma by id'));
	}
};
//----------------------------------------------------------------------------------------------
const create = async (req, res, next) => {
	let image;
	try {
		const plataformaToSave = new Plataforma(req.body);
		if (req.file) plataformaToSave.image = req.file.path;
		image = plataformaToSave.image;
		const plataformaInDb = await plataformaToSave.save();

		return res.json({
			status: 201,
			message: 'Created new plataforma',
			data: { plataformaInDb },
		});
	} catch (error) {
		if (error) {
			deleteFile(image);
		}

		return next(setError(500, 'Failed created plataforma'));
	}
};
//----------------------------------------------------------------------------------------------

const update = async (req, res, next) => {
	try {
		const { id } = req.params;
		const plataformaDB = await Plataforma.findById(id);
		if (!plataformaDB) {
			return next('plataforma not found');
		}

		if (plataformaDB && req.file) {
			deleteFile(plataformaDB.image);
		}

		const patchPlataformaDB = new Plataforma(req.body);

		patchPlataformaDB._id = id;

		if (req.file) {
			patchPlataformaDB.image = req.file.path;
		}
		const PlataformaDB = await Plataforma.findByIdAndUpdate(
			id,
			patchPlataformaDB
		);
		return res.status(200).json({ new: patchPlataformaDB, old: PlataformaDB });
	} catch (error) {
		return next('Error to modify user', error);
	}
};

//----------------------------------------------------------------------------------------------
const remove = async (req, res, next) => {
	try {
		const { id } = req.params;
		const plataformaDB = await Plataforma.findByIdAndDelete(id);

		if (!plataformaDB) {
			return next('plataforma not found');
		}

		if (plataformaDB) {
			deleteFile(plataformaDB.image);
		}

		return res.status(200).json(plataformaDB);
	} catch (error) {
		return next("This plataforma can't delete ", error);
	}
};
//------------------------------------PUT DE LIKE----------------------------------------------
const put = async (req, res, next) => {
	try {
		const plataforma = await Plataforma.findById(req.params.id);
		if (!plataforma.likes.includes(req.body.userId)) {
			await plataforma.updateOne({ $push: { likes: req.body.userId } });
			res.status(200).json('The plataforma has been liked');
		} else {
			await plataforma.updateOne({ $pull: { likes: req.body.userId } });
			res.status(200).json('The plataforma has been disliked');
		}
	} catch (err) {
		res.status(500).json(err);
	}
};
//----------------------------------------------------------------------------------------------

module.exports = {
	getAll,
	getById,
	update,
	remove,
	create,
	put,
};
