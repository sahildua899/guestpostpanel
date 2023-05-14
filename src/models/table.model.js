const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    clientemail:{
        type:String,
        required:true
    },
    publishedlink:{
        type:String,
        required:true,
        unique:true
    },
    publisheddate:{
        type:Date,
        required:true,
    },
    expirydate:{
        type:Date,
        required:true
    },
    price: {
        type:Number,
        required:true
    }
})

const Guests = new mongoose.model("Guestpost", tableSchema);
module.exports = Guests;