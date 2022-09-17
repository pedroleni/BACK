const FreeRoutes = require('express').Router();

const { authorize } = require('../../middleware/auth');
const {
	getAll,
	getById,
	update,
	remove,
	create

} = require('./Free.controller');



FreeRoutes.post('/create', [authorize], create);
FreeRoutes.get('/', getAll);
FreeRoutes.get('/:id', getById);
FreeRoutes.patch('/:id', [authorize], update);
FreeRoutes.delete('/:id', [authorize], remove);

module.exports = FreeRoutes;