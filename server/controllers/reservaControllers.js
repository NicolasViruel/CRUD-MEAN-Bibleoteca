const reservaModelo = require("../models/reserva")

const crearReserva = async (req, res) => {
    const { usuario_id, libro_id } = req.body;
    
    const newReserva = new reservaModelo({
        usuario_id,
        libro_id
    });
    
    try {
        //traer la reserva de un usuario tiene que ser menos que 5
        const reservasUsuario = await reservaModelo.find({"usuario_id" : usuario_id});
        const librosDevueltos = reservasUsuario.filter( r =>   r.devuelto == false )
        if (librosDevueltos.length >= 5) {
            return res.status(400).send({msg: "El usuario ya tiene reservados 5 libros"});
        }
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




module.exports ={
    actualizarReserva,
    obtenerReserva,
    traerReservas,
    eliminarReserva,
    crearReserva,
    traerReservasUsuario,
}