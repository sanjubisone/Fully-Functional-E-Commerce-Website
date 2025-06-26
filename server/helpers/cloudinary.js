const cloudinary = require("cloudinary").v2;
const multer = require("multer")





// Configuration
cloudinary.config({
    cloud_name: 'dvf209ph1',
    api_key: '936696187484174',
    api_secret: 'aJdNNWhI0TE1I4QPqS1NN2sEYoA' // Click 'View API Keys' above to copy your API secret
});

const storage = new multer.memoryStorage();
async function imageUploadUtil(file) {

    const result = await cloudinary.uploader
        .upload(file, {
            resource_type: 'auto'
        })
    return result;
}

const upload = multer({ storage })

module.exports = { upload, imageUploadUtil }

