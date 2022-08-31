const Scrape = require('../models').Scrape

exports.ScrapeUrls = async (req, res) => {
  await Scrape.bulkCreate(req?.body?.urls?.map(url => ({url})))
  res.status(201).send("Urls have been saved to the database and its in schedule to be scrped soon!");
};
