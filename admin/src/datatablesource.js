import moment from "moment";
import { Button } from "@mui/material";

export const userColumns = [
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.avatar} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "phoneNumber",
    headerName: "Phone Number",
    width: 100,
  },
  {
    field: "addresses",
    headerName: "Address",
    width: 100,
  },
  {
    field: "role",
    headerName: "Role",
    width: 100,
  },
];

export const productColumns = [
  {
    field: "images",
    headerName: "Image",
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.photos[0]} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
    width: 300,
  },
  {
    field: "category",
    headerName: "Category",
    width: 130,
  },
  {
    field: "price",
    headerName: "Price",
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {new Intl.NumberFormat("en-DE").format(params.row.price)} VND
        </div>
      );
    },
    width: 200,
  },
  {
    field: "stock",
    headerName: "Stocks",
    with: 50,
  },
];

export const ordersColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 130,
    renderCell: (params) => {
      return <div className="cellWithImg">{params.row.name}</div>;
    },
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
  {
    field: "address",
    headerName: "Address",
    width: 100,
  },
  {
    field: "products",
    headerName: "Products",
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.products.map((it) => {
            return <img width={40} height={40} src={it.photos[0]} alt="" />;
          })}
        </div>
      );
    },
    width: 200,
  },
  {
    field: "totalPrice",
    headerName: "Bill",
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {new Intl.NumberFormat("en-DE").format(params.row.totalPrice)} VND
        </div>
      );
    },
    width: 150,
  },
  {
    field: "delivery",
    headerName: "Delivery",
    renderCell: (params) => {
      return (
        <div className="cellWithImg">{params.row.delivery.split(" ")[0]}</div>
      );
    },
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    renderCell: (params) => {
      return (
        <div className="cellWithImg">{params.row.status.split(" ")[0]}</div>
      );
    },
    width: 100,
  },
];

const BgStatus = (status) => {
  if (status === "Booked")
    return <Button sx={{ bgcolor: "pink", color: "black" }}>Booked</Button>;
  if (status === "Checkout")
    return (
      <Button sx={{ bgcolor: "#DCC8DE", color: "black" }}>Checkout</Button>
    );
  if (status === "Checkin")
    return <Button sx={{ bgcolor: "green", color: "black" }}>Checkin</Button>;
};
