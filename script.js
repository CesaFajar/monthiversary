 document.addEventListener('DOMContentLoaded', function() {
            // Create floating elements
            const floatingElements = document.getElementById('floatingElements');
            const elements = ['🌸', '🌺', '🌼', '🌻', '🌷', '🏵️', '💮', '🐼'];
            
            for (let i = 0; i < 20; i++) {
                const element = document.createElement('div');
                element.className = 'floating-element';
                element.textContent = elements[Math.floor(Math.random() * elements.length)];
                element.style.left = `${Math.random() * 100}%`;
                element.style.fontSize = `${Math.random() * 20 + 10}px`;
                element.style.animationDelay = `${Math.random() * 15}s`;
                element.style.animationDuration = `${Math.random() * 15 + 10}s`;
                floatingElements.appendChild(element);
            }
            
            // Create flower field
            const flowerField = document.getElementById('flowerField');
            const flowerImages = [
                'https://placehold.co/60x60/F8A5C2/FFFFFF?text=🌺',
                'https://placehold.co/60x60/FFD166/FFFFFF?text=🌻',
                'https://placehold.co/60x60/A1E8AF/FFFFFF?text=🌸',
                'https://placehold.co/60x60/FBC9E0/FFFFFF?text=🌼',
                'https://placehold.co/60x60/B8D8D8/FFFFFF?text=🌷'
            ];
            
            for (let i = 0; i < 12; i++) {
                const flower = document.createElement('div');
                flower.className = 'flower';
                flower.style.backgroundImage = `url('${flowerImages[i % flowerImages.length]}')`;
                flower.addEventListener('click', function() {
                    this.style.transform = 'scale(1.5) rotate(360deg)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1) rotate(0deg)';
                    }, 300);
                });
                flowerField.appendChild(flower);
            }
            
            // Celebration button
            const celebrationBtn = document.getElementById('celebrationBtn');
            const specialModal = document.getElementById('specialModal');
            const closeBtn = document.getElementById('closeBtn');
            
            celebrationBtn.addEventListener('click', function() {
                specialModal.style.display = 'flex';
                
                // Add floating elements
                for (let i = 0; i < 30; i++) {
                    const element = document.createElement('div');
                    element.className = 'floating-element';
                    element.textContent = ['🌸', '🌺', '🎉', '🌟', '🐼'][Math.floor(Math.random() * 5)];
                    element.style.position = 'fixed';
                    element.style.left = `${Math.random() * 100}%`;
                    element.style.bottom = '-50px';
                    element.style.fontSize = `${Math.random() * 30 + 20}px`;
                    element.style.animation = `float ${Math.random() * 3 + 2}s linear forwards`;
                    document.body.appendChild(element);
                    
                    setTimeout(() => {
                        document.body.removeChild(element);
                    }, 5000);
                }
            });
            
            closeBtn.addEventListener('click', function() {
                specialModal.style.display = 'none';
            });
            
            // Close modal when clicking outside
            window.addEventListener('click', function(event) {
                if (event.target === specialModal) {
                    specialModal.style.display = 'none';
                }
            });
            
            // Music Player Functionality
            const musicToggleBtn = document.getElementById('musicToggleBtn');
            const musicBox = document.getElementById('musicBox');
            const audioPlayer = document.getElementById('audioPlayer');
            const playPauseBtn = document.getElementById('playPauseBtn');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const progress = document.getElementById('progress');
            const progressContainer = document.getElementById('progressContainer');
            const currentTimeEl = document.getElementById('currentTime');
            const durationEl = document.getElementById('duration');
            const volumeSlider = document.getElementById('volumeSlider');
            const musicTitle = document.getElementById('musicTitle');
            const musicArtist = document.getElementById('musicArtist');
            const playlist = document.getElementById('playlist');
            
            // Songs
            const songs = [
                {
                    title: "Surat Cinta Untuk Starla",
                    artist: "virgoun",
                    cover: "image/2.png",
                    src:"audio/1.mp3"
                },
            ];
            
            let currentSongIndex = 0;
            let isPlaying = false;
            let isMusicBoxVisible = false;
            
            // Initialize playlist
            function initPlaylist() {
                playlist.innerHTML = '';
                
                songs.forEach((song, index) => {
                    const playlistItem = document.createElement('div');
                    playlistItem.className = `playlist-item ${index === currentSongIndex ? 'active' : ''}`;
                    playlistItem.innerHTML = `
                        <div class="playlist-item-info">
                            <span class="playlist-item-title">${song.title}</span>
                            <span class="playlist-item-artist">${song.artist}</span>
                        </div>
                        <span>${formatTime(audioPlayer.duration)}</span>
                    `;
                    
                    playlistItem.addEventListener('click', () => {
                        currentSongIndex = index;
                        loadSong(currentSongIndex);
                        playSong();
                    });
                    
                    playlist.appendChild(playlistItem);
                });
            }
            
            // Load song
            function loadSong(index) {
                const song = songs[index];
                musicTitle.textContent = song.title;
                musicArtist.textContent = song.artist;
                document.querySelector('.music-box-image img').src = song.cover;
                audioPlayer.src = song.src;
                
                // Update active playlist item
                document.querySelectorAll('.playlist-item').forEach(item => {
                    item.classList.remove('active');
                });
                document.querySelectorAll('.playlist-item')[index].classList.add('active');
            }
            
            // Play song
            function playSong() {
                isPlaying = true;
                audioPlayer.play();
                playPauseBtn.textContent = '⏸';
            }
            
            // Pause song
            function pauseSong() {
                isPlaying = false;
                audioPlayer.pause();
                playPauseBtn.textContent = '▶';
            }
            
            // Previous song
            function prevSong() {
                currentSongIndex--;
                if (currentSongIndex < 0) {
                    currentSongIndex = songs.length - 1;
                }
                loadSong(currentSongIndex);
                if (isPlaying) {
                    playSong();
                }
            }
            
            // Next song
            function nextSong() {
                currentSongIndex++;
                if (currentSongIndex > songs.length - 1) {
                    currentSongIndex = 0;
                }
                loadSong(currentSongIndex);
                if (isPlaying) {
                    playSong();
                }
            }
            
            // Update progress bar
            function updateProgress(e) {
                const { duration, currentTime } = e.srcElement;
                const progressPercent = (currentTime / duration) * 100;
                progress.style.width = `${progressPercent}%`;
                currentTimeEl.textContent = formatTime(currentTime);
                
                // Auto update duration when it's available
                if (duration) {
                    durationEl.textContent = formatTime(duration);
                } else {
                    durationEl.textContent = '0:00';
                }
            }
            
            // Set progress
            function setProgress(e) {
                const width = this.clientWidth;
                const clickX = e.offsetX;
                const duration = audioPlayer.duration;
                audioPlayer.currentTime = (clickX / width) * duration;
            }
            
            // Format time
            function formatTime(seconds) {
                const mins = Math.floor(seconds / 60);
                const secs = Math.floor(seconds % 60);
                return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
            }
            
            // Event listeners
            musicToggleBtn.addEventListener('click', () => {
                isMusicBoxVisible = !isMusicBoxVisible;
                if (isMusicBoxVisible) {
                    musicBox.classList.add('visible');
                } else {
                    musicBox.classList.remove('visible');
                }
            });
            
            playPauseBtn.addEventListener('click', () => {
                isPlaying ? pauseSong() : playSong();
            });
            
            prevBtn.addEventListener('click', prevSong);
            nextBtn.addEventListener('click', nextSong);
            
            audioPlayer.addEventListener('timeupdate', updateProgress);
            audioPlayer.addEventListener('ended', nextSong);
            
            progressContainer.addEventListener('click', setProgress);
            
            volumeSlider.addEventListener('input', (e) => {
                audioPlayer.volume = e.target.value;
            });
            
            // Initialize player
            loadSong(currentSongIndex);
            initPlaylist();
        });