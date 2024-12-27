const nowPlayingUrl = "https://radiopaneel.fresh-hits.nl/api/nowplaying/1";
        const audio = document.getElementById('audioPlayer');
        const playButton = document.getElementById('playButton');
        let isPlaying = false;

        function truncateText(text, maxLength) {
            if (text.length > maxLength) {
                return text.slice(0, maxLength) + '...';
            }
            return text;
        }

        async function fetchSongInfo() {
            try {
                const response = await fetch(nowPlayingUrl);
                const data = await response.json();
                const song = data.now_playing.song.title;
                const artist = data.now_playing.song.artist;
                const albumArt = data.now_playing.song.art 
                    ? data.now_playing.song.art 
                    : "https://cdn.fresh-hits.nl/get/logozondertekst.png";

                document.getElementById('songTitle').innerText = truncateText(song, 17);
                document.getElementById('artistName').innerText = truncateText(artist, 17);
                document.getElementById('albumArt').src = albumArt;
            } catch (error) {
                console.error("Error fetching song info:", error);
                document.getElementById('songTitle').innerText = "Fout bij laden";
                document.getElementById('artistName').innerText = "Onbekende artiest";
                document.getElementById('albumArt').src = "https://cdn.fresh-hits.nl/get/logozondertekst.png";
            }
        }

        fetchSongInfo();
        setInterval(fetchSongInfo, 5000);

        function togglePlay() {
            if (isPlaying) {
                audio.pause();
                playButton.innerHTML = '&#9654;'; 
            } else {
                audio.src = "https://radiopaneel.fresh-hits.nl:8000/stream";
                audio.play();
                playButton.innerHTML = '&#10074;&#10074;'; 
            }
            isPlaying = !isPlaying;
        }

        function changeVolume(volume) {
            audio.volume = volume / 100;
        }

        function closeUI() {
            document.getElementById('musicPlayer').style.display = 'none';
            fetch(`https://${GetParentResourceName()}/close`, {
                method: 'POST'
            });
        }

        window.addEventListener('message', function(event) {
            if (event.data.type === 'ui') {
                if (event.data.display === true) {
                    document.getElementById('musicPlayer').style.display = 'flex';
                } else {
                    document.getElementById('musicPlayer').style.display = 'none';
                }
            }
        });

        const volumeSlider = document.getElementById('volumeSlider');

        volumeSlider.addEventListener('input', function() {
            const value = (this.value - this.min) / (this.max - this.min) * 100; 
            this.style.background = `linear-gradient(to right, rgb(55, 143, 89) ${value}%, #ddd ${value}%)`;
        });