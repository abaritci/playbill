const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    parent: {type: Schema.Types.ObjectId, ref: 'Category'},
    label: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
}, {timestamps: true});

module.exports = mongoose.model('Category', CategorySchema);
