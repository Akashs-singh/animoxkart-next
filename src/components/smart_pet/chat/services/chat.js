import { db } from "./firebase";
import { collection, addDoc, query, orderBy, onSnapshot, getDocs, doc, serverTimestamp } from "firebase/firestore";

export const ChatService = {
  /**
   * Fetch available chats
   */
  getChats: async () => {
    try {
      const chatCollectionRef = collection(db, "chats"); // Ensure this is correctly referenced
      const querySnapshot = await getDocs(chatCollectionRef);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching chats:", error);
      return [];
    }
  },

  /**
   * Create a new chat
   */
  createChat: async (tag_id) => {
    
    try {
      const chatCollectionRef = collection(db, "chats");
      const newChatRef = await addDoc(chatCollectionRef, {
        id: tag_id,
        createdAt: serverTimestamp(),
      });
      console.log("object3: "+ newChatRef);


      return { id: newChatRef.id, createdAt: new Date() };
    } catch (error) {
      console.error("Error creating chat:", error);
      return null;
    }
  },


  /**
   * Subscribe to messages of a chat
   * @param {string} chatId - The chat ID
   * @param {function} callback - Function to update messages state
   * @returns {function} Unsubscribe function
   */
  subscribeToMessages: (chatId, callback) => {
    if (!chatId) return () => {};

    const messagesRef = collection(db, `chats/${chatId}/messages`);
    const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));

    return onSnapshot(messagesQuery, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(messages);
    });
  },

  /**
   * Send a message
   * @param {string} chatId - The chat ID
   * @param {string} userId - Sender's user ID
   * @param {string} text - Message text
   */
  sendMessage: async (chatId, userId, text) => {
    try {
      if (!chatId || !userId || !text.trim()) {
        console.error("Missing parameters in sendMessage");
        return;
      }

      const chatDocRef = doc(db, "chats", chatId); // Correct reference
      const messagesRef = collection(chatDocRef, "messages");

      await addDoc(messagesRef, {
        userId,
        text,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  },
};
