'use strict';
const request = require('request'),
    cheerio = require('cheerio'),
    moment = require('moment'),
    implement = require('implement-js').default,
    ScrapInterface = require('./interfaces/scrap.interface');

const HRService = {
    site: 'http://hr.am',
    getJobs() {
        return new Promise((resolve, reject) => {
            request.post(`${this.site}/main/loadvacancies/`, {
                json: {
                    page: 1
                }
            }, (error, res, body) => {
                if (!error) {
                    //load HTML body with current page
                    const $ = cheerio.load(body);
                    const item = $(".vacancy-item");
                    let jobs = [];
                    if (item.length) {
                        let index = 0;
                        while (index < item.length) {
                            const logo = $(item[index]).find(".logo > img").attr('src') ? this.site + $(item[index]).find(".logo > img").attr('src') : null,
                                page = `${this.site}/vacancy/view/vid/${$(item[index]).attr('data-id')}/t/`,
                                title = $(item[index]).find(".info > div.title").text().trim(),
                                name = $(item[index]).find(".info > div.company").text().trim(),
                                deadline = $(item[index]).find(".deadline > span").text().trim(),
                                location = 'Yerevan';
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
                    return resolve(jobs);
                } else {
                    reject('Page not found');
                }
            })
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

module.exports = implement(ScrapInterface)(HRService);
