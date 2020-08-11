import React, { Component } from "react";
import "components/Datatables/css/jquery.dataTables.min.css";
import "datatables.net-select";
import ewano from "config/axios/ewano";
import ReactDOM from "react-dom";
import "./table.css";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import "./table-responsive.css";
const $ = require("jquery");
$.DataTable = require("datatables.net-responsive");
$.colReorder = require("datatables.net-colreorder");

function rand() {
  return Math.round(Math.random() * 20) - 10;
}


var pageLoad = true;
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      editModalOpen: false,
      modalStyle: null
    };
    this.deleteRow = this.deleteRow.bind(this);
    this.editRow = this.editRow.bind(this);
  }

  componentDidMount() {
    const classes = makeStyles((theme) => ({
      paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    }));

    const body = (
      <div style={this.state.modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">Text in a modal</h2>
        <p id="simple-modal-description">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </p>
      </div>
    );

    const EditModal = () =>
      <Modal
        open={this.state.editModalOpen}
        onClose={() => { this.state.editModalOpen = !this.state.editModalOpen }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>





    this.$el = $(this.el);
    var rowId = 0;
    var columnOrders = [
      { data: "id", title: "Id", id: 0 },
      { data: "status", title: "Status", id: 1 },
      { data: "userId", title: "user id", id: 2 },
      { data: "owner", title: "Owner", id: 3 },
      { data: "totalAmount", title: "Total Amount", id: 4 },
      { data: "payableAmount", title: "Payable Amount", id: 5 },
      { data: "actions", title: "actions", id: 6 },
    ];

    var myTable = this.$el.DataTable({
      data: this.state.data,
      colReorder: {
        fixedColumnsLeft: 1,
        fixedColumnsRight: 1,
      },
      stateSave: true,
      dom: 'T<"clear">lrtip',
      // responsive: true,
      serverSide: true,
      order: [[1, "desc"]],
      rowId: "rowId",
      columns: columnOrders,
      ajax: async function (data, callback, settings) {
        let fItem = [];
        data.columns.filter((i, idx) => {
          data.order.forEach((el) => {
            if (idx === el.column) {
              i["idx"] = el.column;
              i["dir"] = el.dir;
              fItem.push(i);
            }
          });
        });
        let orderBy = [];
        if (fItem.length > 0) {
          fItem.forEach((element) => {
            orderBy.push(element.data + " " + element.dir);
          });
        }
        const queryParams = {
          start: data.start,
          size: data.length,
        };
        if (orderBy !== null) queryParams["orderBy"] = orderBy.join();

        await ewano
          .get("/ecommerce/order/v1.0/orders", { params: queryParams })
          .then((success) => {
            callback({
              recordsTotal: success.data.result.data.count,
              recordsFiltered: success.data.result.data.count,
              data: success.data.result.data.result.map((el) => {
                el.actions = ('<button id="button-'+el.id+'">Open Modal</button><div id="modal-'+el.id+'" class="modal"><div class="modal-content"><div class="modal-header"><h2>Modal Header</h2></div><div class="modal-body"><p>Some text in the Modal Body</p><p>Some other text...</p></div><div class="modal-footer"><h3>Modal Footer</h3></div></div></div>');
                el.rowId = "rowID" + rowId++;
                return el;
              }),
            });
          });
      },
    });

    $('#myTable tbody').on('click', 'button', function (e) {
      
      var data = myTable.row($(this).parents()).data();
      var modal = document.getElementById("modal-"+data.id);
      console.log(modal)
      modal.style.display = "block";
          
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
      
    });

  }

  deleteRow = (id) => {
    alert("in delete");
    alert(id);
  };

  editRow = (data) => {
    alert("in edit");
    alert(data);
  };

  render() {
    return (
      <div >

        <table
          id="myTable"
          class="display dt-responsive nowrap"
          width="100%"
          cellSpacing="0"
          ref={(el) => (this.el = el)}
        ></table>
      </div>
    );
  }
}
export default Users;
