const nowPlayingUrl = "https://radiopaneel.league-fm.nl/api/nowplaying/leaguefm";
        const audio = document.getElementById('audioPlayer');
        const playButton = document.getElementById('playButton');
        let isPlaying = false;

        async function fetchSongInfo() {
            try {
                const response = await fetch(nowPlayingUrl);
                const data = await response.json();
                const song = data.now_playing.song.title;
                const artist = data.now_playing.song.artist;
                const albumArt = data.now_playing.song.art 
                    ? data.now_playing.song.art 
                    : "https://via.placeholder.com/80";

                document.getElementById('songTitle').innerText = song;
                document.getElementById('artistName').innerText = artist;
                document.getElementById('albumArt').src = albumArt;
            } catch (error) {
                console.error("Error fetching song info:", error);
                document.getElementById('songTitle').innerText = "Fout bij laden";
                document.getElementById('artistName').innerText = "Onbekende artiest";
                document.getElementById('albumArt').src = "https://academy.league-fm.nl/images/logolfm.png";
            }
        }

        // Ververs de songinformatie elke 30 seconden
        fetchSongInfo();
        setInterval(fetchSongInfo, 30000);

        function togglePlay() {
            if (isPlaying) {
                audio.pause();
                playButton.innerHTML = '&#9654;'; 
            } else {
                audio.src = "https://radiopaneel.league-fm.nl/listen/leaguefm/stream"; // Reset de stream link
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

        // Luister naar berichten vanuit de client om de UI te openen
        window.addEventListener('message', function(event) {
            if (event.data.type === 'ui') {
                if (event.data.display === true) {
                    document.getElementById('musicPlayer').style.display = 'flex'; // Toont de UI
                } else {
                    document.getElementById('musicPlayer').style.display = 'none'; // Verbergt de UI
                }
            }
        });

        const volumeSlider = document.getElementById('volumeSlider');

        volumeSlider.addEventListener('input', function() {
            const value = (this.value - this.min) / (this.max - this.min) * 100; 
            this.style.background = `linear-gradient(to right, #2953A5 ${value}%, #ddd ${value}%)`;
        });