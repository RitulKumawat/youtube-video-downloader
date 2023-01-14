const express = require("express");
const ytdl = require("ytdl-core");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	return res.render("index");
});

app.get("/download", async (req, res) => {
	const id = req.query.url.split('v=')[1];
  ytdl.getInfo(id).then(info => {
    // For thumbnail
    let temp = info.videoDetails.thumbnail.thumbnails;
    return res.render("download", {
      url: info.player_response.streamingData.formats[0].url,
      thumbnail : temp[temp.length-1].url,
      title : info.videoDetails.title,
      keywords : info.videoDetails.keywords
    });
  });
});

app.listen(3000, () => {
	console.log("Server is running on http://localhost:3000");
});