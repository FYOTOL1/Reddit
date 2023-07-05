import React, { useEffect, useState } from "react";
import style from "@/styles/loginStyle/login.module.css";
import { openEye, closeEye } from "../small/fontAwesome";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { changeUserLogin, getUsers } from "@/redux/reducer/dataSlice";

const LoginForm = () => {
  const Store = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [msg, setMsg] = useState(false);
  const [msg2, setMsg2] = useState(false);
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const CheckUser = () => {
    if (email && password) {
      setMsg2(false);
      const getOne = Store.data.filter(
        (e) => e.email === email && e.password === password
      );
      if (getOne[0]) {
        setMsg(false);
        if (window.localStorage.getItem("userId") === getOne[0]._id) {
          setpassword("");
          setemail("");
        } else if (window.localStorage.getItem("userId") != getOne[0]._id) {
          window.localStorage.removeItem("userId");
          window.localStorage.setItem("userId", getOne[0]._id);
          dispatch(changeUserLogin(true));
          setpassword("");
          setemail("");
        }
      } else {
        setMsg(true);
      }
    } else {
      setMsg2(true);
    }
  };
  return (
    <div className={style.containerFormLogin}>
      <div className={style.form}>
        <p className={style.title}>Login</p>
        <p className={style.message}>
          Login now and get full access to our app.
        </p>
        <label>
          <input
            required
            placeholder=""
            type="email"
            className={style.input}
            onChange={(e) => setemail(e.target.value.toLowerCase())}
            value={email}
          />
          <span>Email</span>
        </label>
        <label>
          <input
            required
            placeholder=""
            type={show ? "text" : "password"}
            className={`${style.input} ${style.Show}`}
            onChange={(e) => setpassword(e.target.value)}
            value={password}
          />
          <span>Password</span>
          <span
            className={style.show}
            onClick={() => {
              setShow(!show);
            }}
          >
            {show ? openEye : closeEye}
          </span>
        </label>
        {msg ? (
          <p style={{ textAlign: "center", color: "#ef4343", opacity: "0.8" }}>
            Wrong password or account
          </p>
        ) : msg2 ? (
          <p style={{ textAlign: "center", color: "#ef4343", opacity: "0.8" }}>
            One of the values is empty
          </p>
        ) : (
          ""
        )}
        <button className={style.submit} onClick={CheckUser}>
          Send
        </button>
        <p className={style.signin}>
          create an Account ? <Link href="/account/signup">Sign Up</Link>
        </p>
        <Link className={style.LinkBack} href="/">
          Home
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
