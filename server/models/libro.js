const mongoose = require("mongoose");

const LibroSchema = mongoose.Schema({
    nombre: {
        type: String,
        maxLength: 50,
        minLength: 4,
        require: true
    },
    author: {
        type: String,
        maxLength: 20,
        minLength: 4,
        require: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("tecsolutionslibros", LibroSchema)