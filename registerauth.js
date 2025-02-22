// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCx4hT5wDJ3_tJVTC2vnNgP5rLmNLAw1Yc",
    authDomain: "expense-641ff.firebaseapp.com",
    projectId: "expense-641ff",
    storageBucket: "expense-641ff.appspot.com",
    messagingSenderId: "402746622874",
    appId: "1:402746622874:web:cc8d4da09de0c199747023"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
    const register = document.getElementById('submit');
    if (register) {
        register.addEventListener('click', (event) => {
            event.preventDefault();

            const email = document.getElementById('rEmail').value;
            const password = document.getElementById('rPassword').value;
            const confirmPassword = document.getElementById('rConfirmPassword').value;
            const phonenumber = document.getElementById('phone').value;

            // Check if passwords match
            if (password !== confirmPassword) {
                showMessage('Passwords do not match!', 'signUpMessage');
                return;
            }
            

            // Create user with Firebase Authentication
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("User  registered:", user);

                    const userData = {
                        email: email,
                        phonenumber: phonenumber,
                    };
                    console.log("User  data to be saved:", userData);

                    // Store user data in Firestore
                    const docRef = doc(db, "users", user.uid);
                    return setDoc(docRef, userData);
                })
                .then(() => {
                    showMessage('Account Created Successfully', 'signUpMessage');
                    // Redirect to login page after successful registration
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 2000); // Redirect after 2 seconds
                })
                .catch((error) => {
                    const errorCode = error.code;
                    console.error("Error:", error);
                    if (errorCode === 'auth/email-already-in-use') {
                        showMessage('Email Address Already Exists!', 'signUpMessage');
                    } else {
                        showMessage('Unable to create User: ' + error.message, 'signUpMessage');
                    }
                });
        });
    } else {
        console.error("Register button not found");
    }
});