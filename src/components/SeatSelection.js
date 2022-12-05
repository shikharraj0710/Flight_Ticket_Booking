import React, { useEffect, useState } from "react";
import { useAppContext } from "../AppContextProvider";

function SeatSelection() {
  const [bookedSeatsState, setBookedSeatsState] = useState([]);
  const handleSeatClick = (e) => {
    const active = "bg-red-600";
    const val = "bg-red-50";
    const seatValue = e.target.textContent;
    const found = selectedSeats.find((seats) => seats === seatValue);
    if (selectedSeats.length < 6 || found) {
      e.target.classList.toggle(active);
      e.target.classList.remove(val);
    }

    if (found) {
      removeSeats(seatValue);
      e.target.classList.remove(active);
      e.target.classList.add(val);
    } else {
      selectedSeats.length < 6 && addSeats(seatValue);
    }
  };

  const { seatArray, addSeats, selectedSeats, removeSeats, homeBookingValues } =
    useAppContext();

  useEffect(() => {
    const localStorageValues = JSON.parse(localStorage.getItem("bookingList"));
    const arr = [];
    const bookedSeats = [];
    if (localStorageValues.length !== 0) {
      arr.push(
        ...localStorageValues.filter(
          (obj) =>
            new Date(obj.date).getTime() ===
            new Date(homeBookingValues.date).getTime()
        )
      );
    }
    arr.forEach((e) => bookedSeats.push(...e.seatsNumber));
    setBookedSeatsState((prev) => [...prev, ...bookedSeats]);
  }, []);

  return (
    <div className="min-w-[60vw] flex flex-col">
      <h1 className="text-xl font-mono text-center mt-4">Select Seats</h1>
      <p className="mx-auto text-xs font-mono uppercase text-gray-900 mt-2 mb-4 font-medium">
        Colored Seats means the seats are booked for the chosen date
      </p>
      <div className="w-full">
        {seatArray.map((seatsRow, index) => {
          return (
            <div className="w-full flex justify-around" key={index}>
              {seatsRow.map((seats, i) =>
                !bookedSeatsState.includes(seats) ? (
                  <div
                    className="rounded-sm w-full cursor-pointer text-center py-2 bg-red-50 border border-orange-400 hover:bg-red-600"
                    onClick={handleSeatClick}
                    key={i}
                  >
                    {seats}
                  </div>
                ) : (
                  <div
                    className="rounded-sm w-full cursor-not-allowed text-center py-2  border border-orange-400 bg-red-600"
                    key={i}
                  >
                    {seats}
                  </div>
                )
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SeatSelection;
