const Empresa = require('../models/Empresas')
const User = require('../models/Users')

module.exports = {


    async Home(req, res) {
        let empresa = await Empresa.find({});
        console.log(empresa);
        return res.json(empresa);
    },

    async index(req, res) {

        const { nome_empresa } = req.query;
        console.log(nome_empresa)
        let empresa = await Empresa.findOne({ nome_empresa: nome_empresa });
        console.log(empresa);
        return res.json(empresa);
    },



    async store(req, res) {
        console.log(req.body);
        console.log(req.file);

        const { filename } = req.file;
        const { nome_empresa, nif, endereco, cidade, telefone1, telefone2, tipo_empresa } = req.body;
        const { user_id } = req.headers;

        let user = await User.findById(user_id);
        if (!user) {
            return res.status(400).json({ error: "Usuário não exite." })
        }
        let empresa = await Empresa.findOne({ nif: nif, nome_empresa: nome_empresa });
        if (!empresa) {
            empresa = await Empresa.create({
                logo: filename,
                user: user_id,
                nome_empresa: nome_empresa,
                nif: nif,
                endereco: endereco,
                cidade: cidade,
                telefone1: telefone1,
                telefone2: telefone2,
                tipo_empresa: tipo_empresa
            });
            return res.json(empresa);
        } else {
            return res.json({ message: "Usuário já se encontra cadastrado." })
        }

    }


};