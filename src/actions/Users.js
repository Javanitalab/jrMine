  
  export const setUsers = (users) => {
     
    return {
      type: 'SET_USERS',
      payload: users
    };
  };
    
  export const setUserData = (user) => {
     
    return {
      type: 'SET_USER_DATA',
      payload: user
    };
  };