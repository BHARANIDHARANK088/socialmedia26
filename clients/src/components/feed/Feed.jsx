import React, { useContext, useEffect, useState } from 'react';
import "./feed.css";

import Share from '../share/Share';
import Post from '../post/Post';

// 23
import { getTimeLinePosts } from '../../apiRequest/postRequest';
// 37
import { getUserPosts } from '../../apiRequest/postRequest';
import { AuthContext } from '../../context/AuthContext';

// 35 username as props
const Feed = ({username}) => {
  // 64
  const {user} = useContext(AuthContext);

  // 24
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      // const response = await getTimeLinePosts("64d71b1c9e1ae38d291a2536");
      // 38
      const response = username ? await getUserPosts(username) : await getTimeLinePosts(user._id);
      // console.log(response);
      setPosts(response.data.sort((p1, p2) => {
         return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
    }
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
         {/* 84 share component should not appear in others profile page */}
         {/* <Share></Share> */}
         {(!username || username === user.username) && <Share></Share>}
         {/* 25 change Posts from dummydata to posts*/}
         {!username || username !== user.username && <h3>{username} Posts</h3>}
         {posts.map((p) => (
          <Post key={p._id} post={p}></Post>
         ))}
      </div>
    </div>
  )
}

export default Feed