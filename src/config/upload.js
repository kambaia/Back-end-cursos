const multer = require('multer');
const path = require('path');


module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {
            cb(new MulterError('LIMIT_UNEXPECTED_FILE'), `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
        }
    })
}