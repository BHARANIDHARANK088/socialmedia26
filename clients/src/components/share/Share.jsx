import React, { useContext, useRef, useState } from 'react';
import "./share.css";

import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CancelIcon from '@mui/icons-material/Cancel';

import { AuthContext } from "../../context/AuthContext.js";
import { createPost, uploadImage } from '../../apiRequest/postRequest';
import { Link } from "react-router-dom";

const Share = () => {
  // 69
  const {user} = useContext(AuthContext);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  // 79
  const submitHandler = async (event) => {
    event.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value
    } 

    if ( file )
    {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      // console.log(newPost);
      try {
        await uploadImage(data);
      } catch (error) {
        console.log(error)
      }
    }
    try {
      await createPost(newPost);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          {/* 70 */}
          <Link to={"/profile/" + user.username}>
            <img className="shareProfileImg" src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "person/noAvatar.png"} alt="" />
          </Link>
          <input
            placeholder={"What's in your mind " + user.username + " ?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr"/>
        {/* 90 */}
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <CancelIcon className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
             <label htmlFor="file" className="shareOption">
                <PermMediaIcon htmlColor="tomato" className="shareIcon"/>
                <span className="shareOptionText">Photo or Video</span>
                {/* 71 */}
                <input style={{display: "none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])}/>
             </label>
            <div className="shareOption">
                <LabelIcon htmlColor="blue" className="shareIcon"/>
                <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
                <RoomIcon htmlColor="green" className="shareIcon"/>
                <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
                <EmojiEmotionsIcon htmlColor="goldenrod" className="shareIcon"/>
                <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">Share</button>
        </form>
      </div>
    </div>
  )
}

export default Share