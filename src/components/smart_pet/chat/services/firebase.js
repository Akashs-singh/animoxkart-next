
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, signInAnonymously } from "firebase/auth";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { getDatabase } from 'firebase/database';
// 🔥 Your Firebase Config (Replace with your actual config)
const firebaseConfig = {
    apiKey: "AIzaSyAQrvIusRkExduf3bXGZRePpHVIQ_WPiMU",
    authDomain: "animoxkart-7962f.firebaseapp.com",
    projectId: "animoxkart-7962f",
    storageBucket: "animoxkart-7962f.appspot.com",
    messagingSenderId: "218901776540",
    appId: "1:218901776540:web:6410f5c192b6b887020559"
  };
  


// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const messagesRef = collection(db, "messages");

export const database = getDatabase(app);

export { auth, signInWithGoogle, sendMessage,db, listenForMessages };


// signInAnonymously(auth)
//   .then(() => console.log("Signed in anonymously"))
//   .catch((error) => console.error("Anonymous sign-in failed:", error));
async function ensureAuth() {
    if (!auth.currentUser) {
      await signInAnonymously(auth);
      console.log("Anonymous user signed in");
    }
  }
// signOut(auth).then(() => {
//     console.log("User signed out, try logging in again.");
// });
// ✅ Google Sign-In
const provider = new GoogleAuthProvider();
const signInWithGoogle = () => signInWithPopup(auth, provider);

// ✅ Firestore Messages Collection

// ✅ Send a Message
// const sendMessage = async (text, user) => {
//   if (!text.trim()) return;
//   await addDoc(messagesRef, {
//     text,
//     createdAt: new Date(),
//     user
//   });
// };

// const sendMessage = async (text) => {
//     if (!text.trim()) return;
//     await addDoc(messagesRef, {
//       text,
//       createdAt: new Date()
//     });
//   };

const sendMessage = async (text) => {
    ensureAuth()
    if (!text || text.trim() === "") return;
    await addDoc(messagesRef, {
        text,
        createdAt: Date.now(),
        userId: auth.currentUser.uid || "guest"
    });
};

// ✅ Subscribe to Messages
const listenForMessages = (callback) => {
    const q = query(messagesRef, orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(messages);
    });
};

