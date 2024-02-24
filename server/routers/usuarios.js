const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuariosControllers");

router.get("/", usuarioController.traerUsuarios );

router.post("/", usuarioController.crearUsuario);

router.delete("/:id", usuarioController.eliminarUsuario);

router.put("/:id", usuarioController.actualizarUsuario);

router.get("/:id", usuarioController.obtenerUsuario);

module.exports = router;