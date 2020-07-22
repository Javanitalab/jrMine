import React, { useEffect } from 'react';
import NotificationTableCell from './NotificationTableCell';
import { Delete } from 'DataManager/DataManager';


const NotificationTable = (props) => {
  const deleteNotification = async (id) => {
    try {
      const response = await Delete('notifications', id);
      props.getNotifications();
    } catch (error) {
      
    }
  }
    return (
      <div className="table-responsive-material">
        <table className="default-table table-unbordered table table-sm table-hover">
          <thead className="th-border-b">
          <tr>
            <th>norificationId</th>
            {/* <th>avatar</th> */}
            <th>title</th>
            <th>description</th>
            <th>publisher</th>
            <th>published_time</th>
            <th className="status-cell text-right">is_flagged</th>
            <th className="status-cell text-right">is_seen</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {
            props.data.length > 0
            ? props.data.map(data => {
              return (
                <NotificationTableCell openDetailedLog={(data) => {props.openDetailedLog(data)}} 
                                        openModal={(data) => { props.openModal(data)}} 
                                        deleteNotification={(id) => {deleteNotification(id)}} 
                                        getNotifications={props.getNotifications} 
                                        key={data._id} 
                                        data={data}/>
              );
            })
            : null
          }
          </tbody>
        </table>
      </div>
    );
}

export default NotificationTable;








