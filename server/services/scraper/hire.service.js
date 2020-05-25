'use strict';
const request = require('request'),
    cheerio = require('cheerio'),
    moment = require('moment'),
    implement = require('implement-js').default,
    ScrapInterface = require('./interfaces/scrap.interface');

const HireService = {
    site: 'http://www.hire.am',
    getJobs() {
        return new Promise((resolve, reject) => {
            request(`${this.site}`, (error, response, body) => {

                if (!error) {
                    //load HTML body with current page
                    const $ = cheerio.load(body);

                    const content = $("div#content");
                    const itemRow = content.find('.row');
                    const itemRowAlt = content.find('.row-alt');

                    const item = {...itemRow, ...itemRowAlt};

                    let jobs = [];
                    if (item.length) {
                        let index = 0;
                        while (index < item.length) {
                            const fullInfo = $(item[index]).find(".row-info").text().trim();
                            const companyAndLocation = fullInfo.split('at')[1].split('in');
                            const logo = null,
                                page = decodeURI($(item[index]).find("a").attr('href')),
                                title = $(item[index]).find("a").attr('title').trim(),
                                name = companyAndLocation[0].split(',')[0],
                                deadline = moment($(item[index]).find(".time-posted").text().trim(), 'DD-MM-YYYY').format('DD MMMM YYYY'),
                                location = companyAndLocation[1] || companyAndLocation[0].split(',')[1];
                            if (title && name && page && deadline) {
                                jobs.push({
                                    title,
                                    company: {
                                        name: name.trim(), logo
                                    },
                                    page,
                                    deadline,
                                    location: location.trim()
                                });
                            }
                            index++;
                        }
                    }
                    //console.log(jobs)
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

module.exports = implement(ScrapInterface)(HireService);
