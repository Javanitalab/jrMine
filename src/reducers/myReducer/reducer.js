
  
  const INIT_STATE = {
    users: [],
    user: {}
  };
  
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'SET_USERS': {
            return {
            ...state,
            users: action.users
            }
        }
        case 'SET_USER_DATA': {
           
              return {
              ...state,
              user: action.user
              }
            }
        
        default:
            return state;
        }
  }
  