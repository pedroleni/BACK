const Juego = require("./juego.model");
const { setError } = require("../../helpers/utils");
const { deleteFile } = require("../../middleware/delete-file");

//----------------------------------------------------------------------------------------------
const getAll = async (req, res, next) => {
  try {
    const juego = await Juego.find();
    return res.json({
      status: 200,
      message: "Recovered all juego",
      data: { juego },
    });
  } catch (error) {
    return next(setError(500, "Failed all juego"));
  }
};
//----------------------------------------------------------------------------------------------
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const juego = await Juego.findById(id);
    if (!juego) return next(setError(404, "juego not found"));
    return res.json({
      status: 200,
      message: "Recovered juego by id",
      data: { juego },
    });
  } catch (error) {
    return next(setError(500, "Failed juego by id"));
  }
};
//----------------------------------------------------------------------------------------------
const create = async (req, res, next) => {
  let image;
  try {
    const juegoToSave = new Juego(req.body);
    if (req.file) juegoToSave.image = req.file.path;
    image = juegoToSave.image;
    const juegoInDb = await juegoToSave.save();


    return res.json({
      status: 201,
      message: "Created new juego",
      data: { juegoInDb },
    }
    );
  } catch (error) {
    if(error) {
      deleteFile(image)
    }

    return next(setError(500, "Failed created juego"));
    
  }
  
};
//----------------------------------------------------------------------------------------------

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const juegoDB = await Juego.findById(id);
    if (!juegoDB) {
      return next("juego not found");
    }

  if (juegoDB && req.file) {
    deleteFile(juegoDB.image);
  }

    const patchJuegoDB = new Juego(req.body);

    patchJuegoDB._id = id;

    if (req.file) {
      patchJuegoDB.image = req.file.path;
    }
    const JuegoDB = await Juego.findByIdAndUpdate(id, patchJuegoDB);
    return res.status(200).json({ new: patchJuegoDB, old: JuegoDB });
  } catch (error) {
    
    return next("Error to modify user", error);
  }
};


//----------------------------------------------------------------------------------------------
const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const juegoDB = await Juego.findByIdAndDelete(id);

    if (!juegoDB) {
      return next("juego not found");
    }

    if (juegoDB) {
      deleteFile(juegoDB.image);
    }

    return res.status(200).json(juegoDB);
  } catch (error) {
    return next("This juego can't delete ", error);
  }
};
//------------------------------------PUT DE LIKE----------------------------------------------
const put = async (req, res, next) => {

  try {
    const juego = await Juego.findById(req.params.id);
    if (!juego.likes.includes(req.body.userId)) {
      await juego.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The juego has been liked");
    } else {
      await juego.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The juego has been disliked");
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