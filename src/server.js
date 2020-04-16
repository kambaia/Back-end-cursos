const express = require("express");
const routers = require('./router/Index');
const path = require('path')
const mongoose = require('./config/db');
/* importar o módulo do body-parser */
var bodyParser = require('body-parser');
/* Importar o módulo do expressSession   */
var session = require('express-session');
const authConfig = require('../middleware/auth')
const cors = require('cors');

const app = express();
app.use(express.json())

/*******************conexão com mongoose **************************** */

/******************************Rontas************************ */
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors())
app.use(routers);


/*******************************configurações adicionais ******************* */
/* setar as variáveis 'view engine' e 'views' do express */
app.use(express.static("./app/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-type");
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
});

app.set('view engine', 'ejs');
app.set('views', './views');

routers.use(authConfig);
app.use('/files', express.static(path.resolve(__dirname, '../tmp/upload')));
/* configurar o middleware de expressSession */
app.set('trust proxy', 1) // trust first proxy

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))


app.listen(process.env.port || 3000, () => {
    console.log("Servidor rodando a porta")
})