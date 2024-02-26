const reservaModelo = require("../models/reserva")
const libroModelo = require("../models/libro");
const usuarioModelo = require("../models/usuario");

const crearReserva = async (req, res) => {
    const { usuario_id, libro_id } = req.body;

    try {
        // Verificar si el libro ya está reservado por cualquier usuario
        const reservaExistente = await reservaModelo.findOne({
            libro_id,
            devuelto: false
        });

        if (reservaExistente) {
            return res.status(400).send({ msg: "Este libro ya está reservado por otro usuario" });
        }

        // Verificar el límite de 5 libros por usuario
        const reservasUsuario = await reservaModelo.find({ usuario_id, devuelto: false });
        if (reservasUsuario.length >= 5) {
            return res.status(400).send({ msg: "El usuario ya tiene reservados 5 libros" });
        }

        // Crear la reserva
        const newReserva = new reservaModelo({
            usuario_id,
            libro_id
        });

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

const traerReservas = async (req , res) =>{
    try {
        const reserva = await reservaModelo.find().populate("usuario_id").populate("libro_id");
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

const traerReservasUsuario = async (req, res) =>{
    try {
        const reserva = await reservaModelo.find({"usuario_id" : req.params.id}).populate("usuario_id").populate("libro_id");
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

//devolverLibro
const actualizarReserva = async(req, res) =>{
    const {devuelto} = req.body

    try {

        let reserva = await reservaModelo.findById(req.params.id);

        if (!reserva) {
            res.status(404).send({msg:"No existe la reserva"})
        }

        reserva.devuelto = devuelto;

        reserva = await reservaModelo.findOneAndUpdate({ _id: req.params.id }, reserva, { new: true})
        res.json(reserva);

    } catch (error) {
        (error);
        res.status(500).send('Hubo un error al actualizar la reserva')
    }
}

const obtenerReserva = async (req, res) =>{
    try {

        let reserva = await reservaModelo.findById(req.params.id);

        if (!reserva) {
            res.status(404).send({msg:"No existe la reserva"})
        }

        res.json(reserva);

    } catch (error) {
        (error);
        res.status(500).send('Hubo un error al actualizar la reserva')
    }
}

//controladores para obtener los id de los usuarios y libros

// const obtenerIdLibroPorNombre = async (req, res) => {
//     const { nombre } = req.params;

//     try {
//         const libro = await libroModelo.findOne({ nombre });
//         if (libro) {
//             res.status(200).json({ idLibro: libro._id });
//         } else {
//             res.status  (404).json({ msg: "Libro no encontrado" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send(error);
//     }
// };

// const obtenerIdUsuarioPorNombre = async (req, res) => {
//     const { nombre } = req.params;

//     try {
//         const usuario = await usuarioModelo.findOne({ nombre });
//         if (usuario) {
//             res.status(200).json({ idUsuario: usuario._id });
//         } else {
//             res.status(404).json({ msg: "Usuario no encontrado" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send(error);
//     }
// };

const obtenerIdUsuarioPorNombre = async (req, res) => {
    const { nombre } = req.params;
  
    try {
      const usuario = await usuarioModelo.findOne({ nombre });
      if (usuario) {
        res.status(200).json({ idUsuario: usuario._id.toString() }); // Convertir a cadena
      } else {
        res.status(404).json({ msg: "Usuario no encontrado" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
};

const obtenerIdLibroPorNombre = async (req, res) => {
    const { nombre } = req.params;
  
    try {
      const libro = await libroModelo.findOne({ nombre });
      if (libro) {
        res.status(200).json({ idLibro: libro._id.toString() }); // Convertir a cadena
      } else {
        res.status(404).json({ msg: "Libro no encontrado" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
};

const verificarLibroReservado = async (req, res) => {
    const { libroId } = req.params;
  
    try {
      const reservaExistente = await reservaModelo.findOne({
        libro_id: libroId,
        devuelto: false
      });
  
      res.json(!!reservaExistente);
    } catch (error) {
      console.error('Error al verificar libro reservado:', error);
      res.status(500).send('Error en el servidor');
    }
  };




module.exports ={
    actualizarReserva,
    obtenerReserva,
    traerReservas,
    eliminarReserva,
    crearReserva,
    traerReservasUsuario,
    obtenerIdLibroPorNombre,
    obtenerIdUsuarioPorNombre,
    verificarLibroReservado
}