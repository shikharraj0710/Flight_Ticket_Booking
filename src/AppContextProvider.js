import React, { useContext, useEffect, useState, useMemo } from "react";

const AppContext = React.createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export const AppContextProvider = ({ children }) => {
  const [homePage, setHomePage] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [singleBookingValues, setSingleBookingValues] = useState({});
  const seatArray = useMemo(() => {
    const final = new Array(30);
    for (let i = 0; i < final.length; i++) {
      const arr = new Array(9).fill(0);
      const a2 = [];
      i < 26
        ? a2.push(
            ...arr.map((e, index) => String.fromCharCode(65 + i) + (index + 1))
          )
        : a2.push(
            ...arr.map(
              (e, index) =>
                String.fromCharCode(63 + Math.ceil(final.length / 26)) +
                String.fromCharCode(65 + (i - 26)) +
                (index + 1)
            )
          );
      final[i] = a2;
    }
    return final;
  }, []);

  function settingSingleBookingValues(dateMobile, seats) {
    setSingleBookingValues((prev) => ({
      ...prev,
      ...dateMobile,
      seatsLength: seats.length,
      seatsNumber: [...seats],
      arrived: false
    }));
  }

  function addSeats(seats) {
    setSelectedSeats((prev) => [...prev, seats]);
  }

  function removeSeats(seatPassed) {
    setSelectedSeats((prev) => prev.filter((seat) => seat !== seatPassed));
  }

  const [homeBookingValues, setHomeBookingValues] = useState({
    date: "",
    mobile: "",
  });

  function changeHomeBookingValues(valuesPassed) {
    setHomeBookingValues((prev) => ({ ...prev, ...valuesPassed }));
  }

  function previousClick() {
    setHomePage((prev) => prev - 1);
  }

  function nextPageClick() {
    setHomePage((prev) => prev + 1);
  }

  useEffect(() => {
    !localStorage.getItem("bookingList") &&
      localStorage.setItem("bookingList", JSON.stringify([]));
  }, []);

  return (
    <AppContext.Provider
      value={{
        homePage,
        nextPageClick,
        previousClick,
        setHomePage,
        homeBookingValues,
        changeHomeBookingValues,
        seatArray,
        addSeats,
        removeSeats,
        selectedSeats,
        singleBookingValues,
        settingSingleBookingValues,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
