const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    autor: { type: String, required: true },
    contenido: { type: String, unique: true ,required: true },
    fecha:{type: String, required: true },
    
    // juego:{type: String },
    // plataforma:{type: String },
    // comentarios:{type: String },
    // likes: {type: Array, default: []},
    // juego: [{ type: Schema.Types.ObjectId, ref: "companies", required: true }],
    // plataformas: [{ type: Schema.Types.ObjectId, ref: "companies", required: true }],
    // comentarios: [{ type: Schema.Types.ObjectId, ref: "companies", required: true }],
    
},
    {
        timestamps: true
    }
);


module.exports = mongoose.model('comentario', schema);