import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBLCGxMnraxFHb33OYl3EQXkWiCes_9FFU",
  authDomain: "byk3dimpresiones-746d4.firebaseapp.com",
  projectId: "byk3dimpresiones-746d4",
  storageBucket: "byk3dimpresiones-746d4.firebasestorage.app",
  messagingSenderId: "948064780109",
  appId: "1:948064780109:web:b66dcba2371c9b17180104"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
