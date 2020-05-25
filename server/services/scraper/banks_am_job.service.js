'use strict';
const request = require('request'),
    cheerio = require('cheerio'),
    moment = require('moment'),
    implement = require('implement-js').default,
    ScrapInterface = require('./interfaces/scrap.interface');

const BanksAmJobService = {
    site: 'https://job.banks.am',
    getJobs() {
        return new Promise((resolve, reject) => {
            request(`${this.site}/am/search`, async (error, response, body) => {

                if (!error) {
                    //load HTML body with current page
                    const $ = cheerio.load(body);
                    const item = $("div#home").find('.col-sm-6');
                    let jobs = [];
                    if (item.length) {
                        let index = 0;
                        while (index < item.length) {
                            if ($(item[index]).find('a').attr('href')) {
                                const page = this.site + $(item[index]).find('a').attr('href');
                                const jobPageHTML = await this.getJobPage(page);
                                const logo = this.site + jobPageHTML("div#home").find("img.img-responsive").attr('src'),
                                    title = jobPageHTML('[for="position"]').next().children().text().trim(),
                                    name = jobPageHTML('meta[name=description]').attr('content'),
                                    deadline = moment(jobPageHTML('.lead').text().trim()).format('DD MMMM YYYY'),
                                    location = jobPageHTML('[for="region"]')[0].next.next.children[1].children[0].data.trim();
                                if (title && name && logo && page && deadline) {
                                    jobs.push({
                                        title,
                                        company: {name, logo},
                                        page,
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

module.exports = implement(ScrapInterface)(BanksAmJobService);

