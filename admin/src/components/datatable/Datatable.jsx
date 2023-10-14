import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hookCustome/fetchData";
import axios from "axios";
import { Button } from "@mui/material";

const Datatable = ({ columns }) => {
  const location = useLocation();
  let path = location.pathname.split("/")[1];
  const { data, reFetch } = useFetch(
    `https://ecomserver-9b4w.onrender.com/api/${path}`,
  );
  const [listData, setListData] = useState();
  const [text, setText] = useState("");

  useEffect(() => {
    if (path === "user") {
      setListData(data);
    } else {
      if (text !== "")
        setListData(data.filter((x) => x.name.toLowerCase().includes(text)));
      else setListData(data);
    }
  }, [text, data, path]);

  const handleDelete = async (id) => {
    if (window.confirm("Do u want delete?")) {
      await axios.delete(
        `https://ecomserver-9b4w.onrender.com/api/${path}/delete/${id}`,
      );
      setListData(reFetch());
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <Button className="cellAction">
            <Link
              to={`/${path}/update/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Update</div>
            </Link>

            <Button
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </Button>
          </Button>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path === "product" ? (
          <div style={{ border: "1px" }}>
            search {path}:{" "}
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        ) : (
          path
        )}
        <div>
          <Link to={`/${path}/new`} className="link">
            Add New
          </Link>
        </div>
      </div>
      {listData ? (
        <DataGrid
          className="datagrid"
          rows={listData}
          columns={path === "product" ? columns.concat(actionColumn) : columns}
          pageSize={9}
          rowsPerPageOptions={[9]}
          getRowId={(row) => row._id}
        />
      ) : null}
    </div>
  );
};

export default Datatable;
