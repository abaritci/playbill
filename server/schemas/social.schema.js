const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SocialSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        // Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
        // will look at the `onModel` property to find the right model.
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['User', 'Company']
    },
    link: {
        type: String,
        required: true
    },
}, {timestamps: true});

module.exports = mongoose.model('Social', SocialSchema);
