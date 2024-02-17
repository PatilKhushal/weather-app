import React from "react";

export default function HourCard({title, temperature, imgSrc, time, onclick, className}) {
  return (
    <div className={`flex flex-col justify-between hover:bg-[#1A8FE3] hover:text-white items-center p-4 my-4 rounded-xl min-w-max transition-all gap-1 large-mobile:p-2 ${className}`} onClick={onclick}>
      <h1 className="text-sm large-mobile:text-xs">{time}</h1>
      <h1 className="text-sm large-mobile:text-xs">{title}</h1>
      <span className="text-xl large-mobile:text-base">{temperature}&deg;</span>
      <img
          src={imgSrc}
          alt=""
          className="w-max large-mobile:w-3/4"
        />
    </div>
  );
}
