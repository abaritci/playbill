'use strict';
const request = require('request'),
    cheerio = require('cheerio'),
    moment = require('moment'),
    implement = require('implement-js').default,
    ScrapInterface = require('./interfaces/scrap.interface');

const JobAmService = {
    site: 'https://job.am',
    getJobs() {
        return new Promise((resolve, reject) => {
            request(`${this.site}/en/jobs`, (error, response, body) => {

                if (!error) {
                    //load HTML body with current page
                    const $ = cheerio.load(body);
                    const item = $(".topjob");
                    let jobs = [];
                    if (item.length) {
                        let index = 0;
                        while (index < item.length) {
                            const logo = this.site + $(item[index]).find(".tmblogo > img").attr('src'),
                                page = this.site + $(item[index]).find('.featured-jobs-link > a').attr('href'),
                                title = $(item[index]).find('.featured-jobs-link > a').text().trim(),
                                name = $(item[index]).find(".company > a").text().trim(),
                                deadline = null,
                                location = $(item[index]).find(".justify-content-end > span.wordBreak").text().trim();
                            if (title && name && logo && page) {
                                jobs.push({
                                    title,
                                    company: {name, logo},
                                    page,
                                    deadline,
                                    location
                                });
                            }
                            index++;
                        }
                    }
                    return resolve(jobs);
                } else {
                    reject('Page not found');
                }
            });
        });
    },
    getJobPage(page) {
        return new Promise((resolve, reject) => {
            request(page, (error, response, body) => {

                if (!error) {
                    //load HTML body with current page
                    const $ = cheerio.load(body);
                    return resolve(cheerio.load(body));
                } else {
                    reject('Page not found');
                }
            });
        });
    },
    getCompanies() {
        return new Promise((resolve, reject) => {
            resolve([])
        });
    },
    getCategories() {
        return new Promise((resolve, reject) => {
            resolve([])
        });
    },
    getIndustries() {
        return new Promise((resolve, reject) => {
            resolve([])
        });
    }
}

module.exports = implement(ScrapInterface)(JobAmService);
