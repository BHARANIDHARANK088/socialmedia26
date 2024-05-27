// 56
import { logIn } from "./apiRequest/userRequest";
import { updateUser } from "./apiRequest/userRequest";

export const loginCall = async (userCredential, dispatch) => {
    dispatch({type: "LOGIN_START"});
    try {
        const response = await logIn(userCredential);
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
    } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error });
    }
}

export const updateUserCall = async (id, formData, dispatch) => {
    dispatch({type: "UPDATING_START"});
    try {
        const {data} = await updateUser(id, formData);
        dispatch({type: "UPDATING_SUCCESS", data: data});
    } catch (error) {
        dispatch({type: "UPDATING_FAIL"});
    }
}

export const logOut = async(dispatch) => {
    dispatch({type : "LOG_OUT"});
}