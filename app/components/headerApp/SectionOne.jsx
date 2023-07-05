import React from "react";
import Header from "./Header";

const SectionOne = ({ children, checkProf }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default SectionOne;
