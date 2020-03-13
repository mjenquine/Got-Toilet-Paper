const mongoose = require('mongoose')

const gtpSchema = mongoose.Schema({
    store: {type: String, required: true},
    hasTP: {type: Boolean, default: true},
    brands: [{type: String}],
    lastUpdated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Gtp', gtpSchema)
