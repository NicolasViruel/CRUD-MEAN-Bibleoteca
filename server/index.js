const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const bodyParser= require("body-parser")

//Routers
const usuariosRoutes = require("../server/routers/usuarios");
const librosRoutes = require("../server/routers/libros");
const reservaRoutes = require("../server/routers/reservas");

//body-parser - cors
app.use(bodyParser.urlencoded( {extended:true}));
app.use(bodyParser.json());
app.use(cors());

//conectamos la base
const conectarDB = require("../server/dataBase/index");
conectarDB();

//rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/libros', librosRoutes);
app.use('/api/reserva', reservaRoutes);


const port = 4000
app.listen(port , () =>{
    console.log(`👾🌈Server listo en el puerto ${port}`);
})