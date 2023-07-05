import React, { useEffect, useState } from "react";
import style from "../../styles/headerApp/header.module.css";
import Link from "next/link";
import { search } from "../small/fontAwesome";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { closeList } from "@/redux/reducer/profileSlice";
import Image from "next/image";
import { postUser } from "@/redux/reducer/dataSlice";
import LoginForm from "../Login/LoginForm";

const Header = () => {
  const listStore = useSelector((state) => state.listSlice);
  const date = useSelector((state) => state.data);
  const [data, setdata] = useState(date.data);
  const [check, setcheck] = useState(date.checkOfHeader);
  const dispatch = useDispatch();
  const CloseWindow = () => {
    dispatch(closeList());
  };

  useEffect(() => {
    if (window.localStorage.getItem("userId") === null) {
      setcheck(false);
    } else if (window.localStorage.getItem("userId")) {
      setcheck(true);
    }
  }, [LoginForm]);

  useEffect(() => {
    if (date.data) {
      setdata(
        date?.data?.filter(
          (e) => e._id === window.localStorage.getItem("userId")
        )
      );
    }
  }, [dispatch, date.data, postUser]);

  const clearId = () => {
    window.localStorage.removeItem("userId");
    if (window.localStorage.getItem("userId") === null) {
      setcheck(false);
    } else if (window.localStorage.getItem("userId")) {
      setcheck(true);
    }
  };

  const clearStorage = () => {
    window.localStorage.clear();
  };

  return (
    <>
      <div className={style.header}>
        {listStore.boolList ? (
          <div className={style.headerList}>
            <div className={style.listContainer}>
              <div className={style.userData}>
                <h2>{check ? data[0]?.username : "User"}</h2>
                <p>{check ? data[0]?.email : "User"}</p>
              </div>
              <hr />
              <ul>
                <li onClick={CloseWindow}>
                  <Link className={style.LinkList} href={"/"}>
                    Feed
                  </Link>
                </li>
                <li onClick={CloseWindow}>
                  <Link className={style.LinkList} href={"/r/create"}>
                    {listStore.boolComm ? "Create Community" : "Edit Community"}
                  </Link>
                </li>
                <li onClick={CloseWindow}>
                  <Link className={style.LinkList} href={"/"}>
                    Settings
                  </Link>
                </li>
                <li onClick={CloseWindow}>
                  <button onClick={clearId}>
                    <Link
                      onClick={clearStorage}
                      href={check ? "/" : "/account/login"}
                    >
                      {check ? "Sign Out" : "Sign In"}
                    </Link>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className={style.container}>
          <div className={style.logo}>
            <div className={style.contLogo}>
              <Link className={style.Home} href={"/"}>
                <Image
                  className={style.IMG}
                  width={200}
                  height={200}
                  quality={40}
                  src="/logo.png"
                  alt="Error"
                />
                <h2>Tower</h2>
              </Link>
            </div>
          </div>
          <div className={style.search}>
            <input type="text" autoComplete="no" placeholder="Search..." />
            <i>{search}</i>
          </div>
          <Profile />
        </div>
      </div>
    </>
  );
};

export default Header;
