'use strict';
const request = require('request'),
    cheerio = require('cheerio'),
    moment = require('moment'),
    jobModel = require('../models/job.model'),
    StaffService = require('../services/scraper/staff.service'),
    CareerCenterService = require('../services/scraper/career_center.service'),
    ProfessionalsService = require('../services/scraper/professionals.service'),
    HRService = require('../services/scraper/hr.service'),
    JobAmService = require('../services/scraper/job.service'),
    JobFinderService = require('../services/scraper/job_finder.service'),
    BanksAmService = require('../services/scraper/banks_am_job.service'),
    MyJobService = require('../services/scraper/my_job.service'),
    HireService = require('../services/scraper/hire.service'),
    WorkNetService = require('../services/scraper/work_net.service');


const services = {
    playbill: jobModel,
    staff: StaffService,
    careerCenter: CareerCenterService,
    professionals: ProfessionalsService,
    hr: HRService,
    job: JobAmService,
    job_finder: JobFinderService,
    banks_am_job: BanksAmService,
    my_job: MyJobService,
    hire: HireService,
    work_net: WorkNetService,
}

class JobService {
    async getJobs(req, res, next) {
        const {agency} = req.query;
        res.json(await services[agency].getJobs(req.query));
    }

    getJob(req, res, next) {
        jobModel.getJob(req.params.id).then((user) => {
            res.json(user);
        }).catch(error => next(error));
    }

    editJob(req, res, next) {
        jobModel.editJob(req.params.id, req.body).then((user) => {
            res.json(user);
        }).catch(error => next(error));
    }

    deleteJobs(req, res, next) {
        jobModel.deleteJobs(req.params.id).then((user) => {
            res.json(user);
        }).catch(error => next(error));
    }
}

module.exports = new JobService();
