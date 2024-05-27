import React, { useContext, useEffect, useState } from 'react'
import "./profileCard.css";
import { getUserPosts } from '../../apiRequest/postRequest';


const ProfileCard = ({user}) => {
  // 111
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  // console.log(user);
  let followersCount;
  let followingsCount;
  if ( user )
  {
    followersCount = user.followers.length;
    followingsCount = user.followings.length;
  }
  const [postsCount, setPostsCount] = useState();
  useEffect(() => {
    const getUserPost = async () => {
        const {data} = await getUserPosts(user.username);
        setPostsCount(data.length);
    }
    getUserPost();
  }, [user, postsCount]);

  return (
    <div className="profileCard">
       <div className="profileImages">
          <img src={user.coverPicture ? serverPublic + user.coverPicture : serverPublic + "person/noCover.png"} alt="" />
          <img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "person/noAvatar.png"} alt="" />
       </div>

       <div className="profileName">
          <span>{user.username}</span>
          <span>{user.worksAt ? user.worksAt : "Write about yourself"}</span>
       </div>

       <div className="followStatus">
          <hr/>
          <div>
            <div className="follow">
              <span>{followersCount}</span>
              <span>Followers</span>
            </div>
            <div className="vl"></div>
            <div className="follow">
              <span>{postsCount}</span>
              <span>Posts</span>
            </div>
            <div className="vl"></div>
            <div className="follow">
              <span>{followingsCount}</span>
              <span>Followings</span>
            </div>
          </div>
          <hr/>
       </div>
    </div>
  )
}

export default ProfileCard;