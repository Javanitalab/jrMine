export default function reducer(state={
    retrieve:{}
}, action) {
    switch (action.type) {
        case 'SetRetrieve':
            var a={...state, retrieve:action.payload}
            return a
            break;
        default:
            break;
    }
    return state
}

/* this component is retreive reducer it will catch the object we want from retrieve function in data manager and put it on store */