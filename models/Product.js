// ./models/Pet.js

// 1. IMPORTACIONES
const mongoose = require("mongoose")


// 2. SCHEMA
const productsSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    pictureUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    }
})

// 3. MODELO
const Product = mongoose.model("Product", productsSchema)

// 4. EXPORTACIÓN
module.exports = Product