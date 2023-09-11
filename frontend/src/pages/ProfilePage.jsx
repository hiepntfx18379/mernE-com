import React, { useState } from "react";
import styles from "../styles/styles";
import ProfileSideBar from "../components/layout/profile/ProfileSideBar";
import ProtectPage from "../components/user/ProtectPage";

import { Outlet } from "react-router-dom";

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  return (
    <ProtectPage>
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
        <div className="w-[150px] 800px:w-[335px] sticky 800px:mt-0 mt-[-4%]">
          <ProfileSideBar active={active} setActive={setActive} />
        </div>
        <div className="w-[100%]">
          <Outlet />
        </div>
      </div>
    </ProtectPage>
  );
};

export default ProfilePage;
