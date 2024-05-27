import React from 'react';
import "./online.css";

const Online = ({user}) => {
  // 8
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        {/* 9 */}
        <img className="rightbarProfileImg" src={serverPublic + user.profilePicture} alt="" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  )
}

export default Online;