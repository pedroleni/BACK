const Comentario = require('./comentario.model');
const { setError } = require('../../helpers/utils');
const { deleteFile } = require('../../middleware/delete-file');

//----------------------------------------------------------------------------------------------
const getAll = async (req, res, next) => {
	try {
		const comentario = await Comentario.find();
		return res.json({
			status: 200,
			message: 'Recovered all comentario',
			data: { comentario },
		});
	} catch (error) {
		return next(setError(500, 'Failed all comentario'));
	}
};
//----------------------------------------------------------------------------------------------
const getById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const comentario = await Comentario.findById(id);
		if (!comentario) return next(setError(404, 'comentario not found'));
		return res.json({
			status: 200,
			message: 'Recovered comentario by id',
			data: { comentario },
		});
	} catch (error) {
		return next(setError(500, 'Failed comentario by id'));
	}
};
//----------------------------------------------------------------------------------------------
const create = async (req, res, next) => {
	let image;
	try {
		const comentarioToSave = new Comentario(req.body);
		if (req.file) comentarioToSave.image = req.file.path;
		image = comentarioToSave.image;
		const comentarioInDb = await comentarioToSave.save();

		return res.json({
			status: 201,
			message: 'Created new comentario',
			data: { comentarioInDb },
		});
	} catch (error) {
		if (error) {
			deleteFile(image);
		}

		return next(setError(500, 'Failed created comentario'));
	}
};
//----------------------------------------------------------------------------------------------

const update = async (req, res, next) => {
	try {
		const { id } = req.params;
		const comentarioDB = await Comentario.findById(id);
		if (!comentarioDB) {
			return next('comentario not found');
		}

		if (comentarioDB && req.file) {
			deleteFile(comentarioDB.image);
		}

		const patchComentarioDB = new Comentario(req.body);

		patchComentarioDB._id = id;

		if (req.file) {
			patchComentarioDB.image = req.file.path;
		}
		const ComentarioDB = await Comentario.findByIdAndUpdate(
			id,
			patchComentarioDB
		);
		return res.status(200).json({ new: patchComentarioDB, old: ComentarioDB });
	} catch (error) {
		return next('Error to modify comentario', error);
	}
};

//----------------------------------------------------------------------------------------------
const remove = async (req, res, next) => {
	try {
		const { id } = req.params;
		const comentarioDB = await Comentario.findByIdAndDelete(id);

		if (!comentarioDB) {
			return next('comentario not found');
		}

		return res.status(200).json(comentarioDB);
	} catch (error) {
		return next("This comentario can't delete ", error);
	}
};
//------------------------------------PUT DE LIKE----------------------------------------------
const put = async (req, res, next) => {
	try {
		const comentario = await Comentario.findById(req.params.id);
		if (!comentario.likes.includes(req.body.userId)) {
			await comentario.updateOne({ $push: { likes: req.body.userId } });
			res.status(200).json('The comentario has been liked');
		} else {
			await comentario.updateOne({ $pull: { likes: req.body.userId } });
			res.status(200).json('The comentario has been disliked');
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
