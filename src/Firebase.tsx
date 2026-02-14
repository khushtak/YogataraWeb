import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDl4Z771BX9_HtgTkYXsLw-OAbfoLbgeRI",
  authDomain: "yogatara-5ef97.firebaseapp.com",
  projectId: "yogatara-5ef97",
  storageBucket: "yogatara-5ef97.firebasestorage.app",
  messagingSenderId: "664635484008",
  appId: "1:664635484008:web:dc19fc6547f75360fdd8dd",
  measurementId: "G-QCWJ66JZXB",
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// 🔑 VAPID KEY (तुम्हारा)
export const getFCMToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey:
        "BDB47DYlphAESaVo4jpIMUvLVng7F_j0RVlr-lADjKMvoLGQMDh7aDFityBWeo5vDgV8yMzqtzDtZzupBOqnqFk",
    });
    return token;
  } catch (err) {
    console.log("Error getting token", err);
  }
};

// 🔔 Foreground notification
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
