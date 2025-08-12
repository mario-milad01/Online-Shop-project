const multer = require('multer');
const uuid = require('uuid').v4;
const path = require('path');

const dir = path.join(__dirname, '..', 'product-data', 'images');
const upload = multer({
    storage: multer.diskStorage({
        destination: 'product-data/images',
        filename: function (req, file, cb) {
            const uniqueName = uuid() + '-' + file.originalname;
            cb(null, uniqueName);
        }
    })
});

const configuredMulterMiddleware = upload.single('image');

module.exports = configuredMulterMiddleware;