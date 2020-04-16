const Pedido = require('../models/Pedido');
module.exports = {
    async store(req, res) {
        const { user_id } = req.headers;
        const { id_empresa } = req.params;
        const { data, servicoPrestado } = req.body;
        console.log(id_empresa)

        let pedido = await Pedido.create({
            user: user_id,
            data: data,
            servicoPrestado: servicoPrestado,
            empresa: id_empresa,
            codigo: Math.floor(Math.random() * (100000 - 999999)) + 999999

        });

        await pedido.populate("empresa").populate('user').execPopulate();
        return res.json(pedido);
    }


};