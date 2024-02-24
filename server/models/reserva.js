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
    }
});

module.exports = mongoose.model("tecsolutionsreservas", ReservaSchema);