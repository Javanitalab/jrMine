import React, {useState} from 'react';
// import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import CardMenu from '../Common/CardMenu'
import { Delete, List } from 'DataManager/DataManager';

const NotificationTableCell = (props) => {
  const [menuState, setMenuState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(undefined);

  const deleteNotification = async () => {
    try {
       
      await Delete('notification', props.data.data._id);
      props.getNotifications();
    } catch (error) {
      
    }
  }

  const onOptionMenuSelect = event => {
    setMenuState(true);
     
    setAnchorEl(event.currentTarget);
  };
  const handleRequestClose = (idx) => {
     
    if(idx !== null) {
       
      switch(idx){
        case 0:
           
          props.openModal(props.data._id);
          //update
          break;
        case 2:
           
          props.deleteNotification(props.data._id);
          //delete
          break;

        case 1: 
         
          props.openDetailedLog(props.data._id);
          break;

        default :
          break; 
      }
    }
    setMenuState( false );
  };


    return (
      <tr
        tabIndex={-1}
        key={props.data._id}
      >
        <td>{props.data._id}</td>
        {/* <td>
          <div className="user-profile d-flex flex-row align-items-center">
            <Avatar
              alt={username}
              src={avatar}
              className="user-avatar"
            />
            
          </div>
        </td> */}
        <td>
          <div className="user-detail">
              <h5 className="user-name">{props.data.title} </h5>
            </div>
        </td>
        <td>{props.data.description}</td>
        <td>{props.data.publisher !== null ? props.data.publisher.username : '-'}</td>
        <td>{props.data.published_time}</td>
        <td className="status-cell text-right">
          <div className={` badge text-uppercase ${props.data.is_flagged  ? "text-white bg-success" :  "text-white bg-danger"}`}>{props.data.is_flagged ? 'Yes' : 'No'}</div>
        </td>
        <td className="status-cell text-right">
          <div className={` badge text-uppercase ${props.data.is_seen  ? "text-white bg-success" :  "text-white bg-danger"}`}>{props.data.is_seen ? 'Yes' : 'No'}</div>
        </td>
        <td className="text-right">
          <IconButton onClick={onOptionMenuSelect}>
            <i className="zmdi zmdi-more-vert"/></IconButton>
          <CardMenu 
                    onClick={deleteNotification}
                    menuState={menuState} anchorEl={anchorEl}
                    handleRequestClose={(idx) => {handleRequestClose(idx)}}/>
        </td>
      </tr>

    );
}

export default NotificationTableCell;
