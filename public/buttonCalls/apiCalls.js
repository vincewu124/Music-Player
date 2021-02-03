export async function loadPlaylists() {
	try {
		let info = await fetch('http://localhost:3005/info/get/playlists');
		const data = await info.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}

export async function showTracks(idNum) {
	try {
		let sendState = { id: idNum };
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(sendState),
		};
		const info = await fetch('http://localhost:3005/info/post/showTracks', options);
		const data = await info.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}

export async function unMuteVol(volValue) {
	try {
		const options = setupPost(volValue);
		await fetch('http://localhost:3005/volume/post/unMuteVol', options);
	} catch (error) {
		console.log(error);
	}
}

export async function updateVol(volValue) {
	try {
		const options = setupPost(volValue);
		await fetch('http://localhost:3005/volume/post/volume', options);
	} catch (error) {
		console.log(error);
	}
}

function setupPost(volValue) {
	let sendVol = { volume: volValue };
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(sendVol),
	};
	return options;
}

export async function muteVol() {
	try {
		await fetch('http://localhost:3005/volume/get/muteVol');
	} catch (error) {
		console.log(error);
	}
}

export async function updatePlayer() {
	try {
		const info = await fetch('http://localhost:3005/info/get/songInfo');
		const data = await info.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}

export async function skip() {
	try {
		await fetch('http://localhost:3005/media/get/skip');
	} catch (error) {
		console.log(error);
	}
}

export async function prev() {
	try {
		await fetch('http://localhost:3005/media/get/prev');
	} catch (error) {
		console.log(error);
	}
}

export async function play() {
	try {
		await fetch('http://localhost:3005/media/get/play');
	} catch (error) {
		console.log(error);
	}
}

export async function pause() {
	try {
		await fetch('http://localhost:3005/media/get/pause');
	} catch (error) {
		console.log(error);
	}
}

export async function shuffle(state) {
	try {
		let sendState = { state: state };
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(sendState),
		};
		await fetch('http://localhost:3005/media/post/shuffle', options);
	} catch (error) {
		console.log(error);
	}
}

export async function repeat(state) {
	try {
		let sendState = { state: state };
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(sendState),
		};
		await fetch('http://localhost:3005/media/post/repeat', options);
	} catch (error) {
		console.log(error);
	}
}

export async function setMaxVol() {
	await updateVol(100);
}

export async function updateProgress(position) {
	const desiredPosition = Math.floor(position);
	try {
		let sendPosition = { position: desiredPosition };
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(sendPosition),
		};
		await fetch('http://localhost:3005/progress/post/songProgress', options);
	} catch (error) {
		console.log(error);
	}
}
