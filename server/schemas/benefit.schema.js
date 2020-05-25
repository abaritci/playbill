const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BenefitSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'Company'},
    title: {
        type: String,
        required: true
    },
}, {timestamps: true});

module.exports = mongoose.model('Benefit', BenefitSchema);
