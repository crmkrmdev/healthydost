import React from "react";
import index from "./index.html";

const Page = () => {
  return (
    <iframe
      src={index}
      width="100%"
      height="100vh"
      style={{ border: "none" }}
      title="Legacy Page"
    />
  );
};

export default Page;
