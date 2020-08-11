import React, { Component } from "react";
import "components/Datatables/css/jquery.dataTables.min.css";
import "datatables.net-select";
import ewano from "config/axios/ewano";
import ReactDOM from "react-dom";
import "./table.css";
import "./table-responsive.css";
const $ = require("jquery");
$.DataTable = require("datatables.net-responsive");
$.colReorder = require("datatables.net-colreorder");


var pageLoad = true;

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
    var columnOrders = [
      // {
      //   class: "details-control",
      //   orderable: false,
      //   data: null,
      //   defaultContent: "",
      //   id: 0,
      // },

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
      columnDefs: [
        {
          targets: [6],
          // className: "details-control",
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
            console.log("success");
            console.log(success);
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

    // On each draw, loop over the `detailRows` array and show any child rows
    var detailRows = [];

    // $("#myTable").on("click", "tr td.details-control", function() {
    //   var tr = $(this).closest("tr");
    //   var row = myTable.row(tr);
    //   var idx = $.inArray(tr.attr("id"), detailRows);

    //   if (row.child.isShown()) {
    //     tr.removeClass("details");
    //     row.child.hide();

    //     // Remove from the 'open' array
    //     detailRows.splice(idx, 1);
    //   } else {
    //     tr.addClass("details");
    //     row.child(format(row.data())).show();

    //     // Add to the 'open' array
    //     if (idx === -1) {
    //       detailRows.push(tr.attr("id"));
    //     }
    //   }
    // });

    // // On each draw, loop over the `detailRows` array and show any child rows
    // myTable.on("draw", function() {
    //   $.each(detailRows, function(i, id) {
    //     $("#" + id + " td.details-control").trigger("click");
    //   });
    // });
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

    var row = table.childNodes[1].removeChild(
      table.children[1].childNodes[rowNumber + 1]
    );
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
