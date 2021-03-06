// ./index.js

// 1. IMPORTACIONES
const express = require("express")
const app = express()

const cors = require("cors")

const connectDB = require("./config/db")

// 2. MIDDLEWARES
// VARIABLES DE ENTORNO
require("dotenv").config()

// CONEXIÓN A LA BASE DE DATOS
connectDB()

// ACTIVAR CORS -  CROSS ORIGIN RESOURCE SHARING - PERMITE A OTROS SERVIDORES ACCEDER A ESTE SERVIDOR Y PODER TRANSFERIR DATOS ENTRE ELLOS DE UNA MANERA MÁS FLEXIBLE. NOS VA A PERMITIR ENTREGAR DATOS A REACT SIN RESTRICCIÓN
app.use(cors())

// TODAS LAS PETICIONES Y RETORNOS VAN A FLUIR EN UN FORMATO JSON
app.use(express.json({ extended: true }))

//3 rutas
/**
 * * APP DE PRODUCTOS - COMPRA
 * CRUD - CREAR - LEER - ACTUALIZAR - BORRAR DATOS
 * AUTENTICACIÓN CON AUTORIZACIÓN
 */

 app.use("/api/products", require("./routes/products.js"))
//despues de esta ruta, hay que crear su archivo en routes
app.use("/api/users", require("./routes/users"))
//despues de esta ruta, hay que crear su archivo en routes
 app.use("/api/auth", require("./routes/auth"))

 
// 4. SERVIDOR

app.listen(process.env.PORT, () => {
    console.log("srv activo")
})