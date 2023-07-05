import { useEffect, useState } from "react";
import style from "../../styles/homeSection/feedCard.module.css";
import { like, liked, comment } from "../small/fontAwesome";
import Link from "next/link";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { changeAction } from "@/redux/reducer/dataSlice";

const CommunityFeedsCard = ({
  username,
  timeType,
  title,
  time,
  id,
  LvL,
  name,
}) => {
  const Store = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [Like, setLike] = useState(false);
  const actionStorage = window.localStorage.getItem(`${id}`);

  const likeFun = async () => {
    if (actionStorage === "true") {
      const postLike = await axios.patch(
        `https://egy-temble.github.io/Reddit/api/feedData/${id}`,
        {
          lvl: LvL - 1,
        }
      );
      await dispatch(changeAction(id));
    } else {
      const postLike = await axios.patch(
        `https://egy-temble.github.io/Reddit/api/feedData/${id}`,
        {
          lvl: LvL + 1,
        }
      );

      await dispatch(changeAction(id));
    }
  };

  useEffect(() => {
    const actionStorage = window.localStorage.getItem(`${id}`);
    setLike(actionStorage === "true" ? true : false);
  }, [likeFun, Store]);

  return (
    <div className={`${style.feedCard} ${style.FEEDCARD2}`}>
      <div className={style.topSide}>
        <div className={style.leftSide}>
          <ul className={style.UL2}>
            <li>{LvL ? LvL : LvL}</li>
          </ul>
        </div>
        <div className={style.rightSide}>
          <div className={style.link_time}>
            <Link className={style.linkUser} href={"/u/feeds"}>
              {username ? username : "loading..."}
            </Link>
            <p className={style.dot}>•</p>
            <p className={style.time}>{`Posted by r/${name || "null"} ${
              time || "null"
            }${timeType || "h"} ago`}</p>
          </div>
          <div className={style.titlePost}>
            <h1>{title || "Title"}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityFeedsCard;
