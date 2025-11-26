// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    // Login form handling
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const loginAlert = document.getElementById('login-alert');
            
            // Simple validation
            if (!email || !password) {
                showAlert(loginAlert, 'Please fill in all fields', 'danger');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert(loginAlert, 'Please enter a valid email address', 'danger');
                return;
            }
            
            // Simulate login process
            showAlert(loginAlert, 'Logging in...', 'success');
            setTimeout(() => {
                // In a real application, you would make an API call here
                // For demo purposes, we'll simulate a successful login
                showAlert(loginAlert, 'Login successful! Redirecting...', 'success');
                // Redirect to dashboard after successful login
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            }, 1000);
        });
    }

    // Signup form handling
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const firstName = document.getElementById('signup-firstname').value;
            const lastName = document.getElementById('signup-lastname').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;
            const team = document.getElementById('signup-team').value;
            const role = document.getElementById('signup-role').value;
            const agreeTerms = document.getElementById('agree-terms').checked;
            const signupAlert = document.getElementById('signup-alert');
            
            // Validation
            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                showAlert(signupAlert, 'Please fill in all required fields', 'danger');
                return;
            }
            
            if (password !== confirmPassword) {
                showAlert(signupAlert, 'Passwords do not match', 'danger');
                return;
            }
            
            if (password.length < 8) {
                showAlert(signupAlert, 'Password must be at least 8 characters', 'danger');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert(signupAlert, 'Please enter a valid email address', 'danger');
                return;
            }
            
            if (!agreeTerms) {
                showAlert(signupAlert, 'Please agree to the terms and conditions', 'danger');
                return;
            }
            
            // Simulate signup process
            showAlert(signupAlert, 'Creating your account...', 'success');
            setTimeout(() => {
                // In a real application, you would make an API call here
                showAlert(signupAlert, 'Account created successfully! Redirecting to login...', 'success');
                // Redirect to login after successful signup
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            }, 1000);
        });

        // Password strength indicator
        const passwordInput = document.getElementById('signup-password');
        if (passwordInput) {
            passwordInput.addEventListener('input', function() {
                const password = this.value;
                const strengthBar = document.getElementById('password-strength-bar');
                const lengthReq = document.getElementById('length-req');
                const uppercaseReq = document.getElementById('uppercase-req');
                const numberReq = document.getElementById('number-req');
                
                let strength = 0;
                
                // Check length
                if (password.length >= 8) {
                    strength += 1;
                    lengthReq.classList.add('met');
                } else {
                    lengthReq.classList.remove('met');
                }
                
                // Check uppercase
                if (/[A-Z]/.test(password)) {
                    strength += 1;
                    uppercaseReq.classList.add('met');
                } else {
                    uppercaseReq.classList.remove('met');
                }
                
                // Check numbers
                if (/[0-9]/.test(password)) {
                    strength += 1;
                    numberReq.classList.add('met');
                } else {
                    numberReq.classList.remove('met');
                }
                
                // Update strength bar
                strengthBar.className = 'password-strength-bar';
                if (strength === 1) {
                    strengthBar.classList.add('strength-weak');
                } else if (strength === 2) {
                    strengthBar.classList.add('strength-medium');
                } else if (strength === 3) {
                    strengthBar.classList.add('strength-strong');
                }
            });
        }
    }

    // Forgot password functionality
    const forgotPasswordLink = document.getElementById('forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = prompt('Please enter your email address:');
            if (email) {
                // In a real application, you would send a reset password email
                alert(`Password reset instructions have been sent to ${email}`);
            }
        });
    }

    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.textContent.trim();
            alert(`In a real application, this would redirect to ${platform} authentication`);
        });
    });
});

function showAlert(alertElement, message, type) {
    alertElement.textContent = message;
    alertElement.className = `alert alert-${type}`;
    alertElement.style.display = 'block';
}