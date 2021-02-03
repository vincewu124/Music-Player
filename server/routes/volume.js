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

router.post('/post/volume', cors(), async (req, res) => {
	await spotifyApi.setVolume(req.body.volume).then(
		function () {
			console.log('Volume now: ' + req.body.volume);
			res.end();
		},
		function (err) {
			console.log(err);
			res.end();
		}
	);
});

router.get('/get/muteVol', cors(), (req, res) => {
	spotifyApi.setVolume(0).then(
		function () {
			console.log('Volume Muted');
			res.end();
		},
		function (err) {
			console.log(err);
			res.end();
		}
	);
});

router.post('/post/unMuteVol', cors(), async (req, res) => {
	await spotifyApi.setVolume(req.body.volume).then(
		function () {
			console.log('Volume now: ' + req.body.volume);
			res.end();
		},
		function (err) {
			console.log(err);
			res.end();
		}
	);
});

module.exports = router;
