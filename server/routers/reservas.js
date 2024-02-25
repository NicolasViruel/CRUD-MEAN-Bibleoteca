const express = require('express');
const router = express.Router();
const reservaController = require("../controllers/reservaControllers")

router.get("/", reservaController.traerReservas)

router.get("/usuario/:id", reservaController.traerReservasUsuario)

router.post("/", reservaController.crearReserva);

router.delete("/:id", reservaController.eliminarReserva);

router.put("/:id", reservaController.actualizarReserva);

router.get("/:id", reservaController.obtenerReserva);

module.exports = router;