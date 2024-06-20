const mongoose = require('mongoose');

const Meds = new mongoose.Schema({
    name: { type: String, required: true },
    availability: { type: String, required: true },
})

module.exports = mongoose.model('Medication', Meds);