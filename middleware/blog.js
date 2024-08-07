const multer = require('multer');
const path = require('path');
const fs = require('fs');

const handleUploadCoverImage = (coverImage) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            // Define the path to the user's directory
            const userDir = path.join('./public/uploads', req.user._id);

            // Create the directory if it doesn't exist
            fs.mkdirSync(userDir, { recursive: true });

            cb(null, userDir)
        },
        filename: function (req, file, cb) {
          const uniquePrefix = Date.now();
          cb(null, uniquePrefix + '-' +  file.originalname)
        }
      })
      
    const upload = multer({ storage: storage })

    return upload.single(coverImage);
}

module.exports = handleUploadCoverImage;
