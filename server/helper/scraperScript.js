const puppeteer = require("puppeteer");
const Scrape = require("../models").Scrape;
const Media = require("../models").Media;

const runningScrapeJob = async () => {
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
