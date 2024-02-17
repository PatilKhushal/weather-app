import React, { useEffect, useRef } from "react";
import Layout from "./components/Layout";
import ForecastCard from "./components/ForecastCardContainer";
import HourCard from "./components/HourCard";
import Nav from "./Nav";
import { getData } from "./fetchData";
import Loading from "./components/Loading";
import { useData } from "./context/data";
import Alert from "./components/alert";
import SVG from "./components/SVG";

let clock = (
  <SVG>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={16}>
      <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
    </svg>
  </SVG>
);

let calendar = (
  <SVG>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={16}>
      <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z" />
    </svg>
  </SVG>
);

let week = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

function App() {
  let { data, setData, alertMessage, hidden, day, setDay, cityData } =
    useData();
  useEffect(() => {
    let currCity = "Dhule";
    navigator.geolocation.getCurrentPosition((response) => {
      let latitude = response.coords.latitude;
      let longitude = response.coords.longitude;
      currCity = latitude + "," + longitude;
      getData(currCity)
        .then((result) => {
          setData(result);
          cityData.current = result;
        })
        .catch((error) => {});
    }, () => {
      getData(currCity)
        .then((result) => {
          setData(result);
          cityData.current = result;
        })
        .catch((error) => {});
    });
  }, []);

  if (!data) return <Loading />;
  let hrs = new Date().getHours();

  return (
    <Layout>
      <div className="p-8 w-full flex justify-between gap-4 m-auto backdrop-blur-sm min-h-dvh tablet:flex-col large-mobile:p-2 large-mobile:justify-center">
        <Alert message={alertMessage} hidden={hidden} />
        <Nav />
        <div className="right w-[60%] max-h-dvh flex flex-col gap-4 px-2 mid-desktop:w-1/2 tablet:w-full large-mobile:p-0">
          <ForecastCard title={"Hourly Forecast"} imgSrc={clock}>
            {data &&
              data.forecast.forecastday[day].hour.map((element) => {
                let key = Math.random();
                let time = element.time.split(" ")[1];
                let flag = new Date(element.time).toLocaleDateString() == new Date().toLocaleDateString();
                
                if(flag)
                {
                  if (Number.parseInt(time) >= hrs)
                  return (
                    <HourCard
                      title={element.condition.text}
                      temperature={element.temp_c}
                      imgSrc={element.condition.icon}
                      time={Number.parseInt(time) == hrs ? "Now" : time}
                      key={key}
                    />
                  );
                }
                else  
                  return (
                    <HourCard
                      title={element.condition.text}
                      temperature={element.temp_c}
                      imgSrc={element.condition.icon}
                      time={time}
                      key={key}
                    />
                  );
              })}
          </ForecastCard>
          <ForecastCard title={"3-days Forecast"} imgSrc={calendar}>
            {data &&
              data.forecast.forecastday.map((element, index) => {
                let key = Math.random();
                let dayN = week[new Date(element.date).getDay()];
                return (
                  <HourCard
                    title={element.date.split(" ")[0].substr(5)}
                    temperature={element.day.maxtemp_c}
                    imgSrc={element.day.condition.icon}
                    time={dayN}
                    key={key}
                    onclick={() => {
                      if (dayN != week[new Date().getDay()]) {
                        setData({ ...data, current: element.day });
                        setDay(index);
                      } else {
                        setData(cityData.current);
                        setDay(0);
                      }
                    }}
                    className = {
                      element.date.split(" ")[0] == data.forecast.forecastday[day].date ? "bg-opacity-100 bg-[#1A8FE3]" : "bg-[#1A8FE3] bg-opacity-30"
                    }
                  />
                );
              })}
          </ForecastCard>
        </div>
      </div>
    </Layout>
  );
}

export default App;
