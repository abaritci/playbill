'use strict';
const request = require('request'),
    cheerio = require('cheerio'),
    moment = require('moment'),
    implement = require('implement-js').default,
    ScrapInterface = require('./interfaces/scrap.interface');

const CareerCenterService = {
    site: 'https://www.careercenter.am',
    getJobs() {
        return new Promise((resolve, reject) => {
            request(`${this.site}/en/jobs`, (error, response, body) => {

                if (!error) {
                    //load HTML body with current page
                    const $ = cheerio.load(body);
                    const item = $(".job-single");
                    let jobs = [];
                    if (item.length) {
                        let index = 0;
                        while (index < item.length) {
                            const logo = this.site + '/' + $(item[index]).find("source").attr('srcset'),
                                page = $(item[index]).attr('href'),
                                title = $(item[index]).find(".job-item-info-text > h5").text().trim(),
                                name = $(item[index]).find(".job-item-info-text > h6").text().trim(),
                                deadline = moment($(item[index]).find(".job-item-info-date > span").text().trim()).format('DD MMMM YYYY'),
                                location = 'Yerevan';
                            if (title && name && logo && page && deadline) {
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

module.exports = implement(ScrapInterface)(CareerCenterService);
