import React, { useContext } from 'react';
import "./home.css";

import TopBar from '../../components/topBar/TopBar';
import SideBar from '../../components/sideBar/SideBar';
import Feed from '../../components/feed/Feed';
import RightBar from '../../components/rightBar/RightBar';
import ProfileSide from '../../components/profileSide/ProfileSide';
import { AuthContext } from '../../context/AuthContext';

const Home = () => {
  const {user} = useContext(AuthContext);
  return (
    <div className="home">
      <TopBar></TopBar>
      <div className="homeCon">
        {/* <SideBar></SideBar> */}
        <ProfileSide user={user}></ProfileSide>
        <Feed></Feed>
        <RightBar></RightBar>
      </div>
    </div>
  )
}

export default Home;