const form = document.querySelector('.login-form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const errorMessage = document.querySelector('.error-message');
const errorPass = document.querySelector('.error-pass');

// 
form.addEventListener('submit', function (e) {
    e.preventDefault();
    validateinput();
    console.log('Form submitted!');
});

// USERS
const Users = {
    manuela : 'manuela123',
    santiago : 'santiago123',
    gian : 'gian123',
    kenneth : 'kenneth123',
    alejandro : 'alejandro123'
};

// form validation
function validateinput() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Reset error messages
    errorMessage.style.display = 'none';
    errorPass.style.display = 'none';

    // Validate credentials
    if (Users[username] && Users[username] === password) {
        window.location.href = 'HTML_files/profile.html'; // Redirect to profile page
    } else {
        // Show errors
        if (!Users[username]) {
            errorMessage.style.display = 'block'; // Username error
        } else {
            errorPass.style.display = 'block'; // Password error
        }
    }
}
