const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IndustrySchema = new Schema({
    parent: {type: Schema.Types.ObjectId, ref: 'Industry'},
    label: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
}, {timestamps: true});

module.exports = mongoose.model('Industry', IndustrySchema);
