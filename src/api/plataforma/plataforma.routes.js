const PlataformaRoutes = require("express").Router();

const { authorize } = require("../../middleware/auth");
const { getAll, getById, update, remove, create, put  } = require("./plataforma.controller");
const upload = require("../../middleware/file");
// const rateLimit = require("express-rate-limit");

// const concertCreateRateLimit = rateLimit({
//   windowMs: 1 * 60 * 1000, // 1min
//   max: 40,
//   standardHeaders: true,
//   legacyHeaders: false,
// });

PlataformaRoutes.post('/create',upload.single("image"), create);
PlataformaRoutes.get('/', getAll);
PlataformaRoutes.get('/:id', getById);
PlataformaRoutes.patch('/:id', [authorize], upload.single("image"), update);
PlataformaRoutes.delete('/:id', [authorize], remove);
PlataformaRoutes.delete('/:id/like', [authorize], put);

module.exports = PlataformaRoutes;
