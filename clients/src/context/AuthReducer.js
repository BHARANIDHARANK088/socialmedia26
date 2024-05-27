// 52
const AuthReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_START":
        return {
          user: null,
          isFetching: true,
          error: false,
        };
      case "LOGIN_SUCCESS":
        return {
          user: action.payload,
          isFetching: false,
          error: false,
        };
      case "LOGIN_FAILURE":
        return {
          user: null,
          isFetching: false,
          error: true,
        };
      case "FOLLOW":
        return {
          ...state,
          user: {
            ...state.user,
            followings: [...state.user.followings, action.payload],
          },
        };
      case "UNFOLLOW":
        return {
          ...state,
          user: {
            ...state.user,
            followings: state.user.followings.filter(
              (following) => following !== action.payload
            ),
          },
        };
        
      case "UPDATING_START":
          return {...state, updateLoading: true, error: false};
      case "UPDATING_SUCCESS":
          localStorage.setItem("user", JSON.stringify({...action?.data}));
          return {...state, user: action.data, updateLoading: false, error: false};
      case "UPDATING_FAIL":
          return {...state, updateLoading: false, error: true};

      case "LOG_OUT":
          localStorage.clear();
          return {...state, user: null, loading: false, error: false, updateLoading: false};

      default:
        return state;
    }
};
  
export default AuthReducer;