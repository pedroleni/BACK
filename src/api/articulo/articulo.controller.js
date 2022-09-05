const Articulo = require('./articulo.model');
const { setError } = require('../../helpers/utils');
const { deleteFile } = require('../../middleware/delete-file');

//----------------------------------------------------------------------------------------------
const getAll = async (req, res, next) => {
	try {
		const articulo = await Articulo.find();
		return res.json({
			status: 200,
			message: 'Recovered all articulo',
			data: { articulo },
		});
	} catch (error) {
		return next(setError(500, 'Failed all articulo'));
	}
};
//----------------------------------------------------------------------------------------------
const getById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const articulo = await Articulo.findById(id);
		if (!articulo) return next(setError(404, 'articulo not found'));
		return res.json({
			status: 200,
			message: 'Recovered articulo by id',
			data: { articulo },
		});
	} catch (error) {
		return next(setError(500, 'Failed articulo by id'));
	}
};
//----------------------------------------------------------------------------------------------
const create = async (req, res, next) => {
	let image;
	try {
		const articuloToSave = new Articulo(req.body);
		if (req.file) articuloToSave.image = req.file.path;
		image = articuloToSave.image;
		const articuloInDb = await articuloToSave.save();

		return res.json({
			status: 201,
			message: 'Created new articulo',
			data: { articuloInDb },
		});
	} catch (error) {
		if (error) {
			deleteFile(image);
		}

		return next(setError(500, 'Failed created articulo'));
	}
};
//----------------------------------------------------------------------------------------------

const update = async (req, res, next) => {
	try {
		const { id } = req.params;
		const articuloDB = await Articulo.findById(id);
		if (!articuloDB) {
			return next('articulo not found');
		}

		if (articuloDB && req.file) {
			deleteFile(articuloDB.image);
		}

		const patchArticuloDB = new Articulo(req.body);

		patchArticuloDB._id = id;

		if (req.file) {
			patchArticuloDB.image = req.file.path;
		}
		const ArticuloDB = await Articulo.findByIdAndUpdate(id, patchArticuloDB);
		return res.status(200).json({ new: patchArticuloDB, old: ArticuloDB });
	} catch (error) {
		return next('Error to modify user', error);
	}
};

//----------------------------------------------------------------------------------------------
const remove = async (req, res, next) => {
	try {
		const { id } = req.params;
		const articuloDB = await Articulo.findByIdAndDelete(id);

		if (!articuloDB) {
			return next('articulo not found');
		}

		if (articuloDB) {
			deleteFile(articuloDB.image);
		}

		return res.status(200).json(articuloDB);
	} catch (error) {
		return next("This articulo can't delete ", error);
	}
};
//------------------------------------PUT DE LIKE----------------------------------------------
const put = async (req, res, next) => {
	try {
		const articulo = await Articulo.findById(req.params.id);
		if (!articulo.likes.includes(req.body.userId)) {
			await articulo.updateOne({ $push: { likes: req.body.userId } });
			res.status(200).json('The articulo has been liked');
		} else {
			await articulo.updateOne({ $pull: { likes: req.body.userId } });
			res.status(200).json('The articulo has been disliked');
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
