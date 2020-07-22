import React, { useEffect } from 'react';
import LegTableCell from './LegTableCell';
import { Delete } from 'DataManager/DataManager';


const LegTable = (props) => {
  const deleteLeg = async (id) => {
    try {
      const response = await Delete('legs', id);
      props.getLegs();
    } catch (error) {
      
    }
  }
    return (
      <div className="table-responsive-material">
        <table className="default-table table-unbordered table table-sm table-hover">
          <thead className="th-border-b">
          <tr>
            <th>updateBadge</th>
            <th>supportBadge</th>
            <th>legsBadge</th>
            <th>notificationBadge</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {
            props.data.length > 0
            ? props.data.map(data => {
              return (
                <LegTableCell openModal={(data) => { ;props.openModal(data)}} deleteLeg={(id) => {deleteLeg(id)}} getLegs={props.getLegs} key={data._id} data={data}/>
              );
            })
            : null
          }
          </tbody>
        </table>
      </div>
    );
}

export default LegTable;