const express = require('express');
const router = express.Router();
const reservaController = require("../controllers/reservaControllers")

router.post("/", reservaController.crearReserva);

router.delete("/:id", reservaController.eliminarReserva);

router.put("/:id", reservaController.actualizarReserva);

router.get("/libro/:nombre", reservaController.obtenerIdLibroPorNombre);

router.get("/usuarioid/:nombre", reservaController.obtenerIdUsuarioPorNombre);

router.get("/usuario/:id", reservaController.traerReservasUsuario)

router.get('/verificarLibroReservado/:libroId', reservaController.verificarLibroReservado);

router.get("/:id", reservaController.obtenerReserva);

router.get("/", reservaController.traerReservas)

module.exports = router;