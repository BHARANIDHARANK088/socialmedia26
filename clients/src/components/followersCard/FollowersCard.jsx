import React, { useContext, useEffect, useState } from 'react';
import "./followersCard.css";

import { getAllUsers } from "../../apiRequest/userRequest.js";
import { AuthContext } from '../../context/AuthContext';
import User from "../user/User.jsx";

const FollowersCard = ({location}) => {
  const {user} = useContext(AuthContext);
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const fetchPersons = async () => {
      const {data} = await getAllUsers();
      setPersons(data);
    };
    fetchPersons();
  }, []);

  return (
    <div className="followersCard">
      <h3>Newly joined Users</h3>
      {/* 172 Followers to persons */}
      {persons.map((person, id) => {
        if ( person._id !== user._id ) 
        {
          return (<User person={person}></User>)
        }
      })}
    </div>
  )
}

export default FollowersCard