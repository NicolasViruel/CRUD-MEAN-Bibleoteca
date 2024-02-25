const libroModelo = require("../models/libro");

const traerLibros =  async (req, res) =>{
    try {
        const usuarios = await libroModelo.find();
        if (usuarios) {
            return res.status(200).send(usuarios);
        }else{
            return res.status(200).send([]);
        }
    } catch (error) {
        res.status(500).send(error);
    };
};

const crearLibro = async (req, res) =>{
    const {nombre, author} = req.body;

    const nuevoLibro = new libroModelo({
        nombre: nombre.toLowerCase(),
        author: author.toLowerCase()
    });
    try {
        const libro = await nuevoLibro.save();
        return res.status(200).send(libro);
    } catch (error) {
        res.status(400).send({ msg: "El usuario ya existe"});
        console.log(error);
    }
}

const eliminarLibro = async (req, res) =>{
    const { id } = req.params;
    try {
        await libroModelo.findByIdAndDelete(id);
        res.status(200).send({msg: "El libro fue eliminado"})
    } catch (error) {
        res.status(500).send({msg: "Error al eliminar el libro"})
    }
}

const actualizarLibro = async (req, res) =>{
    try {
        const {nombre, author} = req.body;
        let libro = await libroModelo.findById(req.params.id);

        if (!libro) {
            res.status(404).send({msg:"No existe el Libro"})
        }

        libro.nombre = nombre;
        libro.author = author;

        libro = await libroModelo.findOneAndUpdate({ _id: req.params.id }, libro, { new: true})
        res.json(libro);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al actualizar el libro')
    }
}

const obtenerLibro = async (req, res) =>{
    try {

        let libro = await libroModelo.findById(req.params.id);

        if (!libro) {
            res.status(404).send({msg:"No existe el Libro"})
        }

        res.json(libro);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al actualizar el libro')
    }
}

const buscarLibro = async (req, res) =>{
    try {

        let libro = await libroModelo.find({ nombre: req.params.id});

        if (!libro) {
            res.status(404).send({msg:"No existe el Libro"})
        }

        res.json(libro);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al actualizar el libro')
    }
}

module.exports ={
    traerLibros,
    crearLibro,
    eliminarLibro,
    actualizarLibro,
    obtenerLibro,
    buscarLibro
}