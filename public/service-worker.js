// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyCZUgqTCe5lUGIp7nFkQ2qBbz6mU-sbUVk',
  authDomain: 'streakup.firebaseapp.com',
  projectId: 'streakup',
  storageBucket: 'streakup.appspot.com',
  messagingSenderId: '775496954037',
  appId: '1:775496954037:web:f688dd361efa2896294efc',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();