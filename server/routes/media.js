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

router.get('/get/play', cors(), (req, res) => {
	spotifyApi.play().then(
		function () {
			console.log('Playback started');
			res.end();
		},
		function (err) {
			console.log(err);
			res.end();
		}
	);
});

router.get('/get/pause', cors(), async (req, res) => {
	await spotifyApi.pause().then(
		function () {
			console.log('Playback paused');
			res.end();
		},
		function (err) {
			console.log(err);
			res.end();
		}
	);
});

router.get('/get/skip', cors(), (req, res) => {
	spotifyApi.skipToNext().then(
		function () {
			console.log('Skip to next');
			res.end();
		},
		function (err) {
			console.log(err);
			res.end();
		}
	);
});

router.get('/get/prev', cors(), (req, res) => {
	spotifyApi.skipToPrevious().then(
		function () {
			console.log('Skip to previous');
			res.end();
		},
		function (err) {
			console.log(err);
			res.end();
		}
	);
});

router.post('/post/shuffle', cors(), async (req, res) => {
	await spotifyApi.setShuffle(req.body.state).then(
		function () {
			console.log(`Shuffle is: ${req.body.state}`);
			res.end();
		},
		function (err) {
			console.log(err);
			res.end();
		}
	);
});

router.post('/post/repeat', cors(), async (req, res) => {
	await spotifyApi.setRepeat(req.body.state).then(
		function () {
			console.log(`Repeat track ${req.body.state}`);
			res.end();
		},
		function (err) {
			console.log(err);
			res.end();
		}
	);
});

module.exports = router;
