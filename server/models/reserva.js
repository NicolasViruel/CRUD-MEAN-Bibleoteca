const mongoose = require("mongoose");

const ReservaSchema = mongoose.Schema({
    usuario_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "tecsolutionsusuarios",
    },
    libro_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "tecsolutionslibros",
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    },
    devuelto: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("tecsolutionsreservas", ReservaSchema);