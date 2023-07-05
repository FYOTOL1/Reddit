import React, { useEffect, useState } from "react";
import style from "@/styles/createCommunity/createCommunity.module.css";
import Link from "next/link";
import axios from "axios";

const CommunityForm = ({ cond }) => {
  const [val, setVal] = useState(false);
  const [Name, setName] = useState("");
  const [placeholder, setPlaceholder] = useState("name");

  const addCommunity = async () => {
    if (cond) {
      console.log("yes");
      if (Name.length >= 4) {
        const id = window.localStorage.getItem("userId");
        try {
          const createComm = await axios.post(
            "http://localhost:3000/api/communityData/communityData",
            {
              commName: Name,
              userComm: id,
            }
          );
          setName("");
          localStorage.removeItem("Comm");
          localStorage.setItem("Comm", true);
        } catch (error) {
          console.log(error);
        }
      } else {
        setPlaceholder("You need at least four characters");
        setVal(true);
      }
    } else {
      setPlaceholder("You already have a community");
      console.log("No");
    }
  };

  return (
    <>
      <div className={style.form}>
        <div className={style.container}>
          <div className={style.titleCard}>
            <h1 style={cond ? {} : { color: "#EA2423" }}>
              {cond ? "Create a Community" : "You already have a community"}
            </h1>
          </div>
          <hr />
          <div className={style.creator}>
            <div className={style.titleCommunity}>
              <h2>Name</h2>
            </div>
            <div className={style.paragraph}>
              <p>Community names including capitalization cannot be changed.</p>
            </div>
            <div
              style={
                val ? { outline: "1px solid #ef4343", transition: "0.3s" } : {}
              }
              className={style.inputForm}
            >
              <p>r/</p>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                  setVal(false);
                }}
                maxLength={15}
                minLength={4}
                type="text"
                placeholder={
                  !cond ? "You already have a community" : placeholder
                }
                autoComplete="off"
              />
            </div>
          </div>
          <div className={style.actionsButtons}>
            <button
              style={
                cond
                  ? {}
                  : {
                      backgroundColor: "#EA2423",
                      opacity: "0.6",
                      cursor: "unset",
                    }
              }
              onClick={addCommunity}
              className={style.addCommunity}
              disabled={!cond || Name.length < 4}
            >
              {cond ? (
                <Link className="FullLink2" href={"/"}>
                  Create Community
                </Link>
              ) : (
                "Create Community"
              )}
            </button>
            <button className={style.cancelCommunity}>
              <Link className={style.CancelLink} href={"/"}>
                Cancel
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityForm;
