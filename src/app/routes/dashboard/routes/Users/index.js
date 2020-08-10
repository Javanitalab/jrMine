import React, { Component } from "react";
import "components/Datatables/css/jquery.dataTables.min.css";
import "datatables.net-select";
import ewano from "config/axios/ewano";
import ReactDOM from "react-dom";

const $ = require("jquery");
$.DataTable = require("datatables.net");
$.colReorder = require("datatables.net-colreorder");

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.deleteRow = this.deleteRow.bind(this);
    this.editRow = this.editRow.bind(this);
    this.expandRow = this.expandRow.bind(this);
    this.collapseRow = this.collapseRow.bind(this);
  }

  componentDidMount() {
    this.$el = $(this.el);
    var rowId = 0;
    var a = this.$el.DataTable({
      data: this.state.data,
      colReorder: true,
      dom: 'T<"clear">lrtip',
      serverSide: true,
      order: [[1, "desc"]],
      rowId: "rowId",
      columns: [
        {
          class: "details-control",
          orderable: false,
          data: null,
          defaultContent: "",
        },

        { data: "id", title: "Id", id: 0 },
        { data: "status", title: "Status", id: 1 },
        { data: "userId", title: "user id", id: 2 },
        { data: "owner", title: "Owner", id: 3 },
        { data: "totalAmount", title: "Total Amount", id: 4 },
        { data: "payableAmount", title: "Payable Amount", id: 5 },
        { data: "actions", title: "actions", id: 6 },
      ],
      columnDefs: [
        {
          targets: -1,
          data: null,
          orderable: false,
          className: "details-control",
          defaultContent: "+",
        },
        {
          targets: [0],
          width: 30,
          className: "details-control",
          createdCell: (td, cellData, rowData, rowNumber) => {
            console.log(rowData);
            return ReactDOM.render(
              <button
                type="button"
                onClick={(e) => {
                  alert(e.target.type);
                  if (e.target.type == "button") {
                    e.target.type = "submit";
                    this.expandRow(rowData, rowNumber);
                  } else {
                    e.target.type = "button";
                    this.collapseRow(rowData, rowNumber);
                  }
                }}
              >
                E/C
              </button>,
              td
            );
          },
        },
        {
          targets: [7],
          width: 70,

          className: "details-control",
          createdCell: (td, cellData, rowData) =>
            ReactDOM.render(
              <div>
                <button
                  id={rowData.id}
                  onClick={() => {
                    this.deleteRow(rowData);
                  }}
                >
                  Delete
                </button>
                <button
                  id={rowData.id}
                  onClick={() => {
                    this.editRow(rowData);
                  }}
                >
                  Edit
                </button>
              </div>,
              td
            ),
        },
      ],
      ajax: async function(data, callback, settings) {
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
                el.actions = "";
                el.rowId = "rowID" + rowId++;
                return el;
              }),
            });
          });
      },
    });
  }
  componentWillUnmount() {
    $(".data-table-wrapper")
      .find("table")
      .DataTable()
      .destroy(true);
  }
  reloadTableData = (data) => {
    const table = $(".data-table-wrapper")
      .find("table")
      .DataTable();
    table.clear();
    table.rows.add(data);
    table.draw();
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.data.length !== this.state.data.length) {
      this.reloadTableData(nextState.data);
    }
    return false;
  }

  deleteRow = (id) => {
    alert("in delete");
    alert(id);
  };

  collapseRow = (rowData) => {
    var table = document.getElementById("myTable");
    var totalCount = table.children[1].childElementCount;
    var rowNumber = 0;
    for (rowNumber = 0; rowNumber < totalCount; rowNumber++) {
      if (table.children[1].childNodes[rowNumber].id == rowData.rowId) break;
    }

    var row = table.childNodes[1].removeChild(table.children[1].childNodes[rowNumber + 1]);

  };
  expandRow = (rowData) => {
    var table = document.getElementById("myTable");
    var totalCount = table.children[1].childElementCount;
    var rowNumber = 0;
    for (rowNumber = 0; rowNumber < totalCount; rowNumber++) {
      if (table.children[1].childNodes[rowNumber].id == rowData.rowId) break;
    }

    var row = table.childNodes[1].insertRow(rowNumber + 1);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    // Add some text to the new cells:
    cell1.innerHTML = rowData.id;
    cell1.style = 'colspan="100%"';
  };

  editRow = (data) => {
    alert("in edit");
    alert(data);
  };

  render() {
    return (
      <div>
        <table
          id="myTable"
          className="display nowrap"
          width="100%"
          cellSpacing="0"
          ref={(el) => (this.el = el)}
        ></table>
      </div>
    );
  }
}
export default Users;
