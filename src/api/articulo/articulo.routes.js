const ArticuloRoutes = require('express').Router();

const { authorize } = require('../../middleware/auth');
const {
	getAll,
	getById,
	update,
	remove,
	create,
	put,
} = require('./articulo.controller');
const upload = require('../../middleware/file');
// const rateLimit = require("express-rate-limit");

// const concertCreateRateLimit = rateLimit({
//   windowMs: 1 * 60 * 1000, // 1min
//   max: 40,
//   standardHeaders: true,
//   legacyHeaders: false,
// });

ArticuloRoutes.post('/create', upload.single('image'), create);
ArticuloRoutes.get('/', getAll);
ArticuloRoutes.get('/:id', getById);
ArticuloRoutes.patch('/:id', [authorize], upload.single('image'), update);
ArticuloRoutes.delete('/:id', [authorize], remove);
ArticuloRoutes.put('/:id/like', [authorize], put);

module.exports = ArticuloRoutes;
