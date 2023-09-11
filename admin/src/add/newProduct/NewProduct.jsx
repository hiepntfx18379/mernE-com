import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { productInputs } from "../../formSource";
import { toast } from "react-toastify";

const NewProduct = ({ title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const list = await Promise.all(
        Object.values(file).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dmwl0pu3j/image/upload",
            data,
          );

          const { url } = uploadRes.data;
          return url;
        }),
      );

      const newPro = {
        ...info,
        photos: list,
      };

      await axios.post("/product/create-product", newPro);
      toast.success("Added new product");
      navigate("/product");
    } catch (err) {
      alert("Fields not empty");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>

          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFile(e.target.files)}
                  style={{ display: "none" }}
                  required
                />
              </div>

              {productInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    name={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    required
                  />
                </div>
              ))}

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
