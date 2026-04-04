"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { ChatService } from "../services/chat";
import { auth } from "../services/firebase";
import { signInAnonymously } from "firebase/auth";
import { getContactIdFromJWT, isLoggedin } from '../../../common/utils/index';
const ChatContext = createContext();

export function ChatProvider({ children, tag_id }) {
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const handleAuth = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (!user) {
          try {
            const { user: anonymousUser } = await signInAnonymously(auth);
            setUser(anonymousUser);
          } catch (error) {
            console.error("Anonymous sign-in failed:", error);
          }
        } else {
          setUser(user);
        }
      });
    };

    handleAuth();
  }, []);

  useEffect(() => {
    if (!user) return; // Wait for authentication

    async function fetchChats() {
      try {
        setLoading(true); // Start loading
        // let savedChatId = null;
        // const contact_id = getContactIdFromJWT();
        // if (contact_id == null) {
        //     savedChatId = localStorage.getItem("currentChatId");
        // }else{
        //     savedChatId = contact_id;
        // }
        
        const chats = await ChatService.getChats();

        let chatToSet;

        if (tag_id) {
          chatToSet = chats.find(chat => chat.id === tag_id);
        }

        if (!chatToSet) {
          chatToSet = await ChatService.createChat(tag_id);
        //   localStorage.setItem("currentChatId", chatToSet.id);
        }

        setCurrentChat(chatToSet);
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    }

    fetchChats();
  }, [user]); // Run after user is set

  useEffect(() => {
    let unsubscribe = () => {}; // Ensure a valid function to prevent errors

    if (currentChat ? currentChat.id : false) {
      unsubscribe = ChatService.subscribeToMessages(currentChat.id, setMessages);
    //   localStorage.setItem("currentChatId", currentChat.id);
    }

    return () => unsubscribe();
  }, [currentChat]);

  const value = React.useMemo(() => ({
    user,
    currentChat,
    messages,
    loading,
    sendMessage: ChatService.sendMessage,
  }), [user, currentChat, messages, loading]);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export const useChat = () => useContext(ChatContext);
