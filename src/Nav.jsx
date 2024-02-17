import React, { useEffect, useRef } from "react";
import InformationCard from "./components/InformationCard";
import { getData, searchCity } from "./fetchData";
import { useData } from "./context/data";
import CurrentInfo from "./components/CurrentInfo";

const searchIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={16}>
    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
  </svg>
);

export default function Nav() {
  let { data, setData, setAlertMessage, hidden, setHidden, cityData } = useData();
  let cityRef = useRef(null);

  function handleChangeCity(e) {
    if(e.key != "Enter")
      return;

      let city = cityRef.current.value;
      if (city)
        searchCity(city)
          .then((result) => {
            let newcity = "Pune";
            if (result.length) newcity = result[0].name;
            else
            {
              setAlertMessage(`No such city as ${city}\nShowing results for city Pune`);
              setHidden(false);
            }
              getData(newcity).then((result) => {
                setData(result);
                cityData.current = result;
                
              });
          })
          .catch((error) => {
            alert(error);
          });

          cityRef.current.value = "";
  }

  return (
    <div className="left w-[30%] mid-desktop:w-[45%] flex gap-8 flex-col h-full tablet:w-full">
      <div className="flex border-2 border-gray-400 w-full rounded-full bg-white bg-opacity-15 items-center py-2 px-4">
        <input
          ref={cityRef}
          type="text"
          className="w-full border-none outline-none bg-transparent"
          placeholder={'City :\t' + data.location.name}
          onKeyDown={handleChangeCity}
        />
      </div>
      <CurrentInfo/>
    </div>
  );
}
