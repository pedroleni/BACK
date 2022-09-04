const PostRoutes = require("express").Router();

const { authorize } = require("../../middleware/auth");
const { getAll, getById, update, remove, create, put  } = require("./post.controller");
const upload = require("../../middleware/file");
// const rateLimit = require("express-rate-limit");

// const concertCreateRateLimit = rateLimit({
//   windowMs: 1 * 60 * 1000, // 1min
//   max: 40,
//   standardHeaders: true,
//   legacyHeaders: false,
// });

PostRoutes.post('/create',upload.single("image"), create);
PostRoutes.get('/', getAll);
PostRoutes.get('/:id', getById);
PostRoutes.patch('/:id', [authorize], upload.single("image"), update);
PostRoutes.delete('/:id', [authorize], remove);
PostRoutes.delete('/:id/like', [authorize], put);

module.exports = PostRoutes;
