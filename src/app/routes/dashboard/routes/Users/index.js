import React, { Component } from "react";
import 'components/Datatables/css/jquery.dataTables.min.css';
import 'datatables.net-select';
import ewano from 'config/axios/ewano';
const $ = require('jquery');
$.DataTable = require('datatables.net');
$.colReorder = require( 'datatables.net-colreorder' );
class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
         
    }
   componentDidMount(){
        this.$el = $(this.el);
        this.$el.DataTable({
            data: this.state.data,
            colReorder: true,
            "order": [[ 1, "desc" ]],           
            columns: [
              {
                "class":          "details-control",
                "orderable":      false,
                "data":           null,
                "defaultContent": ""
            },
              {data: 'id', title: 'Id',id: 0},
              {data:'status', title: 'Status', id: 1},
              {data: 'userId',title: 'user id', id: 2},
              {data: 'owner',title: 'Owner', id: 3},
              {data:'totalAmount', title: 'Total Amount', id: 4},
              {data:'payableAmount', title: 'Payable Amount', id: 5},

         ],
            serverSide: true,
            ajax: async function(data, callback, settings) {
              let fItem = [];
              data.columns.filter((i,idx) => {
                data.order.forEach((el) => {
                  if(idx === el.column){
                    i['idx'] = el.column;
                    i['dir'] = el.dir;
                    fItem.push(i);
                  }
                });
              });
              let orderBy = [];
              if(fItem.length > 0){
                  fItem.forEach(element => {
                    orderBy.push(element.data+' '+element.dir)
                  });
              }
              const queryParams = {
                start: data.start,
                size: data.length
              }
              if(orderBy !== null ) queryParams['orderBy'] = orderBy.join();
               
              await ewano.get('/ecommerce/order/v1.0/orders',{params: queryParams}).then(success=>{
                callback({
                            recordsTotal: success.data.result.data.count,
                            recordsFiltered: success.data.result.data.count,
                            data: success.data.result.data.result
                          });
                           
                        });
                   
            }  
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