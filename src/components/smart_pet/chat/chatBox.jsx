'use client'
import React, { useState, useEffect, useRef } from "react";
import { useChat } from './contexts/ChatContext';
import { getContactIdFromJWT } from '../../common/utils/index';
import "./ChatBox.css";

const ChatBox = ({ pet_name, onClose }) => {
    const [message, setMessage] = useState('');
    const { sendMessage, user, currentChat, messages, loading } = useChat();
    let user_id = "anonymous";
    const contact_id = getContactIdFromJWT();
    if (contact_id != null) {
        user_id = contact_id
    }
    const messagesEndRef = useRef(null); // Ref for scrolling

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);
    
    const handleSend = async () => {
        // if (!message.trim()) return;
        // if (!currentChat || currentChat ? !currentChat.id : false) {
        //     console.error("No current chat available.");
        //     return;
        // }

        // try {
        //     await sendMessage(currentChat.id, user_id, message);
        //     setMessage(''); // Clear input after sending
        // } catch (error) {
        //     console.error("Error sending message:", error);
        // }
        setMessage(prevMessage => {
            if (!prevMessage.trim()) return prevMessage;  // Ensure message isn't empty
    
            if (!currentChat || !currentChat.id) {
                console.error("No current chat available.");
                return prevMessage;
            }
    
            try {
                sendMessage(currentChat.id, user_id, prevMessage);
            } catch (error) {
                console.error("Error sending message:", error);
            }
    
            return ''; // Clear input after sending
        });
    };
    const handleLocationClick = () => { 
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    
                    // Set the message input value to the location URL
                    setMessage(locationUrl);
                    
                    // Automatically send the message
                    handleSend();
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    alert("Unable to retrieve location. Please enable location services.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };
    
    
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
        const today = new Date(); // Get current date
    
        // Extract date components
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const year = date.getFullYear();
    
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // Convert 24h to 12h format
    
        // Check if the date is today
        if (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        ) {
            return `${hours}:${minutes} ${ampm}`; // Return only time if today
        }
    
        return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
    }
    
    return (
        <div className="chatbox-container">
            <div className="chatbox-header">
                <div className="avatar">
                <img
                            src={`/assets/images/pets/smart-pet/dog.png`}
                            // src={data.image || "default-dog-image.jpg"} // Use data.image or fallback to a default image
                            alt={ "Pet"}
                            className="dog-image"
                        />
                </div>
                <div className="avatar-text">
                    <div className="avatar-header">
                        <h6 className="chatbox-name">{pet_name ? `${pet_name}'s Parent` : "Pet Parent"}</h6>
                        <p className="chatbox-status">Secure chat!</p>
                    </div>
                    <button onClick={onClose} className="chatbox-close btn">×</button>
                </div>
            </div>

            <div className="chatbox-messages">
                {/* {console.log(messages)} */}
                {loading ? (
                    <p>Loading messages...</p>
                ) : (
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`chatbox-message ${msg.userId === user_id ? "user" : "bot"}`}
                        >
                            {/* {msg.text} */}
                            {msg.text.includes("https://www.google.com/maps?q=") ? (
        <a 
            href={msg.text} 
            target="_blank" 
            rel="noopener noreferrer"
            className="location-link"
        >
            {msg.text}
        </a>
    ) : (
        <>{msg.text}</>
    )}
                            <span>{formatTimestamp(msg.timestamp)}</span>
                        </div>
                    ))
                )}
                  <div ref={messagesEndRef} />
            </div>
            <div className="chatbox-input">
                <button onClick={handleLocationClick} className="btn"><i className="fa-solid fa-location-dot"></i></button>
                <input
                    type="text"
                    className="chatbox-textinput"
                    placeholder="Type your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    className="chatbox-sendbutton"
                    onClick={handleSend}
                    disabled={!message.trim()}
                >
                    <img src={`/assets/images/icon/forward.png`} alt="submit" />
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
