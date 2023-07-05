import CommunityForm from "@/components/createCommunity/communityForm";
import SectionOne from "@/components/headerApp/SectionOne";
import Loading from "@/components/small/Loading";
import { getCommunity } from "@/redux/reducer/dataSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Index = () => {
  const Store = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [Check, setCheck] = useState();

  useEffect(() => {
    dispatch(getCommunity());
    const userId = window.localStorage.getItem("userId");
    if (Store.allCommunity.length >= 1) {
      const check = Store.allCommunity.some((e) => userId === e.userComm);
      setCheck(!check);
    } else {
      setCheck(true);
    }
  }, []);

  useEffect(() => {
    const userId = window.localStorage.getItem("userId");
    if (Store.allCommunity.length >= 1) {
      const check = Store.allCommunity.some((e) => userId === e.userComm);
      setCheck(!check);
    } else {
      setCheck(true);
    }
  }, [Store.allCommunity]);

  return (
    <>
      <SectionOne>
        {Store.loading ? <Loading /> : <CommunityForm cond={Check} />}
      </SectionOne>
    </>
  );
};

export default Index;
