
  
  const INIT_STATE = {
    airlines: []
  };
  
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'SET_AIRLINES': {
            return {
            ...state,
            airlines: action.airlines
            }
        }
        default:
            return state;
        }
  }
  