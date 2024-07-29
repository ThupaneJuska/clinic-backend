const mongoose = require('mongoose');

const Meds = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    availability: { type: String, required: true },
    medFor: { type: String, required: true },
    fileId: {type: String }
})

module.exports = mongoose.model('Medication', Meds);