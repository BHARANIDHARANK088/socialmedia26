import React, { useState, useEffect } from 'react';
import "./profile.css";
import TopBar from '../../components/topBar/TopBar';
import SideBar from '../../components/sideBar/SideBar';
import RightBar from '../../components/rightBar/RightBar';
import Feed from '../../components/feed/Feed';

// 40
import { useParams } from "react-router";
import { getSingleUserName } from '../../apiRequest/userRequest';

const Profile = () => {
  // 10
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  // 41
  const username = useParams().username;
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const response = await getSingleUserName(username);
      setUser(response.data);
    }
    fetchUser();
  }, [username])
  
  return (
    <>
      <TopBar></TopBar>
      <div className="profile">
         <SideBar></SideBar>
         <div className="profileRight">
            <div className="profileRightTop">
               <div className="profileCover">
                 <img
                   className="profileCoverImg"
                  //  46 users
                   //  11
                   src={ user.coverPicture ? serverPublic + user.coverPicture : serverPublic + "person/noCover.png"}
                   alt=""
                 />
                 <img
                   className="profileUserImg"
                   //  12
                   src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "person/noAvatar.png"}
                   alt=""
                 />
               </div>
               <div className="profileInfo">
                  {/* 42 username in profile page */}
                  <h4 className="profileInfoName">{user.username}</h4>
                  <span className="profileInfoDesc">{user.desc}</span>
               </div>
            </div>
            <div className="profileRightBottom">
              {/* 34 adding username to Feed to work in profile paeg */}
              <Feed username={username}></Feed>
              {/* 42 if we have user means, we are at another user's profile page */}
              {/* <RightBar profile></RightBar> */}
              <RightBar user={user}></RightBar>
            </div>
         </div>
      </div>
    </>
  )
}

export default Profile