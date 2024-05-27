import React, { useContext, useEffect, useState } from 'react';
import "./topBar.css";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom"; 
import { AuthContext } from '../../context/AuthContext';

import { logOut } from '../../apiCalls';
import { getPartialUsers } from '../../apiRequest/userRequest';

const TopBar = () => {
  // 63
  const {user: currentUser, dispatch} = useContext(AuthContext);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleLogout = () => {
    logOut(dispatch);
  }

  const [searchQuery, setSearchQuery] = useState(null);
  const [users, setUsers] = useState([]);
  console.log("Search ", searchQuery);

  useEffect(() => {
    if ( searchQuery !== null )
    {
      const getUsers = async () => {
        try {
          const response = await getPartialUsers(searchQuery);
          setUsers(response.data);
        } catch (error) {
          console.log(error);
        }
      } 
      getUsers();
    }
  }, [searchQuery]);

  console.log(users);

  return (
    <div className="topBar">
      <div className="topBarLeft">
        {/* 16 */}
        <Link to="/" style={{textDecoration: "none"}}>
          <span className="logo">CW Social</span>
        </Link>
      </div>
      <div className="topBarCenter">
        <div className="searchBar">
            <SearchIcon className="searchIcon"></SearchIcon>
            <input placeholder="Search for friend, post or video" 
             className="searchInput" 
             value={searchQuery}
             onChange={(event) => setSearchQuery(event.target.value)} 
            />
        </div>
        <div className="searchUser">
          {searchQuery ? (
              <div className="users">
                  {users.map((user) => 
                  (  <Link to={"/profile/" + user.username} style={{textDecoration: "none"}}>
                      <div key={user._id} className="user">
                           <div className="userDetails">
                             <img src={user?.profilePicture ? serverPublic + user.profilePicture : serverPublic + "person/noAvatar.png"} alt="" className="userImg" />
                             <span className="userName">{user.username}</span>
                           </div>
                           <div className="mutualStatus">
                              {((currentUser._id === user._id) && <span className="userName">Visit your profile</span>)
                                                                  ||
                              (currentUser.followers.includes(user._id) && currentUser.followings.includes(user._id) && <span className="userName">Mutuals</span>)
                                                                  ||
                              (currentUser.followers.includes(user._id) && <span className="userName">Follows you</span>)
                                                                  ||
                              (currentUser.followings.includes(user._id) && <span className="userName">Following</span>)
                              }
                           </div>
                      </div>
                     </Link>
                  ))}
              </div>) :
              ("")
           }
        </div>
      </div>
      <div className="topBarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <PersonIcon />
            <span className="topbarIconBadge">1</span>
          </div>
          <Link to="/messenger" style={{color: "white"}}>
            <div className="topbarIconItem">
              <ChatIcon />
              <span className="topbarIconBadge">2</span>
            </div>
          </Link>
        </div>
        <Link to={"/profile/" + currentUser.username} style={{marginRight: "5px"}}>
         <img src={currentUser.profilePicture ? serverPublic + currentUser.profilePicture : serverPublic + "person/noAvatar.png"} alt="" className="topbarImg"/>
        </Link>
        <div className="topbarIconItem" onClick={handleLogout}>
          <LogoutIcon></LogoutIcon>
        </div>
      </div>
    </div>
  )
}

export default TopBar