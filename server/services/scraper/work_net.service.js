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
            request(`${this.site}/en/jobs`, async (error, response, body) => {

                if (!error) {
                    //load HTML body with current page
                    const $ = cheerio.load(body);
                    const item = $(".listview").find(".card");
                    let jobs = [];
                    if (item.length) {
                        let index = 0;
                        while (index < item.length) {
                            if ($(item[index]).find("a").attr('href')) {
                                const page = encodeURI(this.site + $(item[index]).find("a").attr('href'));
                                const jobPageHTML = await this.getJobPage(page);
                                const logo = this.site + jobPageHTML("div.logo").find("img").attr('src'),
                                    title = jobPageHTML('header.content__title').find('h1').text().trim(),
                                    name = jobPageHTML('.profile__info').find('a').first().text().trim(),
                                    deadline = 'Opened',//moment(jobPageHTML('.lead').text().trim()).format('DD MMMM YYYY'),
                                    location = jobPageHTML('.zmdi-pin').parent().text().trim();
                                if (title && name && logo && page && deadline) {
                                    jobs.push({
                                        title,
                                        company: {name, logo},
                                        page: decodeURI(page),
                                        deadline,
                                        location
                                    });
                                }
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



