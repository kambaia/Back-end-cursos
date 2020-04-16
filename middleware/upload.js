const path = require('path');
const multer = require('multer');
const crypto = require('crypto');
module.exports = {
    dest: path.resolve(__dirname, '..', 'tmp', 'upload'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', 'tmp', 'upload'))
        },
        filename: (req, file, cb) => {
           crypto.randomBytes(16, (err, hash)=>{
               const fileName = `${hash.toString('hex')}-${file.originalname}`;
            cb(null, fileName);
            })
        }
    }),
    limits: {
        fieldSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const formato= [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif",
            "image/svg"
        ];
        if(formato.includes(file.mimetype)){
            cb(null, true)
        }
        else{
          cb(new Error("Erro no fromato da imagem"));  
        }
    },  

};
