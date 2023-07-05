import React, { useState } from "react";
import style from "@/styles/userCommunity/userCommunityStyle.module.css";
import Link from "next/link";
import { leftArrow } from "@/components/small/fontAwesome";
import SectionOne from "@/components/headerApp/SectionOne";
import axios from "axios";
const Submit = () => {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");

  const postFeed = async () => {
    if (desc.length >= 3 && title.length >= 3) {
      const userFeed = window.localStorage.getItem("userId");
      const postData = await axios.post(
        "http://localhost:3000/api/feedData/feedData",
        { title, description: desc, userFeed }
      );
      await settitle("");
      await setdesc("");
    }
  };
  return (
    <>
      <SectionOne checkProf={false}>
        <div className={style.userCommunity}>
          <div className={style.parentCont}>
            <div className={style.leftCont}>
              <div className={style.backButton}>
                <Link className={style.LinkCommunity} href={"/u/feeds"}>
                  <p>back to community</p>
                  <p>{leftArrow}</p>
                </Link>
              </div>
              <div className={style.userName}>
                <h2>
                  create Post <span>in r/ahmed</span>
                </h2>
              </div>
              <div className={style.values}>
                <div className={style.valuesCont}>
                  <div className={style.titleInput}>
                    <input
                      type="text"
                      name="titleInput"
                      placeholder="Title"
                      autoComplete="no"
                      autoCorrect="no"
                      maxLength={28}
                      minLength={3}
                      onChange={(e) => settitle(e.target.value)}
                      value={title}
                    />
                  </div>
                  <div className={style.otherInput}>
                    <input
                      type="text"
                      name="descInput"
                      placeholder="Type here to write your post..."
                      autoComplete="no"
                      autoCorrect="no"
                      maxLength={28}
                      minLength={3}
                      onChange={(e) => setdesc(e.target.value)}
                      value={desc}
                    />
                  </div>
                </div>

                <Link
                  onClick={postFeed}
                  className={style.Post}
                  href={"/u/feeds"}
                >
                  <p>Post</p>
                </Link>
              </div>
            </div>
            <div className={style.RightSide}>
              <div className={style.rightCont}>
                <div className={style.topCard}>
                  <h2>About {"r/Ahmed"}</h2>
                </div>
                <div className={style.centerCont}>
                  <div className={style.createdTime}>
                    <p>Created</p>
                    <p>{"june 21, 2023"}</p>
                  </div>
                  <div className={style.members}>
                    <p>Members</p>
                    <p>2</p>
                  </div>
                  <div className={style.para}>
                    <p>You created this community</p>
                  </div>
                </div>
                <div className={style.bottomCard}>
                  <button>
                    <Link className={style.LinkButton} href={"/u/feeds"}>
                      Back
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionOne>
    </>
  );
};

export default Submit;
