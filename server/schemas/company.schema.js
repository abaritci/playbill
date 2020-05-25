const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    logo: {
        type: String,
    },
    wallPicture: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    socials: [{type: Schema.Types.ObjectId, ref: 'Social'}],
    benefits: [{type: Schema.Types.ObjectId, ref: 'Benefit'}],
    industries: [{type: Schema.Types.ObjectId, ref: 'Industry'}],
    type: {
        type: String,
        enum: ['LLC', 'OJSC', 'CJSC'],
        default: 'LLC'
    },
    dateOfFoundation: {
        type: Number
    },
    numberOfEmployees: {
        type: Number
    },
    location: {
        type: String,
        required: true
    },
    site: {
        type: String
    },
    followers: [{type: Schema.Types.ObjectId, ref: 'User'}],
    views: {
        type: Number
    }

}, {timestamps: true});

module.exports = mongoose.model('Company', CompanySchema);
