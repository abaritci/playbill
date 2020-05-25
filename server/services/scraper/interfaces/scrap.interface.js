const {Interface, type} = require('implement-js')
module.exports = Interface('ScrapInterface')({
    site : type('string'),
    getJobs: type('function'),
    getJobPage: type('function'),
    getCompanies: type('function'),
    getCategories: type('function'),
    getIndustries: type('function'),
}, {
    error: true,
    strict: true
});
