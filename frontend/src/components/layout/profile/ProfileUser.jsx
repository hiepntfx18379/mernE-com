import React, { useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../../styles/styles";
import axios from "axios";
import { toast } from "react-toastify";

const ProfileUser = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(
    user.phoneNumber || "Your phone",
  );
  const [file, setFile] = useState(user.avatar);
  const [avatar, setAvatar] = useState("");
  const [address, setAddress] = useState(user.address || "Your address");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleClickUpdate = async (e) => {
    e.preventDefault();
    try {
      if (
        name === user.name &&
        email === user.email &&
        phoneNumber === user.phoneNumber &&
        file === user.avatar &&
        address === user.address
      ) {
        toast.error("Info is not changed");
      } else {
        await axios
          .patch("user/updateInfo", {
            name,
            email,
            avatar,
            phoneNumber,
            address,
          })
          .then((res) => {
            toast.success(res.data.message);
          });
      }
    } catch {}
  };

  useEffect(() => {
    async function editInfoUser() {
      try {
        const photo = new Promise(async (res, rej) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dmwl0pu3j/image/upload",
            data,
          );

          const { url } = uploadRes.data;
          res(url);
        });

        await photo.then((avatar) => {
          setAvatar(avatar);
        });
      } catch (err) {
        toast.error(err.message);
      }
    }

    editInfoUser();
  }, [file]);

  return (
    <>
      <div className="flex justify-center">
        <div className="relative">
          <img
            src={`${user?.avatar}`}
            className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
            alt=""
          />
          <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
            <input
              type="file"
              id="image"
              className="hidden"
              accept="'.jpg,.jpeg,.png"
              onChange={handleFileInputChange}
            />
            <label htmlFor="image">
              <AiOutlineCamera />
            </label>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full px-5">
        <form onSubmit={handleClickUpdate}>
          <div className="w-full 800px:flex block pb-3">
            <div className=" w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Full Name</label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className=" w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Email Address</label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full 800px:flex block pb-3">
            <div className=" w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Phone Number</label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className=" w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Address</label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>{" "}
            <input
              className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileUser;
