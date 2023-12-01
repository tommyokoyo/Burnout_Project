// main.js

function handleLogin() {
    const loginForm = document.querySelector('.login-form form');
    const loadingButton = document.querySelector('.login-form .btn');

    return async () => {
        const email = loginForm.querySelector('input[name="email"]').value;
        const password = loginForm.querySelector('input[name="password"]').value;

        // Disable the login button during the fetch request
        loadingButton.disabled = true;

        try {
            const response = await fetch('http://192.168.184.129:5001/api/v1/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                // Extract the json response
                const response_body = await response.json()
                // extracts the session cookie and save in the local storage
                const session_token = response_body['session-token']
                if (session_token) {
                    console.log(session_token)
                    sessionStorage.setItem('auth_token', session_token)
                }
                alert(response_body['OK'])
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);

                window.location.href = 'dashboard.html';
            } else {
                // Handle unsuccessful login
                console.log(response)
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        } finally {
            // Re-enable the login button after the fetch request completes
            loadingButton.disabled = false;
        }
    };
}

function handleSignup() {
    const signup = document.querySelector('.signup-form form');

    return async () => {
        const firstname = signup.querySelector('input[name="firstname"]').value;
        const lastname = signup.querySelector('input[name="lastname"]').value;
        const email = signup.querySelector('input[name="email"]').value;
        const password = signup.querySelector('input[name="password"]').value;

        try {
            const response = await fetch('http://192.168.184.129:5001/api/v1/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstname, lastname, email, password })
            });

            if (response.ok) {
                // Extract the json response
                const response_body = await response.json()
                console.log(response_body)

                alert(response_body['status'])

                window.location.href = 'login.html';

            } else {
                // Handle unsuccessful login
                const response_body = await response.json()
                alert(response_body['error'])
                console.log('error')
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form form');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Call the login function when the form is submitted
        const loginFunction = handleLogin();
        loginFunction();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('.signup-form form');
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Call the login function when the form is submitted
        const signupFunction = handleSignup();
        signupFunction();
    });
});
