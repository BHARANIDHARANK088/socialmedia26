// 99
import React, { useEffect, useState } from 'react';
import "./conversation.css";
import { getSingleUserId } from '../../apiRequest/userRequest';

// 135 conversation, currentUser as props
const Conversation = ({conversation, currentUser}) => {
  // 136
  const [user, setUser] = useState(null);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const response = await getSingleUserId(friendId);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [currentUser, conversation]);

  return (
    // 100
    <div className="conversation">
      {/* Conversation */}
      {/* 137 setting user details - img and username */}
      <img
        className="conversationImg"
        src={user?.profilePicture ? serverPublic + user.profilePicture : serverPublic + "person/noAvatar.png"}
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  )
}

export default Conversation;