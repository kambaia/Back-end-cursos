const User = require('../models/Users')
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const authConfig = require('../config/auth')
const mailer = require('../modules/mailer')


module.exports = {
        async store(req, res) {
            try {
                const { filename } = req.file;
                const { nome, email, password, NivelAcesso } = req.body;
                let user  = await User.findOne({email: email});
                if(!user){
                    user =  await User.create({
                        logo: filename,
                        nome: nome,
                        email: email,
                        password: password,
                        NivelAcesso: NivelAcesso
                    });
                    user.password = undefined;
                    const token = jwt.sign({id: user.id},  authConfig.secret, {
                        expiresIn: 86400,
                
                       })
                
                    return res.json({user, token});
                }else{
                    console.log(user)
                    return res.status(400).json({error: "Usuário já está cadastrado"}) 
                }    
    } catch (error) {
        return res.status(400).json({error: `Erro ao cadastrar o usuário${error}`}) 
    }
    },
    async autenticao(req, res) {
       try {
           console.log(typeof(req.body));
        console.log(req.body)
        const { email, password } = req.body;
        let user = await User.findOne({email}).select('+password');
        if (!user)
            return res.json({ message: "Nome de utilizador invádo." });
        if(!await bcrypt.compare(password, user.password))
            return res.json({ message: "Palavra-passe incorrectas." });
        user.password = undefined;
       const token = jwt.sign({id: user.id},  authConfig.secret, {
        expiresIn: 86400,

       })
        res.json({user, token}); 
        console.log(user);
       } catch (error) {
            console.log(error) 
            return res.status(400).json({error: "Usuário inválido"});
       }
        
    },
    async forgotpass(req, res){
        const {email} = req.body;
             const user = await User.findOne({email});
             if(!user)
                return res.status(400).json({error: 'Usuário não foi encontrado'})
            const token = crypto.randomBytes(20).toString('hex');
            const now = new Date();
            now.setHours(now.getHours() +1);
            await User.findByIdAndUpdate(user.id, {
                '$set': {
                    passwordResetToken: token,
                       
                    passwordResetExpire: now,
                }
            });

/******************************envio do email ****************************** */
            const output = `
            <p>Tu tens uma nova mensagem</p>
            <h2>"Olá esqueceu-se da sua conta IsonAngo? não se preocupes, siga apenas as informaçães abaixo!</h2>
            <h3><a href="https://bitbucket.org/Alberto12345/projecro1/src/master/change_password">Clique aqui para alterar a sua palavra pass </a></h3>
            <h5>Continua com os nossos serviços. A isoAngo agradece</a></h5>
            `;
        
            // setup email data with unicode symbols
            let mailOptions = {
                from: '"Contacta Agora ao IsonAngo para receber mais informações sobre os nossos serviços"', // sender address
                to: email, // list of receivers
                subject: 'Alteração da palavra pass! *****'+token+' *****', // Subject line
                text: '', // plain text body
                html: output // html body
            };

            // send mail with defined transport object
            mailer.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            });
            console.log(token);
            return  res.json({m: "Enviou"});
            
        },

    async reset_password(req, res){
      const {email,token, password} = req.body;
      console.log(token, "  + ", password )
      try {
        let user = await User.findOne({email}).select('+passwordResetToken passwordResetExpire');
        if (!user)
            return res.json({ message: "Nome de utilizador invádo." });
        if(token!==user.passwordResetToken)
            return res.json({error: "Token Inválido." });
        const now =Date.now();
        if(now> user.passwordResetExpire)
            return res.status(400).json({error: "Erro, o seu Token espirou, por favor gire um novo token."});
        user.password = password;
        
        await user.save();
        return res.json({message: "Palavra passa alterada com sucesso."})
         
      } catch (error) {
          return res.status(400).json({error: "Não foi possível alterar a sua senha. Por favor tente novamente."});


      }
    }

    
    };
        