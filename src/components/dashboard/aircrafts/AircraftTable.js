import React from 'react';
import {useSelector} from 'react-redux';
import AircraftTableCell from './AirCraftTableCell';
import { Delete } from 'DataManager/DataManager';


const AircraftTable = (props) => {
  const deleteAircraft = async (id) => {
    try {
       
      await Delete('aircrafts', id);
      props.getAircrafts();
    } catch (error) {
      
    }
  }
    return (
      <div className="table-responsive-material">
        <table className="default-table table-unbordered table table-sm table-hover">
          <thead className="th-border-b">
          <tr>
            <th>AircraftId</th>
            <th>Model Number</th>
            <th>Model Name</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {
            props.data.length > 0
            ? props.data.map(data => {
              return (
                <AircraftTableCell openModal={(data) => { ;props.openModal(data)}} deleteAircraft={(id) => {deleteAircraft(id)}} getAircrafts={props.getAircrafts} key={data._id} data={data}/>
              );
            })
            : null
          }
          </tbody>
        </table>
      </div>
    );
}

export default AircraftTable;
