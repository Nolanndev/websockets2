


class VideoService {
    constructor(socketService) {
        this.socket = socketService;
        this.localStream = null;
        
        this.initializeMedia();

        socketService.socket.on('video', () => {
            console.log('video');
        })
    }

    async initializeMedia() {
        try {
            this.localStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            const localVideo = document.createElement('video');
            localVideo.autoplay = true;
            localVideo.srcObject = this.localStream;
            localVideo.muted = true;
            document.getElementById('videos').appendChild(localVideo);
            return true;
        } catch (err) {
            console.error('Erreur accès média:', err);
            return false;
        }
    }

    stop() {
        
    }
}

export default VideoService;