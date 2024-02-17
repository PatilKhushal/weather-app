const key = "316eb9bf8b0e45b385d111956241601";
export async function getData(city) {

  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=10&aqi=no&alerts=no`
  );
  let result = await response.json();

  return result;
}

export async function searchCity(city)
{
    let response = await fetch(`http://api.weatherapi.com/v1/search.json?key=${key}&q=${city}`);
    let result = await response.json();
    return result;
}