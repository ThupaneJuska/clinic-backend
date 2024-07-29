const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const File = new mongoose.Schema({
    filename: { type: String, required: true },
    id: { type: String, required: true },
    contentType: { type: String, required: true },
    length: { type: Number, required: true }
})


module.exports = mongoose.model('File',File);