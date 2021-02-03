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

router.get('/get/songInfo', cors(), async (req, res) => {
	await spotifyApi.getMyCurrentPlayingTrack().then(
		function (data) {
			res.json(data.body);
			res.end();
		},
		function (err) {
			console.log(err);
			res.end();
		}
	);
});

//functions below not used

router.get('/get/playlists', cors(), async (req, res) => {
	spotifyApi.getUserPlaylists('vincewu124').then(
		function (data) {
			res.json(data.body.items);
			res.end();
		},
		function (err) {
			console.log(err);
			res.end();
		}
	);
});

router.post('/post/showTracks', cors(), async (req, res) => {
	spotifyApi
		.getPlaylistTracks(req.body.id, {
			offset: 0,
			limit: 10,
			fields: 'items',
		})
		.then(
			function (data) {
				console.log('The playlist contains these tracks', data.body.items[0].track);
				res.json(data.body.items);
				res.end();
			},
			function (err) {
				console.log(err);
				res.end();
			}
		);
});

module.exports = router;
