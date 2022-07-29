import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDo48q8MYJQg5QyO17lbMIUmdhevkSSBXA",
  authDomain: "linkpass-94c1f.firebaseapp.com",
  projectId: "linkpass-94c1f",
  storageBucket: "linkpass-94c1f.appspot.com",
  messagingSenderId: "145108759621",
  appId: "1:145108759621:web:b51907b04727bedeff1f2c",
  measurementId: "G-12LC2RW1B1"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);