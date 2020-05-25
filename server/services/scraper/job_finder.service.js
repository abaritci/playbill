'use strict';
const request = require('request'),
    cheerio = require('cheerio'),
    moment = require('moment'),
    implement = require('implement-js').default,
    ScrapInterface = require('./interfaces/scrap.interface');

const JobFinderService = {
    site: 'http://www.jobfinder.am',
    getJobs() {
        return new Promise((resolve, reject) => {
            request(`${this.site}`, async (error, response, body) => {

                if (!error) {
                    //load HTML body with current page
                    const $ = cheerio.load(body);
                    const item = $(".grid").find('tr');
                    let jobs = [];
                    if (item.length) {
                        let index = 1;
                        while (index < item.length) {
                            const jobFinderIcon = this.site + '/' + $($(item[index]).find('td').eq(1).find("img")[0]).attr('src'),
                                page = this.site + '/' + $($(item[index]).find('td').eq(1).find("a")[1]).attr('href'),
                                title = $($(item[index]).find('td').eq(1).find("a")[0]).text().trim(),
                                name = $(item[index]).find('td').eq(2).find("span").text().trim(),
                                deadline = moment($(item[index]).find('td').eq(3).find("span").text().trim(), 'DD.MM.YY').format('DD MMMM YYYY'),
                                location = 'Yerevan';
                            const jobPageHTML = await this.getJobPage(page);
                            const companyLogo = jobPageHTML('#ctl00_bdyPlaceHolde_jfpanelViewJob_jfJobPreview_imgCompanyLogoLink').attr('src');

                            const logo = companyLogo ? this.site + '/' + companyLogo : jobFinderIcon;
                            if (title && name && logo && page && deadline) {
                                jobs.push({
                                    title,
                                    company: {name, logo},
                                    page,
                                    deadline,
                                    location
                                });
                            }
                            index += 2;
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

module.exports = implement(ScrapInterface)(JobFinderService);
