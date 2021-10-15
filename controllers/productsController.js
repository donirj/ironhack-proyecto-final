const Product = require("./../models/Product")

exports.getAllProducts = async (req, res) => {
  
    try {

        const products = await Product.find({})
        console.log(products)

       return res.json({
            data: products
        })

    } catch (error) {
        console.log(error)
       return res.status(500).json({
            data: null,
            errorMsg: "error interno, arreglando"
        })
    }

    res.json({
        data: "hola mundo"
       
    })

}

exports.createProducts = async (req, res) => {

    //OBTENER DATOS DE FORMULARIO
    const {
        name,
        author,
        pictureUrl,
        description,
        available
    } = req.body

    try {

        const newProduct = await Product.create({
            name,
            author,
            pictureUrl,
            description,
            available
        })

        res.json({
            data: newProduct,
            msg: "producto creado exitosamente"
        })

    } catch (error) {

        console.log(error)

       return res.status(500).json({
            errormsg: "hubo un error al crear el producto"
        })

    }

}

exports.updateProduct = async (req, res) => {

    
    const { 
        id,
        name,
        author,
        pictureUrl,
        description,
        available
    } = req.body

    try {

        const updatedProduct = await Product.findByIdAndUpdate(id, {
            id,
            name,
            author,
            pictureUrl,
            description,
            available
        }, { new: true })//DEVUELVE DATOS ACTUALIZADOS

       return res.json({
            data: updatedProduct
        })

    } catch(error) {

        console.log(error)

       return res.status(500).json({
            msgError: "error al actualizar producto"
        })

    }
   

}
//despues de hacer cada ruta hay que conectarla en product.js

exports.deleteProduct = async (req, res) => {
    const { id } = req.body

    try {
        
        const deletedProduct = await Product.findByIdAndRemove({ _id: id })

        return res.json({
            data: deletedProduct,
            msg: "Esta mascota fue borrada exitosamente."
        })


    } catch (error) {

        console.log(error)

        return res.status(500).json({
            msgError: "Hubo un error borrando la mascota."
        })
        
    }

}