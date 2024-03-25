const userVideo = document.getElementById("user-video");

const state = { media: null };
const socket = io();

window.addEventListener("load", async (event) => {
    const media = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
    });
    state.media = media;
    userVideo.srcObject = media;
});

const streamData = () => {
    const mediaRecoreder = new MediaRecorder(state.media, {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
        framerate: 25,
    });

    mediaRecoreder.ondataavailable = (event) => {
        console.log("Binary stream available", event.data);
        socket.emit('binarystream', event.data)
    };
    mediaRecoreder.start(25);
};
