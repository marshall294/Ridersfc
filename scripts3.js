// scripts3.js

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';
import { getStorage, ref as storageRef, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBh4MhRuHWDUa8343DR7LXKDAOjQQh-ZqE",
    authDomain: "match-fce0a.firebaseapp.com",
    databaseURL: "https://match-fce0a-default-rtdb.firebaseio.com",
    projectId: "match-fce0a",
    storageBucket: "match-fce0a.appspot.com",
    messagingSenderId: "805294870836",
    appId: "1:805294870836:web:67ca4195273cd4c58b9561",
    measurementId: "G-8NL16FSZ0C"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

function displayMedia() {
    const mediaList = document.getElementById('media-list');
    const highlightsRef = ref(database, 'highlights');

    onValue(highlightsRef, (snapshot) => {
        mediaList.innerHTML = ''; // Clear existing content

        snapshot.forEach((childSnapshot) => {
            const media = childSnapshot.val();
            const mediaElement = document.createElement('div');
            mediaElement.className = 'media-item';

            const mediaContent = media.type === 'image'
                ? `<img src="${media.url}" alt="${media.caption}" />`
                : `<video controls src="${media.url}"></video>`;

            mediaElement.innerHTML = `
                <div class="media-content">
                    ${mediaContent}
                </div>
                <div class="media-caption">
                    ${media.caption}
                </div>
            `;

            mediaList.appendChild(mediaElement);
        });
    });
}

// Call displayMedia when the page loads
displayMedia();
