// 30
import React, { useContext, useEffect, useState } from 'react';
import "./rightBar.css";

import Online from '../online/Online';
import { Users } from '../../dummyData';
import ChatIcon from '@mui/icons-material/Chat';

// 81
import { getFriends } from '../../apiRequest/userRequest';
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

// ///////////////
import EditIcon from '@mui/icons-material/Edit';
import ProfileModal from '../profileModal/ProfileModal';

// 88
import { followUser, unFollowUser } from '../../apiRequest/userRequest';

// 43 user as props
const RightBar = ({user}) => {
  ////////
  const [modalOpened, setModalOpened] = useState(false); 

  // 13
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  // 82
  const [friends, setFriends] = useState([]);
  // console.log(friends);

  // 85
  const { user: currentUser, dispatch} = useContext(AuthContext);

  useEffect(() => {
    const getUserFriends = async () => {
      try {
        const friendList = await getFriends(user._id);
        setFriends(friendList.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUserFriends();
  }, [user])

  // 89
  const handleClick = async () => {
    try {
      if ( currentUser.followings.includes(user?._id) )
      {
        await unFollowUser(user._id, currentUser._id);
        dispatch({ type: "UNFOLLOW", payload: user._id });
      }
      else
      {
        await followUser(user._id, currentUser._id);
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src="assets/gift.png" alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
            {Users.map((u) => (
              <Online key={u.id} user={u}></Online>
            ))}
        </ul>
      </>
    )
  }

  const ProfileRightBar = () => {
    return (
      <>
         {/* 86 */}
         {user.username !== currentUser.username && (
           <div style={{display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
             <button className="rightbarFollowButton"  onClick={handleClick}>
               {currentUser.followings.includes(user?._id) ? "Unfollow" : "Follow"}
             </button>
             <Link to="/messenger">
               <ChatIcon style={{marginLeft: "5px", marginTop: "15px", color: "#1872f2"}}></ChatIcon>
             </Link>
           </div>
         )}
         {/* ///////////////// */}
         {user.username === currentUser.username ? (
          <div>
             <EditIcon onClick={() => setModalOpened(true)}></EditIcon>
             <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} data={user}></ProfileModal>
          </div>
         ) : ""}

         <h4 className="rightbarTitle">User information</h4>
         <div className="rightbarInfo">
           <div className="rightbarInfoItem">
             <span className="rightbarInfoKey">City:</span>
             {/* 45 */}
             <span className="rightbarInfoValue">{user.livesIn}</span>
           </div>
           <div className="rightbarInfoItem">
             <span className="rightbarInfoKey">From:</span>
             <span className="rightbarInfoValue">{user.country}</span>
           </div>
           <div className="rightbarInfoItem">
             <span className="rightbarInfoKey">Works:</span>
             <span className="rightbarInfoValue">{user.worksAt}</span>
           </div>
           <div className="rightbarInfoItem">
             <span className="rightbarInfoKey">Relationship:</span>
             <span className="rightbarInfoValue">
               {user.relationship}
             </span>
           </div>
         </div>

         <h4 className="rightbarTitle">User friends</h4>
         <div className="rightbarFollowings">
           {/* <div className="rightbarFollowing">
            <img
              // 14
              src={serverPublic + "person/1.jpeg"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
           </div> */}


           {/* 83 */}
           {friends.map((friend) => (
              <Link to={"/profile/" + friend.username} style={{ textDecoration: "none" }}>
              <div className="rightbarFollowing">
                <img
                  src={friend?.ProfilePicture ? serverPublic + friend.ProfilePicture : serverPublic + "person/noAvatar.png"}
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName" style={{marginTop: "10px", textAlign: "center", color: "black"}}>{friend?.username}</span>
              </div>
              </Link>
           ))}
         </div>
      </>
    )
  }
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {/* 44 user */}
        {user ? <ProfileRightBar></ProfileRightBar> : <HomeRightBar></HomeRightBar>}
      </div> 
    </div>
  )
}

export default RightBar