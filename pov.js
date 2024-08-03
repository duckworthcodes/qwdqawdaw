// Facebook SDK setup
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.fbAsyncInit = function() {
    FB.init({
        appId      : '1000055404907481', // Your Facebook App ID
        cookie     : true,
        xfbml      : true,
        version    : 'v12.0' // Your API version
    });

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
};

function statusChangeCallback(response) {
    // Hide the loading spinner
    document.getElementById('loading').style.display = 'none';
    
    if (response.status === 'connected') {
        // User logged in, fetch their profile
        fetchUserProfile(response.authResponse.accessToken);
    } else {
        // User not logged in, hide profile info
        document.getElementById('profileInfo').style.display = 'none';
    }
}

function checkLoginState() {
    // Show the loading spinner
    document.getElementById('loading').style.display = 'block';
    
    // Check the Facebook login status
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

function fetchUserProfile(accessToken) {
    FB.api('/me', {fields: 'name,picture'}, function(response) {
        document.getElementById('profileName').textContent = 'Hello, ' + response.name;
        document.getElementById('profilePicture').src = response.picture.data.url;
        document.getElementById('profileInfo').style.display = 'block';
        document.querySelector('.fb-login-button').style.display = 'none';
    });
}

function logout() {
    FB.logout(function(response) {
        document.getElementById('profileInfo').style.display = 'none';
        document.querySelector('.fb-login-button').style.display = 'block';
    });
}

// Video player setup
const video = document.getElementById('video');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const seekBar = document.getElementById('seekBar');
const muteBtn = document.getElementById('muteBtn');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const videoSource = document.getElementById('videoSource');
const videoList = document.getElementById('videoList');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const viewsCount = document.getElementById('viewsCount');
const likesCount = document.getElementById('likesCount');
const commentsCount = document.getElementById('commentsCount');

const videos = [
    { title: 'Going Bad(Drake)', videoId: 'S1gp0m4B5p8', src:'https://d21v3ezekkpxhy.cloudfront.net/Going+Bad.mp4', thumbnail: 'https://m.media-amazon.com/images/M/MV5BYmU2Y2U1M2UtYjM0Yi00NGRlLWIxYzktNWU2NDU1MWIyM2NkXkEyXkFqcGdeQXVyODEwMzM4MTM@._V1_.jpg' },
{ title: 'J Cole - The Last Call', videoId: 'Jt5HyIiYIzM',src:'https://d21v3ezekkpxhy.cloudfront.net/The+Warm+Up+J+Cole+Last+Call.mp4', thumbnail: 'https://upload.wikimedia.org/wikipedia/en/2/2e/J-cole-the-warm-up.jpg' },
{ title: 'Zeze(Travis Scott)', videoId: 'EfHNIPXTxy0',src:'https://d21v3ezekkpxhy.cloudfront.net/ZEZE.mp4', thumbnail: 'https://townsquare.media/site/812/files/2018/10/Kodak-Black-ZeZe-Feature.jpg?w=780&q=75' },
{ title: 'Bound (Kanye+Tyler)', videoId: 'epF_-PmEUoc',src:'https://d21v3ezekkpxhy.cloudfront.net/Bound.mp4', thumbnail: 'https://upload.wikimedia.org/wikipedia/en/5/51/Igor_-_Tyler%2C_the_Creator.jpg' },
{ title: 'Duckworth(Kendrick)', videoId: 'fwhS9thRpcA',src:'https://d21v3ezekkpxhy.cloudfront.net/Duckworth.mp4', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLAXZN0U9RSOM47sFBa1a0gowH4vkIUpYIng&s' },
{ title: 'Feel The Fiyaah(Takeoff)', videoId: 'C3UXj2k7jHE', src:'https://d21v3ezekkpxhy.cloudfront.net/Feel+The+Fiyaah.mp4', thumbnail: 'https://i.scdn.co/image/ab67616d0000b273c4fee55d7b51479627c31f89'},
{ title: 'Fukk Sleep(A$AP Rocky)',videoId:'pM5XogpX1JA', src: 'https://d21v3ezekkpxhy.cloudfront.net/Fukk+Sleep.mp4', thumbnail:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTThvjz9T9Lm2krYtCqp-lY7pbPP7oiKiBeHsMKQR8yquU7iEpmFHWwIUU_visXnGTr3Wo&usqp=CAU" },
{ title: 'Good Ass Job(Kanye)',videoId:'uSGCGWz993I', src: 'https://d21v3ezekkpxhy.cloudfront.net/Good+Ass+Job.mp4', thumbnail:'https://i.scdn.co/image/ab67616d00001e02473ada707e579f3ef227cd1d'},    
{ title: 'IGOR(Tyler,The Creator)',videoId:'wfGuSP7PvW4', src: 'https://d21v3ezekkpxhy.cloudfront.net/IGOR.mp4', thumbnail:'https://upload.wikimedia.org/wikipedia/en/5/51/Igor_-_Tyler%2C_the_Creator.jpg' },
{ title: 'Never See Me Again(Kanye)',videoId:'yauFhOqoXRc', src: 'https://d21v3ezekkpxhy.cloudfront.net/Never+See+Me+Again.mp4', thumbnail:'https://i1.sndcdn.com/artworks-IDOwHDb51Ea9p5hC-Bwi2GQ-t240x240.jpg' },
{ title: '4 Your Eyez Only(J Cole)',videoId:'g_W9af_CQDs', src: 'https://d21v3ezekkpxhy.cloudfront.net/4+Your+Eyez+Only+J+Cole.mp4', thumbnail: 'https://i.scdn.co/image/ab67616d0000b273f4ca75192df162f78a24023e' },
{ title: 'Weeknd Collection',videoId:'JpnV9rvVBXo', src: 'https://d21v3ezekkpxhy.cloudfront.net/Weeknd+Unreleased.mp4', thumbnail: 'https://artist1.cdn107.com/00e/00e82728b9a9287bc27a28f3c7e0a2ae_xl.jpg' },
{ title: 'All Caps(MF DOOM)',videoId:'gSJeHDlhYls', src: 'https://d21v3ezekkpxhy.cloudfront.net/All+Caps+MF+DOOM.mp4', thumbnail: 'https://i.scdn.co/image/ab67616d0000b27374dc897ea75402db37ef239a' },
{ title: 'Back To The Moon (Gunna)',videoId:'7jAgLRk-sPc', src: 'https://d21v3ezekkpxhy.cloudfront.net/Back+To+The+Moon+Gunna.mp4', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCCgsMj9OxOKO4beK95m6ihod-En7ia9MyrA&s' },
{ title: 'Boredom(Tyler The Creator)',videoId:'jxlBOBOZHqI', src: 'https://d21v3ezekkpxhy.cloudfront.net/Boredom+Tyler+The+Creator.mp4', thumbnail: 'data:image/jpeg;base64,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' },
{ title: 'Brand New(Lil Wayne)',videoId:'-nOHoKKUkSY', src: 'https://d21v3ezekkpxhy.cloudfront.net/Brand+New+Lil+Wayne.mp4', thumbnail: 'data:image/jpeg;base64,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' },
{ title: 'California Love (2Pac)',videoId:'omfz62qu_Bc', src: 'https://d21v3ezekkpxhy.cloudfront.net/California+Love+2Pac.mp4', thumbnail: 'https://i.scdn.co/image/ab67616d0000b273eaea3c8408d2d21c05263d56' },
{ title: 'For The Longest Time (HIMYM)',videoId:'gK5IKEgt7e4', src: 'https://d21v3ezekkpxhy.cloudfront.net/For+The+Longest+Time+HIMYM.mp4', thumbnail: 'data:image/jpeg;base64,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' },
{ title: 'Hypnotize(Biggie)',videoId:'eaPzCHEQExs', src: 'https://d21v3ezekkpxhy.cloudfront.net/Hypnotize+Biggie.mp4', thumbnail: 'https://i.scdn.co/image/ab67616d0000b273fde79b88e2a659c394c5ae30' },
{ title: 'Meet The Grahams(Kendrick)',videoId:'2QiFl9Dc7D0', src: 'https://d21v3ezekkpxhy.cloudfront.net/Meet+The+Grahams+Kendrick.mp4', thumbnail: 'https://i1.sndcdn.com/artworks-bL476FRnavaRNVHG-teyEsw-t500x500.jpg' },
{ title: 'Moonshooter(AB-Soul)',videoId:'sDfjqudjYF4', src: 'https://d21v3ezekkpxhy.cloudfront.net/Moonshooter+AB+Soul+Joey+Bada$$.mp4', thumbnail: 'https://i.scdn.co/image/ab67616d0000b273940300fd91d0e1ca28ad3dcf' },
{ title: 'Nee Nah (Travis Scott + 21 Savage)',videoId:'hSitXYlIqKI', src: 'https://d21v3ezekkpxhy.cloudfront.net/Nee+Nah+Travis+Scott.mp4', thumbnail: 'https://upload.wikimedia.org/wikipedia/en/7/7b/AmericanDream.jpeg' },
{ title: 'Nikes(Frank Ocean)',videoId:'diIFhc_Kzng', src: 'https://d21v3ezekkpxhy.cloudfront.net/Nikes+Frank+Ocean.mp4', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO3gSIHmh8I21PJQPKRg0Nyu5J6OxpgT7OIQ&s' },
{ title: 'Nomad(Clario)',videoId:'Eg4FWiow2Ak', src: 'https://d21v3ezekkpxhy.cloudfront.net/Noamd+Clario.mp4', thumbnail: 'https://i1.sndcdn.com/artworks-UqfL5eliZgsaGeZz-2vJMMg-t500x500.jpg' },
{ title: 'One Beer(MF DOOM)',videoId:'hM5kbaero10', src: 'https://d21v3ezekkpxhy.cloudfront.net/One+Beer+MF+DOOM.mp4', thumbnail: 'https://i.ytimg.com/vi/h69FSgua80A/maxresdefault.jpg' },
{ title: 'Saint Pablo(Kanye West)',videoId:'5KW0JJsU-5g', src: 'https://d21v3ezekkpxhy.cloudfront.net/Saint+Pablo+Kanye+West.mp4', thumbnail: 'https://i.scdn.co/image/ab67616d0000b2732a7db835b912dc5014bd37f4' },
{ title: 'Sexual Erruption(Snoop Dogg)',videoId:'5QJu_ccw6Lg', src: 'https://d21v3ezekkpxhy.cloudfront.net/Sexual+Erruption+Snoop+Dogg.mp4', thumbnail: 'https://i.scdn.co/image/ab67616d0000b273fd4b4350b0da7a5d55bf803e' },
{ title: 'Still Dre(Snoop Dogg)',videoId:'U1yQMjFZ6j4', src: 'https://d21v3ezekkpxhy.cloudfront.net/Still+Dre+Dr+Dre+Snoop+Dogg.mp4', thumbnail: 'https://i.scdn.co/image/ab67616d0000b2739b19c107109de740bad72df5' },
{ title: 'Sweet/I Thought You Wanted To Dance',videoId:'2ZQI6xkB74w', src: 'https://d21v3ezekkpxhy.cloudfront.net/Sweet.mp4', thumbnail: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Call_Me_If_You_Get_Lost_album_cover.jpg' },
{ title: 'The Watcher(Dr. Dre)',videoId:'dhXnmUr1Zbg', src: 'https://d21v3ezekkpxhy.cloudfront.net/The+Watcher+Dr+Dre.mp4', thumbnail: 'https://i.scdn.co/image/ab67616d0000b2739b19c107109de740bad72df5' },

];

let currentVideoIndex = 0;

function loadVideo(index) {
    const videoDetails = videos[index];
    videoSource.src = videoDetails.src;
    video.load();
    updateActiveVideo();
    fetchYouTubeMetrics(videoDetails.videoId);
}

function updateActiveVideo() {
    const listItems = videoList.querySelectorAll('li');
    listItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentVideoIndex);
    });
}

playPauseBtn.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        video.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

prevBtn.addEventListener('click', () => {
    currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
    loadVideo(currentVideoIndex);
});

nextBtn.addEventListener('click', () => {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    loadVideo(currentVideoIndex);
});

video.addEventListener('timeupdate', () => {
    const progress = (video.currentTime / video.duration) * 100;
    seekBar.value = progress;
    updateCurrentTime();
});

video.addEventListener('loadedmetadata', () => {
    updateDuration();
});

seekBar.addEventListener('input', () => {
    const time = (seekBar.value / 100) * video.duration;
    video.currentTime = time;
});

muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    muteBtn.innerHTML = video.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
});

function updateCurrentTime() {
    const minutes = Math.floor(video.currentTime / 60);
    const seconds = Math.floor(video.currentTime % 60);
    currentTimeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function updateDuration() {
    const minutes = Math.floor(video.duration / 60);
    const seconds = Math.floor(video.duration % 60);
    durationDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function renderVideoList() {
    videoList.innerHTML = videos.map((video, index) => `
        <li data-index="${index}">
            <img src="${video.thumbnail}" alt="${video.title}" class="thumbnail">
            <span>${video.title}</span>
        </li>
    `).join('');
}

videoList.addEventListener('click', (event) => {
    const listItem = event.target.closest('li');
    if (listItem) {
        currentVideoIndex = parseInt(listItem.getAttribute('data-index'));
        loadVideo(currentVideoIndex);
    }
});

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    filterVideos(searchTerm);
});

function filterVideos(searchTerm) {
    const listItems = videoList.querySelectorAll('li');
    listItems.forEach((item, index) => {
        const videoTitle = videos[index].title.toLowerCase();
        item.classList.toggle('hidden', !videoTitle.includes(searchTerm));
    });
}

function fetchYouTubeMetrics(videoId) {
    const API_KEY = 'AIzaSyAPGqjX-uz4xEs9DAcPnVGd0Sf4JSyDQ0o'; // Replace with your YouTube API key
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=statistics&key=${API_KEY}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const stats = data.items[0].statistics;
            viewsCount.textContent = stats.viewCount;
            likesCount.textContent = stats.likeCount;
            commentsCount.textContent = stats.commentCount;
        })
        .catch(error => console.error('Error fetching YouTube metrics:', error));
}

renderVideoList();
loadVideo(currentVideoIndex);
