import React from "react";

export default function ForecastCardContainer({ children, title, imgSrc }) {
  return (
    <div className="hourly-forecast border-2 border-gray-400 flex flex-col p-3 gap-2 w-full rounded-3xl">
      <h1 className="text-lg text-title flex gap-2 large-mobile:text-sm">{imgSrc}{title}</h1>
      <div className="border border-gray-400"></div>
      <div className="flex text-center overflow-auto gap-4">
        {children}
      </div>
    </div>
  );
}
