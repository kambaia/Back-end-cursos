const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const {host, port, user, pass} = require("../config/mail.json");
  // create reusable transporter object using SMTP transport 
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'kambaiaalberto@gmail.com', //email'
        pass: '12dejunho' // generated ethereal password
    }
});
module.exports = transporter;