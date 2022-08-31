const puppeteer = require("puppeteer");
const Scrape = require("../models").Scrape;
const Media = require("../models").Media;

const runningScrapeJob = async () => {
  /*
    For the demo app i'm pulling all urls at once and scraping
    But for real world application we can fetch N number of rows
    at a time and scrape.

    In this solution a error occur while scrpaing it will be delete also
    but for real world application we can have a column in Scrape table
    which will count number failed attempts and if that crosses a cerntain number
    it will put that into an error table for future reference
  */
  const totalCount = await Scrape.findAll();
  for (let num of totalCount) {
    const row = await Scrape.findOne({
      where: { id: Number(num.id) },
    });
    await scrapeData(row?.url);
    await Scrape.destroy({
      where: { id: Number(num.id) },
    });
  }
};

const scrapeData = async (url) => {
  if (!url) return;
  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.CHROMIUM_PATH,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "load", timeout: 0 });
    const photoUrls = await page.$$eval("img", (imgs) => {
      return imgs?.map((i) => ({ type: "img", src: i.src }));
    });
    const videoUrls = await page.$$eval("video", (videos) => {
      return videos?.map((v) => ({ type: "video", src: v.src }));
    });
    console.log({ photoUrls, videoUrls });
    await browser.close();
    await Media.bulkCreate([...photoUrls, ...videoUrls]);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  runningScrapeJob,
};
