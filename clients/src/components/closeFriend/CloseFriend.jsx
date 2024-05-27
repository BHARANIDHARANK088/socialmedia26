import React from 'react';
import "./closeFriend.css";

const CloseFriend = ({user}) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={serverPublic + user.profilePicture} alt="" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  )
}

export default CloseFriend