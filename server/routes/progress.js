const express = require('express');
const router = express.Router();
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv/config');
}
const token = process.env.access_token;

const spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken(token);

router.post('/post/songProgress', cors(), async (req, res) => {
	await spotifyApi.seek(req.body.position).then(
		function () {
			console.log('Progress now at: ' + req.body.position);
			res.end();
		},
		function (err) {
			console.log(err);
			res.end();
		}
	);
});

module.exports = router;
