import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IntlMessages from 'util/IntlMessages';

const CardMenu = (props) => {
    let options = [
      <IntlMessages id="popup.updateData"/>,
      <IntlMessages id="popup.detailedLog"/>,
      // <IntlMessages id="popup.statistics"/>,
      <IntlMessages id="popup.clearData"/>
    ];;


    const {menuState, anchorEl, handleRequestClose} = props;
    return (
      <Menu id="long-menu"
            anchorEl={anchorEl}
            open={menuState}
            onClose={() => {handleRequestClose(null)}}

            MenuListProps={{
              style: {
                width: 150,
                paddingTop: 0,
                paddingBottom: 0
              },
            }}>
        {options.map((option,idx) =>
          <MenuItem key={idx} onClick={() => {handleRequestClose(idx)}}>
            {option}
          </MenuItem>,
        )}
      </Menu>
    );
}

export default CardMenu;