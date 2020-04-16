const mongoose = require("mongoose");

const EmpresasShema = new mongoose.Schema({
    logo: String,
    nome_empresa: String,
    nif: String,
    endereco: String,
    cidade: String,
    telefone1: String,
    telefone2: String,
    tipo_empresa: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    toJSON: {
        virtuals:true
    },
})

EmpresasShema.virtual('logo_url').get(function(){
    return `http://localhost/files/${this.logo}`
})

module.exports = mongoose.model('Empresa', EmpresasShema);