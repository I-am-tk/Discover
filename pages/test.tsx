import React from "react";
import Home from "@material-symbols/svg-400/outlined/home.svg";

// Icons are fixed

function Test() {
  return (
    <div>
      {/* This is how icon should be */}
      <div className="w-8 h-8  bg-red-400 flex justify-center items-center">
        <Home viewBox="0 0 48 48" />
      </div>
    </div>
  );
}

export default Test;
