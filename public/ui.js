import * as updateUi from './buttonCalls/updateUi.js';
import * as apiCall from './buttonCalls/apiCalls.js';
import * as dark from './buttonCalls/darkMode.js';
// ///////////////////////////////////////////////////////////////////////
//global variables
let difference = 0;
let timer;
let currVol = 50;
let pausePlayState = false;
let modeTheme = false;
let currSongTime = 0;
let totalSongTime = 100;
let counter = 0;

//selector
const login = document.querySelector('.loginButton');
const playPauseButton = document.querySelector('.playPauseButton');
const skip = document.querySelector('.next');
const prev = document.querySelector('.prev');
const slideValue = document.querySelector('.slider');
const volDown = document.querySelector('.muteOrVol');
const volMuteOrDown = document.getElementById('muteOrDown');
const shuffle = document.querySelector('.shuffle');
const repeat = document.querySelector('.repeat');
const maxVol = document.querySelector('.volUp');
const toggled = document.querySelector('.toggleMode');
const logoImage = document.querySelector('.themeLogo');
const progressBar = document.querySelector('.progressBar');
const playlistList = document.querySelector('.playlists');

// Dark Mode
toggled.addEventListener('change', () => {
	// defaults false
	if (toggled.checked) {
		// turn dark
		modeTheme = true;
		dark.changeMode(modeTheme, logoImage, pausePlayState);
		updateUi.updateRepeatShuffle(modeTheme);
		updateUi.volumeBar(slideValue, slideValue.value, modeTheme);
		updateUi.progressBar(progressBar, currSongTime, totalSongTime, modeTheme);
	} else {
		// turn light
		modeTheme = false;
		dark.changeMode(modeTheme, logoImage, pausePlayState);
		updateUi.updateRepeatShuffle(modeTheme);
		updateUi.volumeBar(slideValue, slideValue.value, modeTheme);
		updateUi.progressBar(progressBar, currSongTime, totalSongTime, modeTheme);
	}
});

//////////////////////////////////////////

//event listeners
window.onload = loadPage();

async function loadPage() {
	pressedSong();
}

shuffle.addEventListener('click', async () => {
	const state = updateUi.solidLogo('shuffle', modeTheme);
	await apiCall.shuffle(state);
});

repeat.addEventListener('click', async () => {
	const state = updateUi.solidLogo('repeat', modeTheme);
	await apiCall.repeat(state);
});

progressBar.addEventListener('mousemove', () => {
	updateUi.progressBar(progressBar, progressBar.value, 100, modeTheme);
});

slideValue.addEventListener('mousemove', () => {
	updateUi.volumeBar(slideValue, slideValue.value, modeTheme);
});

volDown.addEventListener('click', async () => {
	await pressedVolDown();
});

maxVol.addEventListener('click', async () => {
	await apiCall.setMaxVol();
	slideValue.value = 100;
	updateUi.volumeBar(slideValue, 100, modeTheme);
});

playPauseButton.addEventListener('click', async () => {
	await pressedSong();
});

skip.addEventListener('click', async () => {
	try {
		setTimeZero();
		clearInterval(timer);
		await apiCall.skip();
		updateUi.changePauseState();
		await pressedSong();
		await apiCall.updatePlayer();
	} catch (error) {
		console.log(error);
	}
});

prev.addEventListener('click', async () => {
	try {
		clearInterval(timer);
		setTimeZero();
		await apiCall.prev();
		updateUi.changePauseState();
		await pressedSong();
		await apiCall.updatePlayer();
	} catch (error) {
		console.log(error);
	}
});

//methods

slideValue.oninput = async () => {
	let volValue = slideValue.value;
	await apiCall.updateVol(volValue);
};

//updates the progress of the song
progressBar.onchange = async () => {
	//clears timer
	clearInterval(timer);
	setTimeZero();

	//calls api to update new time
	const position = totalSongTime * (progressBar.value * 0.01);
	console.log(position);
	console.log('the total time is: ' + totalSongTime);
	await apiCall.updateProgress(position);

	//sets the new timer (setTimer() also updates the progress bar)
	const info = await apiCall.updatePlayer();
	console.log('updatedplayer info position: ' + info.progress_ms);
	updateUi.updateUI(info);
	setTimer(info);
};

async function pressedSong() {
	if (updateUi.pressedSong(modeTheme)) {
		pausePlayState = false;
		await pauseSong();
	} else {
		pausePlayState = true;
		await playSong();
	}
}

async function playSong() {
	try {
		await apiCall.play();
		const playerInfo = await apiCall.updatePlayer();
		updateUi.updateUI(playerInfo);
		setTimer(playerInfo);
	} catch (error) {
		console.log(error);
	}
}

async function pauseSong() {
	try {
		await apiCall.pause();
		const playerInfo = await apiCall.updatePlayer();
		clearInterval(timer);
		updateUi.updateUI(playerInfo);
		setTimeZero();
	} catch (error) {
		console.log(error);
	}
}

async function pressedVolDown() {
	if (updateUi.pressedVolDown(volMuteOrDown)) {
		await apiCall.unMuteVol(currVol);
		slideValue.value = currVol;
		updateUi.volumeBar(slideValue, currVol, modeTheme);
	} else {
		currVol = slideValue.value;
		slideValue.value = 0;
		await apiCall.muteVol();
		updateUi.volumeBar(slideValue, 0, modeTheme);
	}
}

async function setTimer(data) {
	currSongTime = data.progress_ms;
	totalSongTime = data.item.duration_ms;
	counter = currSongTime;
	difference = totalSongTime - (currSongTime + 1000);
	timer = setInterval(async () => {
		if (difference > 0) {
			updateUi.updateProgress(progressBar, counter, totalSongTime, modeTheme);
			counter += 1000;
			difference -= 1000;
		} else {
			clearInterval(timer);
			counter = 0;
			let info = await apiCall.updatePlayer();
			updateUi.updateUI(info);
			setTimeZero();
			timer = 0;
			newTimer(info);
		}
	}, 1000);
}

function newTimer(data) {
	setTimer(data);
}

function setTimeZero() {
	counter = 0;
	difference = 0;
}
