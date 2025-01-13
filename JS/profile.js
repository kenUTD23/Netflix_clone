// Getting all profile elements
const profiles = document.querySelectorAll('.profile');

// Add click event listener to each profile
profiles.forEach(profile => {
    profile.addEventListener('click', () => {
        // Optional: Save profile selection to localStorage (if needed)
        const selectedProfile = profile.dataset.profile;
        localStorage.setItem('selectedProfile', selectedProfile);

        // Redirect to movies page
        window.location.href = 'movies.html';
    });
});