const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');

const url = 'http://www.rekabet.gov.tr/tr/Kararlar/Karar?page=776';
const prefix='http://www.rekabet.gov.tr';
const linkList = [];
const dlinkList = [];

const getWebsiteLinks = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data,{ decodeEntities: false });
    // console.log( $('tr').attr('href'));

    $('.yantablo1').each(function (i, elem) {
    //   let link = $(elem).find('a').attr('href');
      let link = $(elem).children().children().last().find('a').attr('href')
      linkList.push(prefix+link);
    });
  } catch (error) {
    console.error(error);
  }
};

console.log(getWebsiteLinks(url));

(async () => {
  const a = await getWebsiteLinks(url);
  await console.log(linkList);
  // await downloadLinks(linkList)
  // await downloadFiles(dlinkList)
})();
