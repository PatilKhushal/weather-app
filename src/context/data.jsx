import React, { createContext, useContext, useRef, useState } from 'react'

export const DataContext = createContext(null);

export const useData = () => {
    let data = useContext(DataContext);
    return data;
}

export let DataProvider = ({children}) => {
    const [data, setData] = useState(null);
    const [alertMessage, setAlertMessage] = useState("sfhh");
    const [hidden, setHidden] = useState(true);
    const [day, setDay] = useState(0);
    let cityData = useRef(null);
    return (
      <DataContext.Provider value={{data, setData, alertMessage, setAlertMessage, hidden, setHidden, day, setDay, cityData}}>
        {children}
      </DataContext.Provider>  
    );
}