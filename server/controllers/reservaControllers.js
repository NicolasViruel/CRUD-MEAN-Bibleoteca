// const reservaModelo = require("../models/libro");
// const usuarioModelo = require("../models/usuario");
const reservaModelo = require("../models/reserva")
const mongoose = require('mongoose');
// const traerReserva =  async (req, res) =>{
//     try {
//         const reservas = await reservaModelo.find();
//         if (reservas) {
//             return res.status(200).send(reservas);
//         }else{
//             return res.status(200).send([]);
//         }
//     } catch (error) {
//         res.status(500).send(error);
//     };
// };

// const crearReserva = async (req, res) =>{
//     const {nombre} = req.body;

//     const nuevaReserva = new reservaModelo({
//         nombre
//     });
//     try {
//         const reserva = await nuevaReserva.save();
//         return res.status(200).send(reserva);
//     } catch (error) {
//         res.status(400).send({ msg: "La reserva ya existe"});
//         console.log(error);
//     }
// }

// const eliminarReserva = async (req, res) =>{
//     const { id } = req.params;
//     try {
//         await reservaModelo.findByIdAndDelete(id);
//         res.status(200).send({msg: "La Reserva fue eliminada"})
//     } catch (error) {
//         res.status(500).send({msg: "Error al eliminar la reserva"})
//     }
// }

// const actualizarReserva = async (req, res) =>{
//     try {
//         const {nombre} = req.body;
//         let reserva = await reservaModelo.findById(req.params.id);

//         if (!reserva) {
//             res.status(404).send({msg:"No existe la Reserva"})
//         }

//         reserva.nombre = nombre;

//         reserva = await reservaModelo.findOneAndUpdate({ _id: req.params.id }, reserva, { new: true})
//         res.json(reserva);

//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Hubo un error al actualizar la Reserva')
//     }
// }

// const obtenerReserva = async (req, res) =>{
//     try {

//         let reserva = await reservaModelo.findById(req.params.id);

//         if (!reserva) {
//             res.status(404).send({msg:"No existe la reserva"})
//         }

//         res.json(reserva);

//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Hubo un error al actualizar la reserva')
//     }
// }

// const reservarLibro = async (req, res) => {
//     const { usuarioId, libroId } = req.body;

//     try {
//         const usuario = await usuarioModelo.findById(usuarioId);

//         if (!usuario) {
//             return res.status(404).json({ mensaje: "Usuario no encontrado" });
//         }

//         usuario.librosPrestados.push({ libro: libroId });
//         await usuario.save();

//         return res.status(200).json({ mensaje: "Libro reservado con éxito", usuario });
//     } catch (error) {
//         return res.status(500).json({ mensaje: "Error al reservar el libro", error });
//     }
// };

const crearReserva = async (req, res) => {
    const { usuario_id, libro_id } = req.body;

    const newReserva = new reservaModelo({
        usuario_id,
        libro_id
    });

    try {
        const reserva = await newReserva.save();
        return res.status(201).send(reserva);
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).send({ msg: "La reserva ya existe" });
        }
        return res.status(500).send({ msg: "Error en el servidor" });
    }
};

const eliminarReserva = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await reservaModelo.findByIdAndDelete(id);
        if (result) {
            return res.status(200).send({ msg: "La reserva se eliminó con éxito" });
        } else {
            return res.status(404).send({ msg: "La reserva no se encontró" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: "Error en el servidor" });
    }
};

// const traerReservas = async (req, res) => {
//     try {
//         console.log(req.params.id);
//         const userId = new mongoose.Types.ObjectId(req.params.id);
//         const reserva = await reservaModelo.find({ usuario_id: userId }).populate("libro_id");
//         return res.status(200).send(reserva);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ msg: "Error en el servidor" });
//     }
// };

// const traerReservas = async (req, res) => {
//     try {
//         console.log(req.params.id);

//         // Utiliza createFromHexString para convertir la cadena del ID a un ObjectId
//         const userId = mongoose.Types.ObjectId.createFromHexString(req.params.id);

//         const reserva = await reservaModelo.find({ usuario_id: userId }).populate("libro_id");
//         return res.status(200).send(reserva);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ msg: "Error en el servidor" });
//     }
// };

const traerReservas = async (req , res) =>{
    try {
        console.log(req.params.id);
        const reserva = await reservaModelo.find({ usuario_id: req.params.id}).populate("libro_id");
        if (reserva) {
            return res.status(200).send(reserva);
        }else{
            return res.status(200).send([]);
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
}



module.exports ={
    // traerReserva,
    // crearReserva,
    // eliminarReserva,
    // actualizarReserva,
    // obtenerReserva,
    // reservarLibro,
    traerReservas,
    eliminarReserva,
    crearReserva
}