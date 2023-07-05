import style from "../../styles/homeSection/FirstSection.module.css";
import FeedCard from "./FeedCard";
import FeedBuilder from "./FeedBuilder";
import { useEffect, useState } from "react";

function FirstSection({ feeds }) {
  const [Comm, setComm] = useState();
  useEffect(() => {
    const comm = localStorage.getItem("Comm");
    if (comm) {
      setComm(true);
    } else {
      setComm(false);
    }
  }, []);
  return (
    <>
      <div className={style.firstSection}>
        <div className={style.container}>
          <div className={style.tit}>
            <h1>Your feed</h1>
          </div>
          <div className={style.contFeed}>
            <div className={style.feeds}>
              <div className={style.feedsSide}>
                {feeds &&
                  feeds.map((e) => {
                    const num =
                      e.like > e.dislike
                        ? e.like - e.dislike
                        : e.dislike - e.like;
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
                      <FeedCard
                        title={e?.title}
                        time={date3 - date5}
                        username={e?.userFeed?.username}
                        timeType={TYPE}
                        id={e?._id}
                        LvL={e?.lvl}
                      />
                    );
                  })}
              </div>
              <FeedBuilder comm={Comm} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FirstSection;
