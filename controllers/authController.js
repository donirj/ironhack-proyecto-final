// ./controllers/authController.js

// 1. IMPORTACIONES
const bcryptjs      = require("bcryptjs")
const jwt           = require("jsonwebtoken")

const User          = require("./../models/User")

const { validationResult } = require("express-validator")

// 2. CONTROLLERS
exports.loginUser = async (req, res) => {

    // VALIDACIÓN DE FORMULARIO
    const errors = validationResult(req)
    console.log(errors)

    if(!errors.isEmpty()){
        return res.status(400).json({
            msgError: errors.array()
        })
    }
    // OBTENER LOS DATOS DEL FORMULARIO
    const {email, password} = req.body
        

    try {
        //VERIFICAR QUE EL USUARIO EXISTA EN BD
        let foundUser = await User.findOne({ email })

        //VALIDAR - SI NO ENCUENTRA AL USUARIO
        if(!foundUser){
            return res.status(400).json({
                msgError: "usuario o password incorrectas"
            })
        }

        //SI TODO MARAVILLOSO, CANTAMOS JUNTOS Y AVANZAMOS

        console.log("usuario encontrado", foundUser)
    

        //2 verificar contraseña
        const verifiedPassword = await bcryptjs.compare(password, foundUser.hashedPassword)

        //SI EL PASSWORD NO COINCIDE
        if(!verifiedPassword){
            return res.status(401).json({
                msgError: "el usuario o password son incorrectos"
            })
        }

        //SI TODO COINCIDE, ENTONCES ENTREGALE SU CREDENCIAL TOKEN
        //A. PAYLOAD
        const payload = {
            user: {
                id: foundUser._id
            }

        }

        //B. FIRMA
        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 360000
            },
            (error, token) => {

                console.log(error)

                if(error){
                    return res.status(401).json({
                        msgError: "problema en la creacion del token"
                    })
                }

                //C. ENTREGA DE TOKEN (RESPUESTA)
               return res.json({
                    data: {
                        token
                    }
                })

            }
        )

    } catch (error) {
        console.log(error)

       return res.status(500).json({
            msgError: "Hubo un problema creando el usuario."
        })
 
    }

}

// 2. CONTROLLERS
exports.verifyingToken = async (req, res) => {

    try {
        const userData = await User.findById(req.user.id).select
        ("-hashedPassword")
        
       return res.json({
            data: {
                user: userData
            }
        })

    } catch (error) {
        console.log(error)

       return res.status(500).json({
        msgError: "hubo error en la busqueda del usuario "
       })}

    res.send("verificaer token")

}