// ./routes/pets.js
const express   = require("express")
const router    = express.Router()

const productsController = require("./../controllers/productsController")


// CRUD
// GET - PETS - OBTENER TODOS LOS PRODUCTOS
router.get("/get-all", productsController.getAllProducts)

// POST - PRODUCTS - OBTENER TODOS LOS PRODUCTOS
router.post("/create", productsController.createProducts)

// PUT - PRODUCTS - OBTENER TODOS LOS PRODUCTOS
router.put("/update", productsController.updateProduct)

// PUT - PRODUCTS - OBTENER TODOS LOS PRODUCTOS
router.delete("/delete", productsController.deleteProduct)

module.exports = router