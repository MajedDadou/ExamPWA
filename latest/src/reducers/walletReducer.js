// src/reducers/walletReducer.js
const initialState = {
    balance: 0
  };
  
  const walletReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_WALLET_BALANCE':
        return {
          ...state,
          balance: action.payload
        };
      default:
        return state;
    }
  };
  
  export default walletReducer;
  