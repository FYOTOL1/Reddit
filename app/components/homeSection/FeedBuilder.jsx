import style from "../../styles/homeSection/feedBuilder.module.css";
import { home } from "../small/fontAwesome";
import Link from "next/link";

const FeedBuilder = ({ comm }) => {
  return (
    <>
      <div className={style.cardBuilder}>
        <div className={style.container}>
          <div className={style.title}>
            <li>{home}</li>
            <h2>Home</h2>
          </div>
          <div className={style.para}>
            <p>
              Your personal Breadit frontpage. Come here to check in with your
              favorite communities.
            </p>
          </div>
          <div className={style.creatorButton}>
            <Link className={style.LinkGo} href={comm ? "u/feeds" : "r/create"}>
              {comm ? "Your Community" : "Create community"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedBuilder;
