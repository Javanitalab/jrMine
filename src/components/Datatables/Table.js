import React, { Component } from "react";
// import './css/jquery.dataTables.min.css';
import ewano from 'config/axios/ewano';
const $ = require('jquery');
$.DataTable = require('datatables.net');
var buttons = require( 'datatables.net-buttons' );
class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        debugger
    }
   componentDidMount(){
        this.$el = $(this.el)
        this.$el.DataTable({
            data: this.state.data,
            "order": [[ 1, "desc" ]],
            buttons: [
                'pdf'
            ],
            columns: [
              {data: 'updatedts', title: 'updatedts'},
              {data:'updater', title: 'updater'},
              {data: 'userId',title: 'user id'},
              {data: 'version',title: 'version'}
         ],
            serverSide: true,
            ajax: async function(data, callback, settings) {
              const queryParams = {
                start: data.start,
                size: data.length
              }
              await ewano.get('/ecommerce/order/v1.0/orders',{params: queryParams}).then(success=>{
                callback({
                            recordsTotal: success.data.result.data.count,
                            recordsFiltered: success.data.result.data.count,
                            data: success.data.result.data.result
                          });
                          debugger
                        });
                  debugger
            },
       })
   }

render() {
      return (
            <div>
                <table id='test' className='display nowrap' width='100%' ref={el => this.el = el}></table>
            </div>
       );
    }
}
export default Users;