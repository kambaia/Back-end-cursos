const express = require('express');
const sessionControllers = require('../controllers/sessionControllers');
const userControllers = require('../controllers/atualizarDadosControllers');
const indexControllers = require('../controllers/indexControllers');
const multer = require('multer');
var upload = require('../../middleware/upload');
const authConfig = require('../../middleware/auth');




const routers = express.Router();
routers.get('/', indexControllers.index);
routers.post('/users', multer(upload).single('logo'),sessionControllers.store);
routers.post('/auth', sessionControllers.autenticao);
routers.post('/forgot_password', sessionControllers.forgotpass);
routers.post('/reset_password', sessionControllers.reset_password);

/**********************.......Atualização dados usuario.................**************************** */
routers.use(authConfig)
routers.put('/dasboard/update-user', userControllers.update_dados_user);
routers.put('/dasboard/perfil', userControllers.show_user);
routers.delete('/dasboard/')

/*********************************pedidos ********************************* */
module.exports = routers;