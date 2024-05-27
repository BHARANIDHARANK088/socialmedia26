import React from 'react';
import {Link} from "react-router-dom";

const User = ({person}) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="follower">
        <div>
            <img src={person.profilePicture ? serverPublic + person.profilePicture : serverPublic + "person/noAvatar.png"} alt="" className="followerImg"/>
            <div className="name">
              <span>{person.username}</span>
            </div>
        </div>
        <Link to={"/profile/" + person.username} style={{textDecoration: "none"}}>
          <button className='fcButton'>Visit profile</button>
        </Link>
    </div>
  )
}

export default User;