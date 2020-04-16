const Empresa = require('../models/Empresas')


module.exports = {

    async show(req, res) {
        const { user_id } = req.headers;
        console.log(user_id)
        let empresa_logada = await Empresa.find({ user: user_id });
        console.log(empresa_logada);
        return res.json(empresa_logada);
    },

};