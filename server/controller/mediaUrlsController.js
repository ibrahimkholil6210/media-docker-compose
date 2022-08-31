const MediaUrls = require("../models").Media;

exports.getMediaUrls = async (req, res) => {
  const { limit = 10, offset = 0, type = "all" } = req.query;
  try {
    const urls = await MediaUrls.findAndCountAll({
      limit,
      offset,
      ...(type !== "all" && { where: { type } }),
      order: [["id", "ASC"]],
    });
    return res.status(200).send({ totalCount: urls.count, list: urls.rows });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Internal server error", error: err.message });
  }
};
