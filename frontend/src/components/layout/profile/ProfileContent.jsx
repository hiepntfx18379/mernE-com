import { Outlet } from "react-router-dom";

const ProfileContent = () => {
  return (
    <>
      <div className="w-[-webkit-fill-available]  ">
        <Outlet />
        {/* profile */}
      </div>
    </>
  );
};

export default ProfileContent;
