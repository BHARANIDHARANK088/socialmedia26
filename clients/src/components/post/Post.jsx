import React, {useState, useEffect, useContext} from 'react';
import "./post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';

// 31
import { format } from "timeago.js";
import { Link } from "react-router-dom";

// 27
import { getSingleUserId } from '../../apiRequest/userRequest';

// 66
import { likePost } from '../../apiRequest/postRequest';
import { AuthContext } from '../../context/AuthContext';

const Post = ({post}) => {
  // 5
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  // post.like to post.likes.length
  // console.log(post);
  const [like,setLike] = useState(post.likes.length);
  const [isLiked,setIsLiked] = useState(false);

  // 28
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getSingleUserId(post.userId);
      // console.log(response);
      setUser(response.data);
    }
    fetchUser();
  }, [post.userId])

  // 67
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);


  const likeHandler = async () => {
    // 68
    try {
      await likePost(post._id, currentUser._id);
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked);
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
            <div className="postTopLeft">
                {/* 33 Link to profile page on clicking the image */}
                {/* 29 profilepicture and username from user */}
                {/* 6 */}
                <Link to={"/profile/" + user.username}>
                   <img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "person/noAvatar.png"} alt="" className="postProfileImg" />
                </Link>
                <span className="postUsername">{user.username}</span>
                {/* 32 */}
                <span className="postDate">{format(post.createdAt)}</span>
            </div>
            <div className="postTopRight">
                <MoreVertIcon></MoreVertIcon>
            </div>
        </div>
        <div className="postCenter">
           <span className="postText">{post?.desc}</span>
           {/* 7 */}
           <img className="postImg" src={serverPublic + post?.img} alt="" />
        </div>
        <div className="postBottom">
           <div className="postBottonLeft">
              {/* 15 */}
              <img className="likeIcon" src={serverPublic + "like.png"} alt="" onClick={likeHandler}/>
              <img className="likeIcon" src={serverPublic + "heart.png"} alt="" onClick={likeHandler}/>
              <span className="postLikeCounter">{like} people like it</span>
           </div>
           <div className="postBottomRight">
              <span className="postCommentText">{post.comment} comments</span>
           </div>
        </div>
      </div>
    </div>
  )
}

export default Post