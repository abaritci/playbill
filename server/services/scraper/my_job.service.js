'use strict';
const request = require('request'),
    cheerio = require('cheerio'),
    moment = require('moment'),
    implement = require('implement-js').default,
    ScrapInterface = require('./interfaces/scrap.interface'),
    phantom = require('phantom');
;

const MyJobService = {
    site: 'https://www.myjob.am',
    getJobs() {
        return new Promise(async (resolve, reject) => {
            const instance = await phantom.create();
            const page = await instance.createPage();
            await page.on('onResourceRequested', function (requestData) {
                //console.info('Requesting', requestData.url);
            });
            const status = await page.open(this.site);
            const content = await page.property('content');
            await instance.exit();
            if (content) {
                const $ = cheerio.load(content);
                const item = $(".jobPageContainer").find('a');
                let jobs = [];
                if (item.length) {
                    let index = 0;
                    while (index < item.length) {
                        const logo = null,
                            page = this.site + '/' + $(item[index]).attr('href'),
                            title = $(item[index]).find(".shortJobPosition").text().trim(),
                            name = $(item[index]).find(".shortJobCompany").text().trim(),
                            deadline = moment($(item[index]).find(".shortJobOpening").text().trim().substring(12), "DD/MM/YYYY").add(parseInt($(item[index]).find(".shortJobDeadline").text().trim().substring(17)), 'day').format('DD MMMM YYYY'),
                            location = $(item[index]).find(".shortJobAddress").text().trim();
                        if (title && name && page) {
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

module.exports = implement(ScrapInterface)(MyJobService);
