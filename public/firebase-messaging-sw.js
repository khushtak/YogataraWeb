importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDl4Z771BX9_HtgTkYXsLw-OAbfoLbgeRI",
  authDomain: "yogatara-5ef97.firebaseapp.com",
  projectId: "yogatara-5ef97",
  storageBucket: "yogatara-5ef97.appspot.com",
  messagingSenderId: "664635484008",
  appId: "1:664635484008:web:dc19fc6547f75360fdd8dd",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
      icon: "/logo.png",
    }
  );
});
