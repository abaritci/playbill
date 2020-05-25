'use strict';
const request = require('request'),
    cheerio = require('cheerio'),
    moment = require('moment'),
    implement = require('implement-js').default,
    ScrapInterface = require('./interfaces/scrap.interface');

const WorkNetService = {
    site: 'https://www.worknet.am',
    getJobs() {
        return new Promise((resolve, reject) => {
            request(`${this.site}/en/jobs`, (error, response, body) => {

                if (!error) {
                    //load HTML body with current page
                    const $ = cheerio.load(body);
                    const item = $(".web_item_card");
                    let jobs = [];
                    if (item.length) {
                        let index = 0;
                        while (index < item.length) {
                            const logo = $(item[index]).find("img").attr('data-original'),
                                page = this.site + $(item[index]).find("a").first().attr('href'),
                                title = $(item[index]).find(".font_bold").text().trim(),
                                name = $(item[index]).find(".job_list_company_title").text().trim(),
                                deadline = moment($(item[index]).find(".job-list-deadline > p").first().text().trim()).format('DD MMMM YYYY'),
                                location = $(item[index]).find(".job_location").text().trim();
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

module.exports = implement(ScrapInterface)(WorkNetService);
