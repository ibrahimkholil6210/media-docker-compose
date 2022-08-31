const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
var cron = require("node-cron");
const usersRoute = require("./route/users");
const scrapesRoute = require("./route/scrapes");
const mediaUrlsRoute = require("./route/mediaUrls");
const { runningScrapeJob } = require("./helper/scraperScript");
require("dotenv").config();

app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(morgan("dev"));

app.use("/api/v1/users", usersRoute);
app.use("/api/v1/scrapes", scrapesRoute);
app.use("/api/v1/media", mediaUrlsRoute);
app.all("*", (req, res) => {
  res.status(404).json({
    status: 404,
    error: `Can't find ${req.originalUrl} on this server`,
  });
});

cron.schedule("0 */5 * * * *", runningScrapeJob);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
