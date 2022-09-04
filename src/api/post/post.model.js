const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bcrypt = require('bcrypt');
const {validationPassword, setError} = require ('../../helpers/utils');


const schema = new Schema({
    titulo: { type: String, required: true },
    autor: { type: String },
    fecha:{type: String },
    contenido: { type: String },
    image: { type: String },
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

schema.pre('save', function (next){
    if (!validationPassword(this.password)) return next (setError('400','Contraseña Invalida '))
    this.password =bcrypt.hashSync(this.password, 16);
    next();

});

module.exports = mongoose.model('post', schema);