// 111
import React, {useEffect, useState} from 'react';
import "./chatOnline.css";
import { getFriends, getSingleConvo } from '../../apiRequest/userRequest';

// 164 {onlineUsers, currentId, setCurrentChat as props}
const ChatOnline = ({onlineUsers, currentId, setCurrentChat}) => {
  // 165
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getUserFriends = async () => {
      const response = await getFriends(currentId);
      setFriends(response.data);
    }
    getUserFriends();
  }, [currentId, onlineUsers]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineFriends]);

  // 167
  const handleClick = async (user) => {
    try {
      const response = await getSingleConvo(currentId, user._id);
      setCurrentChat(response.data);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    // 112
    <div className="chatOnline">
       
       {/* <div className="chatOnlineFriend">
        <div className="chatOnlineImgCon">
            <img
              className="chatOnlineImg"
              src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
        </div>
        <div className="chatOnlineBadge">
        </div>
        <div className="chatOnlineName">
            John Depp
        </div>
       </div> */}

       {/* 166 */}
       Online Users
       {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgCon">
            <img
              className="chatOnlineImg"
              src={o?.profilePicture ? serverPublic + o.profilePicture : serverPublic + "person/noAvatar.png"}
              alt=""
            />
          </div>
          <div className="chatOnlineBadge">
          </div>
          <div className="chatOnlineName">
            {o?.username}
          </div>
       </div> 
       ))}
    </div>
  )
}

export default ChatOnline