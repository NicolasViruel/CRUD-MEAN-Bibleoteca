const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    nombre: {
        type: String,
        maxLength: 50,
        minLength: 4,
        require: true
    },
    apellido: {
        type: String,
        maxLength: 50,
        minLength: 3,
        require: true,
    },
    email:{
        type: String,
        require: true,
        unique: true,
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    },
    // librosPrestados: [{
    //     libroId: { type: mongoose.Schema.Types.ObjectId, ref: 'TecnoSolutionsLibros' },
    //     titulo: String,
    // }],
})

module.exports = mongoose.model("tecsolutionsusuarios" , UserSchema)