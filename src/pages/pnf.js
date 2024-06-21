import React from "react";
import "./pnf.css";
const Pnf = () => {
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}>
      <img
        src="https://i.postimg.cc/tJwfYh0J/not-found.gif"
        alt="page not found"
      />
      <div class="containers">
        <h2 class="title">
          <span class="title-word title-word-1 mr-1">Page</span>
          <span class="title-word title-word-2 mr-1">Not</span>
          <span class="title-word title-word-3">Found</span>
        </h2>
      </div>
    </div>
  );
};

export default Pnf;
