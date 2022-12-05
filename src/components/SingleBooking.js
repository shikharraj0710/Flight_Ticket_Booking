import React, { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../AppContextProvider";
import { useNavigate } from "react-router-dom";

function SingleBooking() {
  const history = useNavigate();
  const id = useMemo(() => {
    const localStorageValue = JSON.parse(localStorage.getItem("bookingList"));
    return localStorageValue.length + 1
  });
  const {
    singleBookingValues,
    homeBookingValues,
    selectedSeats,
    settingSingleBookingValues,
    setHomePage,
  } = useAppContext();

  useEffect(() => {
    settingSingleBookingValues(homeBookingValues, selectedSeats);
  }, []);

  useEffect(() => {
    if(Object.keys(singleBookingValues).length) {
       const localStorageValue = JSON.parse(localStorage.getItem("bookingList"));
       localStorageValue.push({...singleBookingValues, id, bookingId: id*111, arrived: false});
       localStorage.setItem("bookingList", JSON.stringify(localStorageValue));
    }
  }, [singleBookingValues])

  return (
    <div className="min-w-[60vw] flex flex-col">
      <h1 className="text-xl font-mono text-center mb-4 uppercase">
        seats details
      </h1>
      <table className="border border-slate-600">
        <thead>
          <tr>
            <th>Date</th>
            <th>Phone Number</th>
            <th>No. of Seats</th>
            <th>Seat(s) Number</th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr>
            <td>
              {new Date(singleBookingValues.date).toLocaleDateString("en-IN", {
                day: "numeric",
                weekday: "long",
                year: "2-digit",
                month: "long",
              })}
            </td>
            <td>{singleBookingValues.mobile}</td>
            <td>{singleBookingValues?.seatsLength}</td>
            <td>{singleBookingValues?.seatsNumber?.join(" ")}</td>
          </tr>
        </tbody>
      </table>
      <button
        className="text-center py-2 px-4 w-fit mx-auto mt-4 text-mono hover:bg-slate-400 rounded-md border border-white bg-black text-base text-white cursor-pointer"
        onClick={() => {
          history("/details");
          setHomePage(1);
        }}
      >
        OK
      </button>
    </div>
  );
}

export default SingleBooking;
