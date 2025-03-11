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

// Verify the email on page load
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const oobCode = urlParams.get('oobCode'); // Get the verification code from the URL

    if (oobCode) {
        // Apply the email verification code
        applyActionCode(auth, oobCode)
            .then(() => {
                // Email verified successfully
                document.body.innerHTML = "<h1>Email Verified Successfully!</h1>";
            })
            .catch((error) => {
                // Handle errors
                console.error("Error verifying email:", error);
                document.body.innerHTML = `<h1>Verification Failed: ${error.message}</h1>`;
            });
    } else {
        document.body.innerHTML = "<h1>No verification code found in the URL.</h1>";
    }
};
