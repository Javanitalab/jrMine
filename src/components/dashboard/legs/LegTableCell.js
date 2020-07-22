import React, {useState} from 'react';
// import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import CardMenu from '../Common/CardMenu'
import { Delete, List } from 'DataManager/DataManager';

const LegTableCell = (props) => {
  const [menuState, setMenuState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(undefined);

  const deleteLeg = async () => {
    try {
      await Delete('leg', props.data.data._id);
      props.getLegs();
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
          case 1:
           
          props.deleteLeg(props.data._id);
          //update
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
        key={props.data.legsBadge}
      >
        <td>{props.data.noitifcationBadge}</td>
        <td>{props.data.updatesBadge}</td>
        <td>{props.data.supportBadge}</td>
        {/* <td>
          <div className="leg-profile d-flex flex-row align-items-center">
            <Avatar
              alt={username}
              src={avatar}
              className="leg-avatar"
            />
            
          </div>
        </td> */}
        <td className="text-right">
          <IconButton onClick={onOptionMenuSelect}>
            <i className="zmdi zmdi-more-vert"/></IconButton>
          <CardMenu 
                    onClick={deleteLeg}
                    menuState={menuState} anchorEl={anchorEl}
                    handleRequestClose={(idx) => {handleRequestClose(idx)}}/>
        </td>
      </tr>

    );
}

export default LegTableCell;
