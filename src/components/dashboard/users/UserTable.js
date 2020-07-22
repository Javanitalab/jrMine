import React from 'react';
import {useSelector} from 'react-redux';
import UserTableCell from './UserTableCell';
import { Delete } from 'DataManager/DataManager';


const UserTable = (props) => {
  const deleteUser = async (id) => {
    try {
       
      await Delete('users', id);
      props.getUsers();
    } catch (error) {
      
    }
  }
    return (
      <div className="table-responsive-material">
        <table className="default-table table-unbordered table table-sm table-hover">
          <thead className="th-border-b">
          <tr>
            <th>userId</th>
            {/* <th>avatar</th> */}
            <th>name</th>
            <th>email</th>
            <th className="status-cell text-right">Email Is Verified</th>
            <th className="status-cell text-right">Is Admin</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {
            props.data.length > 0
            ? props.data.map(data => {
              return (
                <UserTableCell openModal={(data) => { ;props.openModal(data)}} deleteUser={(id) => {deleteUser(id)}} getUsers={props.getUsers} key={data._id} data={data}/>
              );
            })
            : null
          }
          </tbody>
        </table>
      </div>
    );
}

export default UserTable;
