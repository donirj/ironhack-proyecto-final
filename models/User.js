// ./models/User.js
const mongoose = require("mongoose")

const usersSchema = mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    }

})


const User = mongoose.model("User", usersSchema)

module.exports = User
//despes de hacer este modelo, hay que declararlo en index.js