// 26
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api"});

export const getSingleUserId = (userId) => API.get("/users?userId=" + userId);

// 39
export const getSingleUserName = (username) => API.get("/users?username=" + username);

// 55
export const logIn = (userCredentials) => API.post("/auth/login", userCredentials);
export const getAllUsers = () => API.get("/users/all");
export const getPartialUsers = (searchQuery) => API.get("/users/partial/" + searchQuery);

// 61
export const registerUser = (user) => API.post("/auth/register", user);
export const updateUser = (userId, user) => API.put("/users/" + userId, user);

// 80
export const getFriends = (userId) => API.get("/users/friends/" + userId); 

// 87
export const unFollowUser = (id, userId) => API.put("/users/" + id + "/unfollow", { userId });

export const followUser = (id, userId) => API.put("/users/" + id + "/follow", { userId });

// 132
export const getConvos = (id) => API.get("/conversations/" + id);
export const getSingleConvo = (firstUserId, secondUserId) => API.get("/conversations/find/" + firstUserId + "/" + secondUserId);

// 139
export const getMessages = (conversationId) => API.get("/messages/" + conversationId);

// 145
export const createMessage = (message) =>  API.post("/messages", message);

