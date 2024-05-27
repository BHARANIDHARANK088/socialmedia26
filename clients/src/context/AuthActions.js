// 51
export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
});
  
export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});
  
export const LoginFailure = () => ({
    type: "LOGIN_FAILURE",
});
  
export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
});
  
export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
});

export const updateStart = (userCredentials) => ({
    type: "UPDATE_START",
});
  
export const updateSuccess = (user) => ({
    type: "UPDATE_SUCCESS",
    payload: user,
});
  
export const updateFailure = () => ({
    type: "UPDATE_ FAILURE",
});

export const logOut = () => ({
    type: "LOG_OUT",
});