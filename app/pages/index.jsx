import SectionOne from "@/components/headerApp/SectionOne";
import FirstSection from "@/components/homeSection/FirstSection";
import Loading from "@/components/small/Loading";
import { getUserFeeds, getUsers } from "@/redux/reducer/dataSlice";
import { closeList } from "@/redux/reducer/profileSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function Home() {
  const Store = useSelector((state) => state.data);
  const [name, setname] = useState("");
  const dispatch = useDispatch();
  const closeWindow = () => {
    dispatch(closeList());
  };

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getUserFeeds());
    const userId = window.localStorage.getItem("userId");
    const getUser = Store.data.filter((e) => e._id === userId);
    setname(getUser);
  }, []);

  useEffect(() => {
    dispatch(getUserFeeds());
    const userId = window.localStorage.getItem("userId");
    const getUser = Store.data.filter((e) => e._id === userId);
    setname(getUser);
  }, [Store.action]);

  return (
    <>
      {Store.loading ? (
        <>
          <Loading />
          <div className="conter">
            <SectionOne />
            <div onClick={closeWindow} className="containerApp">
              <FirstSection feeds={Store.userFeeds} name={name} />
            </div>
          </div>
        </>
      ) : (
        <div className="conter">
          <SectionOne />
          <div onClick={closeWindow} className="containerApp">
            <FirstSection feeds={Store.userFeeds} name={name} />
          </div>
        </div>
      )}
    </>
  );
}
