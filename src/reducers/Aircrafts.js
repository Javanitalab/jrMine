
  
  const INIT_STATE = {
    aircrafts: []
  };
  
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'SET_AIRCRAFTS': {
            return {
            ...state,
            aircrafts: action.aircrafts
            }
        }
        default:
            return state;
        }
  }
  