import React, { useState, useContext, createContext } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [mobile, setMobile] = useState(window.innerWidth < 1000);
  const [arraySize, setArraySize] = useState(200);
  const [playButton, setPlayButton] = useState(true);
  const [startArray, setStartArray] = useState(randomArray(200));
  const [algo, setAlgo] = useState("bubble");

  return (
    <AppContext.Provider
      value={{
        mobile,
        setMobile,
        arraySize,
        setArraySize,
        playButton,
        setPlayButton,
        startArray,
        setStartArray,
        algo,
        setAlgo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const randomArray = (len) => {
  let tmp = [];

  for (let i = 0; i < len; i++) {
    tmp.push(Math.random());
  }

  return tmp;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
