const express = require('express');
const router = express.Router();
const libroController = require("../controllers/librosControllers")

router.get("/", libroController.traerLibros)

router.post("/", libroController.crearLibro);

router.delete("/:id", libroController.eliminarLibro);

router.put("/:id", libroController.actualizarLibro);

router.get("/:id", libroController.obtenerLibro);

module.exports = router;