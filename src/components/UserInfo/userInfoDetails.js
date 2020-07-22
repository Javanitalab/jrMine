import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Retrieve} from 'DataManager/DataManager';
const UserInfoDetails = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
     
    console.log(user)
    const getUserData = async () => {
        try {
           
          const id = localStorage.getItem('user_id')
          const response = await Retrieve('users', id, null );
           
          dispatch({user: response, type: 'SET_USER_DATA'});
        } catch (error) {
          
        }
      }
      useEffect(() => {
          getUserData();
      },[])
    return(
        <div className="user-detail">
          <h4 className="user-name" onClick={(event) => {props.handleClick(event)}}>
          {/* {user.username} */}
            <i
            className="zmdi zmdi-caret-down zmdi-hc-fw align-middle"/>
          </h4>
        </div>
    )
}
export default UserInfoDetails;