import React from 'react'
import "./profileSide.css";

import ProfileCard from '../profileCard/ProfileCard';
import FollowersCard from '../followersCard/FollowersCard';

const ProfileSide = ({user}) => {
  console.log("User", user);
  return (
    <div className="profileSide">
         <ProfileCard user={user}></ProfileCard>
         <FollowersCard></FollowersCard>
    </div>
  )
}

export default ProfileSide;