'use client'
import React, { Component } from "react";
import toast, { Toaster } from 'react-hot-toast';
// import { MessageList } from './chat/MessageList';
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount = () => {
    
    }
    notify = () => toast('Thank You! Location shared.');
    openChat = () => {
        window.location.href = "/chat";
    };

    render() {
        const { data } = this.props;
        return (
           <>
           {/* <MessageList /> */}
           </>
        );
    }
}

export default Chat;
