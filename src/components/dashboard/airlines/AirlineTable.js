import React from 'react';
import {useSelector} from 'react-redux';
import AirlineTableCell from './AirlineTableCell';
import { Delete } from 'DataManager/DataManager';


const AirlineTable = (props) => {
  const deleteAirline = async (id) => {
    try {
       
      await Delete('airlines', id);
      props.getAirlines();
    } catch (error) {
      
    }
  }
    return (
      <div className="table-responsive-material">
        <table className="default-table table-unbordered table table-sm table-hover">
          <thead className="th-border-b">
          <tr>
            <th>AirlineId</th>
            <th>Logo</th>
            <th>Name</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {
            props.data.length > 0
            ? props.data.map(data => {
              return (
                <AirlineTableCell openModal={(data) => { ;props.openModal(data)}} deleteAirline={(id) => {deleteAirline(id)}} getAirlines={props.getAirlines} key={data._id} data={data}/>
              );
            })
            : null
          }
          </tbody>
        </table>
      </div>
    );
}

export default AirlineTable;
