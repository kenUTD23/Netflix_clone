// Paths to MP4 Video
const LOCAL_VIDEO_PATHS = [
    'videos/superman_.mp4'
];

// Base URLs (for other functionality)
const TMDB_API_KEY = 'd2254f6bf30cf5f57cd8c6bccaf7465f';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// TMDb Endpoints
const NOWPLAYING_MOVIES_URL = `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}`;
const POPULAR_MOVIES_URL = `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`;
const TOP_RATED_URL = `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`;
const UPCOMING_URL = `${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}`;

// Set Banner Content
async function setBannerContent() {
    try {
        const response = await fetch(NOWPLAYING_MOVIES_URL);
        const data = await response.json();
        const movies = data.results;

        if (!movies || movies.length === 0) {
            console.error('No movies available for the banner.');
            return;
        }

        // Select the movie
        const videoPath = LOCAL_VIDEO_PATHS[Math.floor(Math.random() * LOCAL_VIDEO_PATHS.length)]; // Select random local video

         // Static title and description
         const staticTitle = "Superman 2025";
         const staticDescription = "The 2025 Superman movie follows Clark Kent as he balances his dual life as a journalist and superhero, grappling with his Kryptonian heritage while protecting a world that questions his values.";
           

        // Update the banner
        const banner = document.querySelector('.banner');
        banner.innerHTML = `
            <video
                class="banner-video"
                autoplay
                muted
                loop
                playsinline
            >
                <source src="${videoPath}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div class="banner-content">
                <p class="special">NOW PLAYING</p>
                <h1 class="banner-title">${staticTitle}</h1>
                <p class="banner-subtitle">${staticDescription || 'No description available.'}</p>
                <div class="banner-buttons">
                    <button class="play-btn">▶ Play</button>
                    <button class="info-btn">ℹ More Info</button>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error setting banner content:', error);
    }
}

// Fetch and Display Movies for Rows
async function fetchAndDisplayMovies(url, containerSelector) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const movies = data.results;

        if (!movies || movies.length === 0) {
            console.error('No movies returned from API:', url);
            return;
        }

        const container = document.querySelector(containerSelector);
        container.innerHTML = ''; // Clear existing content

        movies.forEach(movie => {
            const posterPath = movie.poster_path
                ? `${IMAGE_BASE_URL}${movie.poster_path}`
                : 'placeholder.jpg'; // Handle missing posters
            const movieElement = `
                <div class="thumbnail">
                    <img src="${posterPath}" alt="${movie.title}">
                </div>
            `;
            container.innerHTML += movieElement;
        });
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// Horizontal Scrolling for Movie Rows
document.querySelectorAll('.movie-row').forEach(row => {
    const container = row.querySelector('.thumbnails');
    const leftBtn = row.querySelector('.scroll-btn.left');
    const rightBtn = row.querySelector('.scroll-btn.right');

    leftBtn.addEventListener('click', () => {
        container.scrollBy({ left: -300, behavior: 'smooth' }); // Scroll left
    });

    rightBtn.addEventListener('click', () => {
        container.scrollBy({ left: 300, behavior: 'smooth' }); // Scroll right
    });
});

// Initialize the App
async function initialize() {
    await setBannerContent(); // Set the banner content with a local MP4 video
    fetchAndDisplayMovies(NOWPLAYING_MOVIES_URL, '#now-playing .thumbnails');
    fetchAndDisplayMovies(POPULAR_MOVIES_URL, '#popular .thumbnails');
    fetchAndDisplayMovies(UPCOMING_URL, '#upcoming .thumbnails');
    fetchAndDisplayMovies(TOP_RATED_URL, '#top-rated .thumbnails');
}

initialize();
