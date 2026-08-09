
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, signInAnonymously } from "firebase/auth";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { getDatabase } from 'firebase/database';
// 🔥 Your Firebase Config (Replace with your actual config)
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
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

