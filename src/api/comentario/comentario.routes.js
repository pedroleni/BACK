const ComentarioRoutes = require("express").Router();

const { authorize } = require("../../middleware/auth");
const { getAll, getById, update, remove, create, put  } = require("./comentario.controller");
const upload = require("../../middleware/file");
// const rateLimit = require("express-rate-limit");

// const concertCreateRateLimit = rateLimit({
//   windowMs: 1 * 60 * 1000, // 1min
//   max: 40,
//   standardHeaders: true,
//   legacyHeaders: false,
// });

ComentarioRoutes.post('/create', [authorize], upload.single("image"), create);
ComentarioRoutes.get('/', getAll);
ComentarioRoutes.get('/:id', getById);
ComentarioRoutes.patch('/:id', [authorize], upload.single("image"), update);
ComentarioRoutes.delete('/:id', [authorize], remove);
ComentarioRoutes.delete('/:id/like', [authorize], put);

module.exports = ComentarioRoutes;
