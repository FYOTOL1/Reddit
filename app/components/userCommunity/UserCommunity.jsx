import style from "@/styles/userCommunity/userCommunityStyle.module.css";
import Link from "next/link";
import { imageIcon, leftArrow, linkIcon } from "../small/fontAwesome";
import Image from "next/image";
import FeedCard from "../homeSection/FeedCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCommunity,
  getUserFeeds,
  getUsers,
} from "@/redux/reducer/dataSlice";
import Loading from "../small/Loading";
import CommunityFeedsCard from "./CommunityFeedsCard";

const UserCommunity = () => {
  const Store = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [data, setdata] = useState();
  const [name, setname] = useState();
  const [name2, setname2] = useState();
  const [createdTime, setcreatedTime] = useState();
  const [members, setmembers] = useState();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getUserFeeds());
    dispatch(getCommunity());
  }, []);

  useEffect(() => {
    const userId = window.localStorage.getItem("userId");
    const getCommName = Store.allCommunity.filter(
      (id) => id.userComm === userId
    );
    setname(getCommName[0]?.commName);
    const forChange = getCommName[0]?.createdAt;
    const newDate = new Date(forChange);
    setcreatedTime(newDate.toDateString());

    const getUserName = Store.data.filter((id) => id._id === userId);
    setname2(getUserName[0]?.username);

    const LengthFeeds = Store.userFeeds.filter(
      (id) => id.userFeed._id === userId
    );
    console.log(LengthFeeds);
    setmembers(LengthFeeds.length);
    if (Store.userFeeds) {
      const filteredUsers = Store.userFeeds.filter(
        (user) => user.userFeed._id === userId
      );
      setdata(filteredUsers);
    }
  }, [Store.data, Store.userFeeds, FeedCard]);

  return (
    <>
      {Store.loading ? (
        <Loading />
      ) : (
        <div className={style.userCommunity}>
          <div className={style.parentCont}>
            <div className={style.leftCont}>
              <div className={style.backButton}>
                <div className={style.buttonCont}>
                  <button>
                    <Link className={style.BackLinkButton} href={"/"}>
                      <p>{leftArrow}</p>
                      <p>Back home</p>
                    </Link>
                  </button>
                </div>
              </div>
              <div className={style.communityName}>
                <h2> r/{name ? name : "loading..."}</h2>
              </div>
              <div className={style.PostCard}>
                <div className={style.PostCont}>
                  <div className={style.userImage}>
                    <div className={style.imageCont}>
                      <Image
                        className={style.Img}
                        width={200}
                        height={200}
                        quality={40}
                        src="/logo.png"
                        alt="Error"
                      />
                    </div>
                  </div>
                  <Link
                    className={style.createPostInput}
                    href={"/u/feeds/submit"}
                  >
                    <input type="text" placeholder="Create post" />
                  </Link>
                  <div className={style.otherCont}>
                    <div className={style.photoSvg}>
                      <Link className={style.LinkSVG} href={"/"}>
                        {imageIcon}
                      </Link>
                    </div>
                    <div className={style.linkSvg}>
                      <Link className={style.LinkSVG} href={"/"}>
                        {linkIcon}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className={style.CardsCont}>
                <div className={style.childCardsCont}>
                  {data
                    ? data.map((e) => {
                        const date1 = e.createdAt;
                        const date2 = new Date(date1);
                        let date3 = date2.getHours();
                        //
                        const date4 = new Date(Date.now());
                        let date5 = date4.getHours();
                        const day =
                          date5 - date3 >= 24 ? (TYPE = "d") : (TYPE = "h");
                        var TYPE;
                        return (
                          <CommunityFeedsCard
                            title={e.title}
                            time={date5 - date3}
                            name={name}
                            username={name2}
                            timeType={TYPE}
                            id={e._id}
                            LvL={e.lvl}
                            show={false}
                          />
                        );
                      })
                    : "No Feeds"}
                </div>
              </div>
            </div>
            <div className={style.RightSide}>
              <div className={style.rightCont}>
                <div className={style.topCard}>
                  <h2>About r/{name ? name : "loading..."}</h2>
                </div>
                <div className={style.centerCont}>
                  <div className={style.createdTime}>
                    <p>Created</p>
                    <p>{createdTime}</p>
                  </div>
                  <div className={style.members}>
                    <p>Members</p>
                    <p>{members || 0}</p>
                  </div>
                  <div className={style.para}>
                    <p>You created this community</p>
                  </div>
                </div>
                <div className={style.bottomCard}>
                  <button>
                    <Link className={style.LinkButton} href={"/u/feeds/submit"}>
                      Create Post
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserCommunity;
