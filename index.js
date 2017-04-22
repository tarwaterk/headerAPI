var express = require("express");

var app = express();
var port = process.env.PORT || 3000;

app.use("/", express.static(__dirname));

app.get("/", function(req, res) {
	var clientInfo = {
		ipAddress: null,
		language: null,
		os: null
	}
	clientInfo.ipAddress = req.connection.remoteAddress.replace(/^.*:/, "");
	clientInfo.language = req.headers["accept-language"].match(/(.*?)[,]/)[1];
	clientInfo.os = req.headers["user-agent"].match(/\((.*?)\)/)[1];
	
	res.send(clientInfo);
});

app.listen(port, function() {
	console.log("app started on http://localhost:" + port);
});