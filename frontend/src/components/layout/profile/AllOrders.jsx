import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import orderSlice, {
  getAllOrderSelector,
} from "../../../tookit/orders/orderSlice";
import PopupOrderDetail from "./PopupOrderDetail";

const AllOrders = () => {
  const dispatch = useDispatch();
  const listOrder = useSelector(getAllOrderSelector);
  const [open, setOpen] = useState(false);
  const [pro, setPro] = useState("");

  useEffect(() => {
    const getAllOrder = async () => {
      const res = await axios.get(
        "https://ecomserver-9b4w.onrender.com/api/order/orderUser",
      );

      dispatch(orderSlice.actions.allOrder({ all: res.data.orderOfUser }));
    };
    getAllOrder();
  }, [dispatch]);

  const handleClickView = (id) => {
    const index = listOrder.findIndex((x) => x._id === id);
    setPro(listOrder[index]);
    setOpen(true);
  };

  const columns = [
    { field: "_id", headerName: "Order ID", minWidth: 100 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
    },

    {
      field: "phone",
      headerName: "Phone",
      minWidth: 100,
    },

    {
      field: "address",
      headerName: "Address",
      minWidth: 100,
    },

    {
      field: "total",
      headerName: "totalPrice",
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            {new Intl.NumberFormat("en-DE").format(params.row.totalPrice)} VND
          </div>
        );
      },
      minWidth: 140,
    },

    {
      field: "delivery",
      headerName: "Delivery",
      minWidth: 180,
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "action",
      minWidth: 50,
      headerName: "Action",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button onClick={() => handleClickView(params.id)}>
            <AiOutlineArrowRight size={20} />
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <DataGrid
        className=" text-center"
        rows={listOrder}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(row) => row._id}
      />

      {open ? <PopupOrderDetail pro={pro} setOpen={setOpen} /> : null}
    </>
  );
};

export default AllOrders;
