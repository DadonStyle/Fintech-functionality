import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import data from "./data.json";

const userList = data.map((item) => {
  return {
    id: item["Client ID"],
    name: item["Client Name"],
    date: item.Date,
    number: item.Number,
    supplierName: item["Supplier Name"],
    fromDate: item["From Date"],
    toDate: item["To Date"],
    status: item.Status,
    quantity: item.Quantity,
    received: item.Received,
    inTheFactory: item["In The Factory"],
    onTheWay: item["On The Way"],
  };
});

const MyTable = (props) => {
  const [filteredData, setFilteredData] = useState(userList);
  const [filter, setFilter] = useState(true);
  const columns = [
    { title: "ID", field: "id" },
    { title: "Client Name", field: "name" },
    { title: "Date", field: "date" },
    { title: "Number", field: "number" },
    { title: "Supplier Name", field: "supplierName" },
    { title: "From Date", field: "fromDate" },
    { title: "To Date", field: "toDate" },
    { title: "Status", field: "status" },
    { title: "Quantity", field: "quantity" },
    { title: "Received", field: "received" },
    { title: "In The Factory", field: "inTheFactory" },
    { title: "On The Way", field: "onTheWay" },
  ];
  const handleChange = () => {
    setFilter(!filter);
  };

  return (
    <div className="App">
      <h1 align="center">Purple</h1>
      <h4 align="center">Users list</h4>

      <MaterialTable
        Title="a"
        data={filteredData}
        columns={columns}
        options={{
          filtering: filter,
          toolbar: false,
        }}
        actions={[]}
      />
    </div>
  );
};

export default MyTable;
