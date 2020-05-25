const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const JobSchema = new Schema({
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
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    type: {
        type: String,
        enum: ['full_time', 'part_time', 'training', 'fixed_term_contract', 'tender', 'internship', 'other'],
        default: 'full_time'
    },
    terms : {
        type: String,
        enum: ['permanent', 'temporary', 'freelance', 'contract', 'internship','other'],
        default: 'permanent'
    },
    location: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    responsibilities: {
        type: String,
        required: true
    },
    qualifications: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ['student', 'junior', 'middle', 'senior', 'c_level'],
        default: 'student'
    },
    salary: {
        type: String
    },
    skills: [{type: Schema.Types.ObjectId, ref: 'Skill'}],
    deadline: {
        type: Date,
        required: true
    },
    status: {
        type: Boolean,
        default: 1,
        required: true
    },

}, {timestamps: true});

module.exports = mongoose.model('Job', JobSchema);
