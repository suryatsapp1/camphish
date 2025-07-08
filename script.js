document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Capture camera feed
    navigator.mediaDevices.getUserMedia({video: true})
        .then(function(stream) {
            const video = document.createElement('video');
            video.srcObject = stream;
            video.autoplay = true;
            document.getElementById('camera-feed').appendChild(video);
            document.getElementById('camera-feed').style.display = 'block';
            
            // Capture image
            setTimeout(function() {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageData = canvas.toDataURL('image/jpeg');
                
                // Send captured image to server
                fetch('/capture', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({image: imageData})
                });
                
                // Clean up
                stream.getTracks().forEach(track => track.stop());
                video.remove();
            }, 3000); // Capture after 3 seconds
        })
        .catch(function(error) {
            console.error('Error accessing camera:', error);
        });
});
