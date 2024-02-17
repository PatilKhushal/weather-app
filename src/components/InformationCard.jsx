import React from "react";

export default function InformationCard({title, info, imgSrc}) {
  return (
    <div className="border-2 border-gray-400 flex gap-2 flex-col p-4 rounded-2xl min-w-max">
      <div className="text-title flex gap-4 mid-desktop:text-sm items-end">{imgSrc}{title}</div>
      <div className="border border-gray-400"></div>
      <div className="text-3xl">{info}</div>
    </div>
  );
}
