const UserRoutes = require("express").Router();

const { authorize } = require("../../middleware/auth");
const { getAll, getById, getBynick, update, remove, register,login } = require("./user.controller");
const upload = require("../../middleware/file");
// const rateLimit = require("express-rate-limit");

// const concertCreateRateLimit = rateLimit({
//   windowMs: 1 * 60 * 1000, // 1min
//   max: 40,
//   standardHeaders: true,
//   legacyHeaders: false,
// });

UserRoutes.post('/register',upload.single("image"), register);
UserRoutes.post('/login', login);
UserRoutes.get('/', getAll);
UserRoutes.get('/:id', getById);
UserRoutes.get('/nick/:nick', [authorize], getBynick);
UserRoutes.patch('/:id', [authorize], upload.single("image"), update);
UserRoutes.delete('/:id', [authorize], remove);

module.exports = UserRoutes;
