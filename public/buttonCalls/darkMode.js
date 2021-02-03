// selectors
const playPauseImage = document.querySelector(".pausePlayImage");
const prevImage = document.querySelector(".prevImage");
const skipImage = document.querySelector(".skipImage");

//fumctions

export function changeMode(modeTheme, logoImage, pausePlayState) {
    if (modeTheme) {
        document.documentElement.setAttribute('data-theme', 'dark');
        prevImage.src = "./img/darkMode_icon/prev.svg";
        skipImage.src = "./img/darkMode_icon/next.svg";
        logoImage.src = "./img/darkMode_icon/spotify.svg";
        changePausePlay(pausePlayState, "dark");
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        playPauseImage.src = "./img/play.svg";
        prevImage.src = "./img/prev.svg";
        skipImage.src = "./img/next.svg";
        logoImage.src = "./img/apple.svg";
        changePausePlay(pausePlayState, "light");
    }
}


function changePausePlay(pausePlayState, darkOrLight) {
    if (darkOrLight == "dark") {
        if (pausePlayState) {
            //pause
            playPauseImage.src = "./img/darkMode_icon/pause.svg";
        } else {
            playPauseImage.src = "./img/darkMode_icon/play.svg";
        }
    } else {
        if (pausePlayState) {
            //pause
            playPauseImage.src = "./img/pause.svg";
        } else {
            playPauseImage.src = "./img/play.svg";
        }
    }
}
