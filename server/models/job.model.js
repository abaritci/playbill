'use strict';

class JobModel {
    constructor() {
        this.jobSchema = require('../schemas/job.schema');
    }

    /**
     * Get all jobs
     * @param query
     * @returns {void|*|number|bigint}
     */
    getJobs(query) {
        const {search} = query;
        const condition = search ? {$or: [{title: {'$regex': search}}, {description: {'$regex': search}}, {responsibilities: {'$regex': search}}, {qualifications: {'$regex': search}}, {level: {'$regex': search}}]} : {};
        return this.jobSchema.find({
            ...condition
        });
    }

    /**
     * Get Job by id
     * @param jobId
     * @returns {void|*|number|bigint}
     */
    getJob(jobId) {
        return this.jobSchema.findOne({_id: jobId});
    }

    /**
     * Edit job by id and data
     * @param jobId
     * @param data
     */
    editJob(jobId, data) {
        return this.jobSchema.findByIdAndUpdate({_id: jobId}, data);
    }

    /**
     * Delete job by id
     * @param jobId
     * @returns {*|void|boolean|Promise<boolean>|IDBRequest<undefined>}
     */
    deleteJobs(jobId) {
        return this.jobSchema.findOneAndRemove({_id: jobId});
    }
}

module.exports = new JobModel();
