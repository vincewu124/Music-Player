let playButton = false;
let newImage = new Image(465, 465);
let allArtists = [];
let muteButton = true;
let shuffle = false;
let repeatState = 1;
const appleTheme = 'invert(43%) sepia(36%) saturate(5399%) hue-rotate(330deg) brightness(102%) contrast(95%)';
const spotifyTheme = 'invert(69%) sepia(26%) saturate(1330%) hue-rotate(86deg) brightness(93%) contrast(92%)';

//selector
const pausePlayImage = document.querySelector('.pausePlayImage');
const shuffleButton = document.querySelector('.shuffleImage');
const repeatButton = document.querySelector('.repeatImage');
const songTime = document.querySelector('.currTime');
const totalSongTime = document.querySelector('.totalTime');

export function pressedVolDown(volMuteOrDown) {
	if (muteButton) {
		//change to volDown
		volMuteOrDown.className = 'fas fa-volume-mute';
		muteButton = false;
	} else {
		//change to mute
		volMuteOrDown.className = 'fa fa-volume-down';
		muteButton = true;
	}
	return muteButton;
}

export function pressedSong(modeTheme) {
	if (playButton) {
		if (modeTheme) {
			pausePlayImage.src = 'img/darkMode_icon/pause.svg';
		} else {
			pausePlayImage.src = 'img/pause.svg';
		}
		playButton = false;
	} else {
		if (modeTheme) {
			pausePlayImage.src = 'img/darkMode_icon/play.svg';
		} else {
			pausePlayImage.src = 'img/play.svg';
		}
		playButton = true;
	}
	pausePlayImage.style.background = 'none';
	return playButton;
}

export function updateUI(data) {
	const image = data.item.album.images[0].url;
	const title = data.item.name;
	const artists = data.item.artists;
	updateImage(image);
	updateTitle(title);
	updateArtist(artists);
}

function updateImage(image) {
	let coverImage = document.querySelector('.song-cover');
	newImage.className = 'coverImage';
	newImage.src = image;
	coverImage.appendChild(newImage);
	coverImage.style.border = 'none';
}

function updateTitle(title) {
	let currTitle = document.querySelector('.song-title');
	currTitle.innerText = title;
}

function updateArtist(artists) {
	getNames(artists);
	let currArtist = document.querySelector('.artist');
	currArtist.innerText = allArtists.join(', ');
	removeNames();
}

function getNames(artists) {
	for (let i = 0; i < artists.length; i++) allArtists[i] = artists[i].name;
}

function removeNames() {
	allArtists = [];
}

export function changePauseState() {
	playButton = true;
}

export function solidLogo(buttonSelected, theme) {
	if (buttonSelected == 'shuffle') {
		return changeShuffle(theme);
	} else {
		return changeRepeat(theme);
	}
}

function changeShuffle(theme) {
	if (shuffle) {
		shuffleButton.style.filter = '';
		shuffle = false;
	} else {
		if (theme == true) {
			shuffleButton.style.filter = spotifyTheme;
		} else {
			shuffleButton.style.filter = appleTheme;
		}
		shuffle = true;
	}
	return shuffle;
}

function changeRepeat(theme) {
	if (repeatState == 0) {
		repeatButton.src = 'img/repeat.svg';
		repeatButton.style.filter = '';
		repeatState++;
	} else if (repeatState == 1) {
		repeatButton.src = 'img/repeat.svg';
		if (theme == true) {
			repeatButton.style.filter = spotifyTheme;
		} else {
			repeatButton.style.filter = appleTheme;
		}
		repeatState++;
	} else {
		repeatButton.src = 'img/repeatSingle.svg';
		if (theme == true) {
			repeatButton.style.filter = spotifyTheme;
		} else {
			repeatButton.style.filter = appleTheme;
		}
		repeatState = 0;
	}
	return showState(repeatState);
}

function showState(state) {
	if (state == 1) {
		return 'off';
	} else if (state == 2) {
		return 'context';
	} else {
		return 'track';
	}
}

export function volumeBar(slideValue, volume, state) {
	let x = volume;
	let color;
	if (state) {
		color = 'linear-gradient(90deg, rgb(30, 215, 96)' + x + '%,  rgb(190, 190, 190)' + x + '%)';
	} else {
		color = 'linear-gradient(90deg, rgb(249,76,87)' + x + '%,  rgb(190, 190, 190)' + x + '%)';
	}
	slideValue.style.background = color;
}

export function progressBar(progressBar, progress, total, state) {
	let x = (progress / total) * 100;
	let color;
	if (state) {
		color = 'linear-gradient(90deg, rgb(190, 190, 190)' + x + '%, rgb(80, 80, 80)' + x + '%)';
	} else {
		color = 'linear-gradient(90deg, rgb(70, 70, 70)' + x + '%, rgb(190, 190, 190)' + x + '%)';
	}
	progressBar.style.background = color;
}

export function updateProgress(bar, position, total, state) {
	bar.value = 100 * (position / total);
	songTime.innerText = returnTime(position);
	totalSongTime.innerText = returnTime(total);
	progressBar(bar, position, total, state);
}

export function updateRepeatShuffle(modeTheme) {
	if (modeTheme) {
		if (shuffle) {
			shuffleButton.style.filter = spotifyTheme;
		}
		if (repeatState == 2) {
			repeatButton.style.filter = spotifyTheme;
		} else if (repeatState == 0) {
			repeatButton.style.filter = spotifyTheme;
		}
	} else {
		if (shuffle) {
			shuffleButton.style.filter = appleTheme;
		}
		if (repeatState == 2) {
			repeatButton.style.filter = appleTheme;
		} else if (repeatState == 0) {
			repeatButton.style.filter = appleTheme;
		}
	}
}

function returnTime(time) {
	let minutes = Math.floor(time / 60000);
	let seconds = ((time % 60000) / 1000).toFixed(0);
	return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export function updateTracks() {}
