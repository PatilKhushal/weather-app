import React from "react";
import InformationCard from "./InformationCard";
import { useData } from "../context/data";
import SVG from "./SVG";

let feelsLike = (
  <SVG>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width={16}>
      <path d="M160 64c-26.5 0-48 21.5-48 48V276.5c0 17.3-7.1 31.9-15.3 42.5C86.2 332.6 80 349.5 80 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9c-8.2-10.6-15.3-25.2-15.3-42.5V112c0-26.5-21.5-48-48-48zM48 112C48 50.2 98.1 0 160 0s112 50.1 112 112V276.5c0 .1 .1 .3 .2 .6c.2 .6 .8 1.6 1.7 2.8c18.9 24.4 30.1 55 30.1 88.1c0 79.5-64.5 144-144 144S16 447.5 16 368c0-33.2 11.2-63.8 30.1-88.1c.9-1.2 1.5-2.2 1.7-2.8c.1-.3 .2-.5 .2-.6V112zM208 368c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3V144c0-8.8 7.2-16 16-16s16 7.2 16 16V322.7c18.6 6.6 32 24.4 32 45.3z" />
    </svg>
  </SVG>
);

let visibility = (
  <SVG>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width={16}>
      <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
    </svg>
  </SVG>
);

let percipitation = (
  <SVG>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={16}>
      <path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z" />
    </svg>
  </SVG>
);

export default function CurrentInfo() {
  let { data } = useData();
  return (
    <div className="current border-2 border-gray-400 rounded-3xl w-full flex flex-col gap-16 h-full large-mobile:gap-0 overflow-hidden">
      <div className="top gap-4 flex flex-col large-mobile:flex-row large-mobile:justify-center">
        <div className="flex text-center text-9xl pt-10 justify-center items-center large-mobile:text-5xl large-mobile:px-4 large-mobile:pt-0">
          <h1>{(data.current?.temp_c || data.current?.maxtemp_c) + "\xB0"}</h1>
        </div>

        <div className="text-center text-5xl flex items-center justify-center large-mobile:text-2xl">
          {data.current.condition.text}
          <img
            src={data.current.condition.icon}
            alt=""
            className="aspect-square"
          />
        </div>
      </div>
      <div className=" grid grid-cols-2 p-6 gap-6 large-mobile:flex large-mobile:overflow-auto">
        <InformationCard
          title={"Feels Like"}
          info={((data.current?.feelslike_c) ? data.current.feelslike_c + "\xB0" : "-")}
          imgSrc={feelsLike}
        />
        <InformationCard
          title={"Percipitation"}
          info={((data.current.precip_in >= 0) ? data.current.precip_in : data.current.totalprecip_in) + " \u2033"}
          imgSrc={percipitation}
        />
        <InformationCard
          title={"Visibility"}
          info={((data.current?.vis_km) ? data.current.vis_km : data.current.avgvis_km) + " km"}
          imgSrc={visibility}
        />
        <InformationCard
          title={"Humidity"}
          info={((data.current?.humidity) ? data.current.humidity : data.current.avghumidity) + " \u0025"}
        />
      </div>
    </div>
  );
}
