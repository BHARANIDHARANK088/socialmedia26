// 22
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api"});

export const getTimeLinePosts = (userId) => API.get("/posts/timeline/" + userId);

// 36
export const getUserPosts = (username) => API.get("/posts/profile/" + username);

// 65
export const likePost = (postId, userId) => API.put("/posts/" + postId + "/like", userId);

// 72
export const createPost = (post) => API.post("/posts", post);
export const uploadImage = (data) => API.post("/upload", data);
export const getSinglePost = (id) => API.get("/posts/" + id);