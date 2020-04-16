const mongoose = require("mongoose");

const pedidoShema = new mongoose.Schema({
    aceito: Boolean,
    servicoPrestado: String,
    data: String,
    codigo: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    empresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empresa'
    },



})

module.exports = mongoose.model('Pedido', pedidoShema);