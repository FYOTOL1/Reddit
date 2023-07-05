import React, { useState } from "react";
import style from "@/styles/loginStyle/login.module.css";
import { openEye, closeEye } from "../small/fontAwesome";
import { useDispatch } from "react-redux";
import { postUser } from "@/redux/reducer/dataSlice";
import Link from "next/link";

const SignupForm = () => {
  const [userName, setuserName] = useState("");
  const [Country, setCountry] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [show, setshow] = useState(false);

  const dispatch = useDispatch();
  const sendUser = async () => {
    if (
      userName.length >= 3 &&
      Country.length >= 3 &&
      Email.length >= 3 &&
      Password.length >= 3
    ) {
      try {
        dispatch(
          postUser({
            username: userName,
            email: Email,
            password: Password,
            country: Country,
          })
        ).then(() => {
          setCountry("");
          setEmail("");
          setPassword("");
          setuserName("");
        });
      } catch (error) {
        console.log("Error From Login Form" + error.message);
      }
    }
  };
  return (
    <div className={style.containerFormLogin}>
      <div className={style.form}>
        <p className={style.title}>Sign Up</p>
        <p className={style.message}>
          Signup now and get full access to our app.
        </p>
        <div className={style.flex}>
          <label>
            <input
              required
              placeholder=""
              type="text"
              className={style.input}
              onChange={(e) => setuserName(e.target.value.toLowerCase())}
              value={userName}
            />
            <span>userName</span>
          </label>

          <label>
            <input
              required
              placeholder=""
              type="text"
              className={style.input}
              onChange={(e) => setCountry(e.target.value.toLowerCase())}
              value={Country}
            />
            <span>Country</span>
          </label>
        </div>

        <label>
          <input
            required
            placeholder=""
            type="Email"
            className={style.input}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            value={Email}
          />
          <span>Email</span>
        </label>

        <label>
          <input
            required
            placeholder=""
            type={`${!show ? "Password" : "text"}`}
            className={`${style.input} ${style.Show}`}
            onChange={(e) => setPassword(e.target.value)}
            value={Password}
          />
          <span>Password</span>
          <span
            className={style.show}
            onClick={() => {
              setshow(!show);
            }}
          >
            {show ? openEye : closeEye}
          </span>
        </label>
        <button className={style.submit} onClick={() => sendUser()}>
          Submit
        </button>
        <p className={style.signin}>
          Already have an account ? <Link href="/account/login">LogIn</Link>
        </p>
        <Link className={style.LinkBack} href="/">
          Home
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
