import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { productInputs } from "../../formSource";
import useFetch from "../../hookCustome/fetchData";
import { BsArrowRight } from "react-icons/bs";

const UpdateProduct = ({ title }) => {
  const param = useParams();
  const { data } = useFetch(`/product/${param.id}`);
  const [file, setFile] = useState("");
  const [info, setInfo] = useState(data);
  const navigate = useNavigate();

  useEffect(() => {
    setInfo(data);
  }, [data]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

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
    const updateProduct = { ...info };
    if (list.length !== 0) {
      updateProduct.photos = list;
    }

    await axios.patch(`/product/update/${param.id}`, updateProduct);

    navigate("/product");
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
                  : info.length !== 0
                  ? info.photos[0]
                  : null
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
                    value={info[input.id]}
                    type={input.type}
                    placeholder={input.placeholder}
                    required
                  />
                </div>
              ))}
              <button onClick={handleClick}>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
