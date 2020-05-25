'use strict';
const request = require('request'),
    cheerio = require('cheerio'),
    moment = require('moment'),
    implement = require('implement-js').default,
    ScrapInterface = require('./interfaces/scrap.interface');

const ProfessionalsService = {
    site: 'https://professionals.am',
    getJobs() {
        return new Promise((resolve, reject) => {
            request(this.site, async (error, response, body) => {

                if (!error) {
                    //load HTML body with current page
                    const $ = cheerio.load(body);
                    const item = $(".bd-toc-item");
                    let jobs = [];
                    if (item.length) {
                        let index = 0;
                        while (index < item.length) {
                            const page = this.site + $(item[index]).find('a').attr('href');
                            const jobPageHTML = await this.getJobPage(page);

                            const logo = this.site + '/' + jobPageHTML("img#logo").attr('src'),
                                title = jobPageHTML('.title').text().trim(),
                                name = jobPageHTML('.company-name').text().trim(),
                                deadline = null,
                                location = jobPageHTML('.address').text().trim();

                            jobs.push({
                                title,
                                company: {name, logo},
                                page,
                                deadline,
                                location
                            });
                            index++;
                        }
                    }
                    //console.log(jobs);
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

module.exports = implement(ScrapInterface)(ProfessionalsService);
