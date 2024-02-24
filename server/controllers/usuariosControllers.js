const usuarioModelo = require("../models/usuario");
const libroModelo = require("../models/libro");

const traerUsuarios = async (req, res) =>{
    try {
        const usuarios = await usuarioModelo.find();
        if (usuarios) {
            return res.status(200).send(usuarios);
        }else{
            return res.status(200).send([]);
        }
    } catch (error) {
        res.status(500).send(error);
    };
};

const crearUsuario = async (req, res) =>{
    const {nombre, apellido, email} = req.body;

    const nuevoUsuario = new usuarioModelo({
        nombre,
        apellido,
        email,
    });
    try {
        const usuario = await nuevoUsuario.save();
        return res.status(200).send(usuario);
    } catch (error) {
        res.status(400).send({ msg: "El usuario ya existe"});
        console.log(error);
    }
}

const actualizarUsuario = async (req, res) =>{
    try {
        const {nombre, apellido, email} = req.body;
        let usuario = await usuarioModelo.findById(req.params.id);

        if(!usuario) {
            res.status(404).send({msg:"No existe el usuario"})
        }

        usuario.nombre = nombre;
        usuario.apellido = apellido;
        usuario.email = email;

        libro = await usuarioModelo.findOneAndUpdate({ _id:req.params.id }, usuario, {new: true})
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al actualizar el usuario')
    }
}

const obtenerUsuario = async (req, res) =>{
    try {

        let usuario = await usuarioModelo.findById(req.params.id);

        if (!usuario) {
            res.status(404).send({msg:"No existe el Usuario"})
        }

        res.json(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al actualizar el Usuario')
    }
}

const eliminarUsuario = async (req, res) =>{
    const { id } = req.params;
    try {
        await usuarioModelo.findByIdAndDelete(id);
        res.status(200).send({msg: "El usuario fue eliminado"});
    } catch (error) {
        res.status(500).send({msg:"Error al eliminar el usuario"})
    }
}

//relaciones entre usuario y libros

const prestarLibro = async (req, res) =>{
    const { usuarioId, libroId } = req.body;

    try {
        const usuario = await usuarioModelo.findById(usuarioId);
        const libro = await libroModelo.findById(libroId);

        if (!usuario || !libro) {
            return res.status(404).json({ mensaje: 'Usuario o libro no encontrado' });
        }

        usuario.librosPrestados.push({ libro: libroId });
        await usuario.save();

        return res.status(200).json({ mensaje: 'Libro prestado con éxito', usuario });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al prestar el libro', error });
    }
}

const devolverLibro = async (req, res) => {
    const { usuarioId, libroId } = req.body;

    try {
        const usuario = await usuarioModelo.findById(usuarioId);

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        usuario.librosPrestados = usuario.librosPrestados.filter(libro => libro.libro !== libroId);
        await usuario.save();

        return res.status(200).json({ mensaje: 'Libro devuelto con éxito', usuario });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al devolver el libro', error });
    }
}

module.exports = {
    traerUsuarios,
    crearUsuario,
    eliminarUsuario,
    actualizarUsuario,
    obtenerUsuario,
    prestarLibro,
    devolverLibro
}