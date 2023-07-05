import React from "react";
import style from "../../styles/headerApp/profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeBool } from "@/redux/reducer/profileSlice";

const Profile = () => {
  const Store = useSelector((state) => state.listSlice);
  const dispatch = useDispatch();
  const handelProf = () => {
    dispatch(changeBool());
  };
  return (
    <>
      <div className={style.profile}>
        <div onClick={handelProf} className={style.contImage}>
          <img src="/logo.png" alt="Error" />
        </div>
      </div>
    </>
  );
};

export default Profile;
