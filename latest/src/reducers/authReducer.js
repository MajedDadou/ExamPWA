// src/reducers/authReducer.js
const initialState = {
    userId: null,
    isLoggedIn: false
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          userId: action.payload.userId,
          isLoggedIn: true
        };
      case 'LOGOUT':
        return initialState;
      default:
        return state;
    }
  };
  
  export default authReducer;
  