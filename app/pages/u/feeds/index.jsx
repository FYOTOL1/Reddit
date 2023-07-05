import SectionOne from "@/components/headerApp/SectionOne";
import UserCommunity from "@/components/userCommunity/UserCommunity";
import React from "react";

const Index = () => {
  return (
    <>
      <SectionOne checkProf={true}>
        <UserCommunity />
      </SectionOne>
    </>
  );
};

export default Index;
