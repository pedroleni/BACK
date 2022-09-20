const JuegoRoutes = require('express').Router();

const { authorize } = require('../../middleware/auth');
const {
	getAll,
	getById,
	update,
	remove,
	create,
	put,
} = require('./juego.controller');
const upload = require('../../middleware/file');
// const rateLimit = require("express-rate-limit");

// const concertCreateRateLimit = rateLimit({
//   windowMs: 1 * 60 * 1000, // 1min
//   max: 40,
//   standardHeaders: true,
//   legacyHeaders: false,
// });

JuegoRoutes.post('/create', upload.single('image'), create);
JuegoRoutes.get('/', getAll);
JuegoRoutes.get('/:id', getById);
JuegoRoutes.patch('/:id', [authorize], upload.single('image'), update);
JuegoRoutes.delete('/:id', [authorize], remove);
JuegoRoutes.put('/:id/like', [authorize], put);

module.exports = JuegoRoutes;
