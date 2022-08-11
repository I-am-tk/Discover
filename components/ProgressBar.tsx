import React from "react";

function ProgressBar({ value }: { value: number }) {
  return (
    <div>
      <span id="loadinglabel" className="sr-only">
        Loading:
      </span>
      <div
        role="progressbar"
        aria-labelledby="loadinglabel"
        className="h-[10px] rounded-full overflow-hidden w-full border"
      >
        <div style={{ width: `${value}%` }} className={`h-full rounded-full bg-indigo-500`}></div>
      </div>
    </div>
  );
}

export default ProgressBar;
