// 92
import React, { useContext, useEffect, useState, useRef } from 'react';
import "./messenger.css";
import TopBar from '../../components/topBar/TopBar';
import InputEmoji from "react-input-emoji";

// 102
import Conversation from '../../components/conversation/Conversation';

// 108
import Message from '../../components/message/Message';

// 114
import ChatOnline from '../../components/chatOnline/ChatOnline';

import { AuthContext } from '../../context/AuthContext';
import { createMessage, getConvos, getMessages } from '../../apiRequest/userRequest';
import { io } from "socket.io-client";

const Messenger = () => {
  // 133
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef();
  const socket = useRef();

  // 153
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    // 161 getting message from socket
    socket.current.on("getMessage", (data) => {
        setArrivalMessage({
            sender: data.senderId,
            text: data.text,
            createdAt: Date.now()
        })
    })
  },[])  

  // 162
  useEffect(() => {
     arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && 
     setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat])  


  // 154
  useEffect(() => {
    // sending user Id to socket
    socket.current.emit("addUser", user._id);
    // 157 getting online users from socket
    socket.current.on("getUsers", (users) => {
        setOnlineUsers(
            user.followings.filter((f) => users.some((u) => u.userId === f))
        );
    })
  }, [user])  
  
  console.log(socket);

  // 133  
  useEffect(() => {
    const getConversations = async () => {
        try {
          const response = await getConvos(user._id);
          setConversations(response.data);   
        } catch (error) {
          console.log(error);  
        }
    }
    getConversations();
  }, [user._id]);

  // 140
  useEffect(() => {
    const getUserMessages = async () => {
        try {
           const response = await getMessages(currentChat?._id);
           setMessages(response.data);   
        } catch (error) {
           console.log(error);
        }
    }
    getUserMessages();
  }, [currentChat]);  

  // 146
  const handleSubmit = async (event) => {
    event.preventDefault();

    const message = {
        sender: user._id,
        text: newMessage,
        conversationId: currentChat._id
    }

    // 160
    const receiverId = currentChat.members.find((member) => member !== user._id);
    socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId: receiverId,
        text: newMessage
    })
    //

    try {
       const response = await createMessage(message);
       setNewMessage("");
       setMessages([...messages, response.data]);
    } catch (error) {
        console.log(error);
    }
  }  

  // 147
  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior : "smooth"})
  }, [messages]);  

 
  const [searchQuery, setSearchQuery] = useState("");
  return (
    // 95
    <>
     <TopBar></TopBar>
     <div className="messenger">
        {/* Messenger */}

        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" value={searchQuery} 
            onChange={(event) => setSearchQuery(event.target.value)}/>
            {/* <Conversation></Conversation>
            <Conversation></Conversation>
            <Conversation></Conversation>
            <Conversation></Conversation> */}

            {/* 134 mapping with sending conversation and currentUser as props, also setting currentChat on clicking any conversation*/}
            {conversations.map((c) => (
                <div onClick={() => setCurrentChat(c)}>
                  <Conversation conversation={c} currentUser={user}></Conversation>
                </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {/* 138 currentChat */}
            {currentChat ? (
             <>
              <div className="chatBoxTop">
                {/* <Message></Message>
                <Message own={true}></Message>
                <Message></Message> */}

                {/* 141 messages with div and ref*/}
                {messages.map((m) => (
                    <div ref={scrollRef}>
                    <Message message={m} own={m.sender === user._id} currentUser={user}></Message>
                    </div>
                ))}
              </div>
              <div className="chatBoxBottom">
                {/* 144 onChange and onClick*/}
                <InputEmoji
                  className="chatMessageInput"
                  placeholder="write something..."
                  value={newMessage}
                  onChange={(value) => setNewMessage(value)}
                ></InputEmoji>
                <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
              </div>
             </>
             ) :
             (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
             )
            }
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            {/* 163 online users */}
            <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat}></ChatOnline>
          </div>
        </div>
     </div>
    </>
  )
}

export default Messenger