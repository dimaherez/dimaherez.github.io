// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, applyActionCode } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Your Firebase project configuration
const firebaseConfig = { 
    apiKey: "AIzaSyBkT883Ba8oTwkJUFm7mOzAffCtjzvzsYk", 
    authDomain: "leihoma-f42af.firebaseapp.com", 
    projectId: "leihoma-f42af", 
    storageBucket: "leihoma-f42af.firebasestorage.app", 
    messagingSenderId: "27604901484", 
    appId: "1:27604901484:android:21c5728647eca4ed50c249" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle email verification and password reset on page load
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode'); // Determine the mode of action
    const oobCode = urlParams.get('oobCode'); // Get the action code from the URL

    if (oobCode && mode) {
        if (mode === 'verifyEmail') {
            // Email verification flow
            applyActionCode(auth, oobCode)
                .then(() => {
                    document.body.innerHTML = "<h1>Email Verified Successfully!</h1><a href=\"https:\\\\leihoma.app\">link text</a>";
                })
                .catch((error) => {
                    console.error("Error verifying email:", error);
                    document.body.innerHTML = `<h1>Verification Failed: ${error.message}</h1>`;
                });
        } else if (mode === 'resetPassword') {
            // Password reset flow
            const newPassword = prompt("Enter your new password:");

            if (newPassword) {
                confirmPasswordReset(auth, oobCode, newPassword)
                    .then(() => {
                        document.body.innerHTML = "<h1>Password Reset Successfully!</h1><a href=\"https:\\\\leihoma.app\">Go to Login</a>";
                    })
                    .catch((error) => {
                        console.error("Error resetting password:", error);
                        document.body.innerHTML = `<h1>Password Reset Failed: ${error.message}</h1>`;
                    });
            } else {
                document.body.innerHTML = "<h1>Password reset cancelled. No password provided.</h1>";
            }
        } else {
            document.body.innerHTML = "<h1>Invalid action mode.</h1>";
        }
    } else {
        document.body.innerHTML = "<h1>No action code or mode found in the URL.</h1>";
    }
};

