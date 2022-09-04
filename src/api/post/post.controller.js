const Post = require("./post.model");
const { setError } = require("../../helpers/utils");
const { deleteFile } = require("../../middleware/delete-file");

//----------------------------------------------------------------------------------------------
const getAll = async (req, res, next) => {
  try {
    const post = await Post.find();
    return res.json({
      status: 200,
      message: "Recovered all post",
      data: { post },
    });
  } catch (error) {
    return next(setError(500, "Failed all post"));
  }
};
//----------------------------------------------------------------------------------------------
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) return next(setError(404, "Post not found"));
    return res.json({
      status: 200,
      message: "Recovered post by id",
      data: { post },
    });
  } catch (error) {
    return next(setError(500, "Failed post by id"));
  }
};
//----------------------------------------------------------------------------------------------
const create = async (req, res, next) => {
  try {
    const postToSave = new Post(req.body);
    if (req.file) postToSave.image = req.file.path;
    const postInDb = await postToSave.save();
    return res.json({
      status: 201,
      message: "Created new post",
      data: { postInDb },
    }
    );
  } catch (error) {
    return next(setError(500, "Failed created post"));
  }
};
//----------------------------------------------------------------------------------------------

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const postDB = await Post.findById(id);
    if (!postDB) {
      return next("Post not found");
    }

    if (postDB && req.file) {
      deleteFile(postDB.image);
    }

    const patchPostDB = new req.body();

    patchPostDB._id = id;

    if (req.file) {
      patchPostDB.image = req.file.path;
    }
    const PostDB = await Post.findByIdAndUpdate(id, patchPostDB);
    return res.status(200).json({ new: patchPostDB, old: PostDB });
  } catch (error) {
    return next("Error to modify post", error);
  }
};

//----------------------------------------------------------------------------------------------
const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const postDB = await Post.findByIdAndDelete(id);

    if (!postDB) {
      return next("Post not found");
    }

    if (postDB) {
      deleteFile(postDB.image);
    }

    return res.status(200).json(postDB);
  } catch (error) {
    return next("This post can't delete ", error);
  }
};
//------------------------------------PUT DE LIKE----------------------------------------------
const put = async (req, res, next) => {

  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
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
