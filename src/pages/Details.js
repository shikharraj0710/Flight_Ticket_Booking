import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Details = () => {
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    return JSON.parse(localStorage.getItem("bookingList"));
  });

  const history = useNavigate();

  function selectClick(e) {
    const val = e.target.value;
    if (val === "default") {
      setLocalStorageValue(() => {
        return JSON.parse(localStorage.getItem("bookingList"));
      });
    } else if (val === "no_blocking") {
      setLocalStorageValue((prev) => [
        ...prev.sort(
          (a, b) =>
            new Date(a.date).getTime() - new Date(b.date).getTime() ||
            a.seatsLength - b.seatsLength
        ),
      ]);
    }
  }

  function handleArrivedClick(e, id) {
    const text = "Confirm the Arrival!!!";
    if(e.target.checked && window.confirm(text)) {
         const localStorageValue = JSON.parse(localStorage.getItem("bookingList"));
         const reqObj = localStorageValue.find(e => e.id === id);
         reqObj.arrived = true;
         const arr = localStorageValue.filter(e => e.id !== id);
         const newLocalStorageValue = [...arr, reqObj];
         localStorage.setItem("bookingList", JSON.stringify(newLocalStorageValue));

    }
   
  }

  return (
    <div className="flex w-full min-h-[100vh] items-center flex-col bg-gray-300">
      <h1 className="text-4xl font-mono mt-16 mb-8">Flight Booking</h1>
      <div className="w-full  items-center flex flex-col">
        <div className="flex items-center gap-3 justify-center">
          <h1 className="text-xl font-mono text-center  uppercase">
            booking details
          </h1>
          {localStorageValue?.length &&
          <span  className=" font-mono px-3 mx-auto bg-gray-800 text-white rounded-md">
            <select
              defaultValue={"default"}
              className="bg-gray-800 outline-none uppercase tracking-wider text-[12px]"
              onChange={selectClick}
            >
              <option value="default" name="default">
                Default
              </option>
              <option value="no_blocking" name="no_blocking">
                no blocking
              </option>
            </select>
          </span>
}
        </div>
        <p className="mx-auto text-xs font-mono uppercase text-gray-900 my-4 font-medium">
          In No blocking, it is sorted by date first and then number of seats
        </p>
        <table className="border border-slate-400 font-mono tracking-wider w-4/5 mb-10">
        {localStorageValue?.length ?
        <>
          <thead className="text-sm text-white font-medium px-6 py-4 whitespace-nowrap">
            <tr className="border-b bg-gray-800 boder-gray-900 uppercase">
              <th>id</th>
              <th>booking id</th>
              <th>Date</th>
              <th>Call</th>
              <th>Phone Number</th>
              <th>No. of Seats</th>
              <th>Seat(s) Number</th>
              <th>arrived</th>
            </tr>
          </thead>
          
          <tbody className="text-center">
            {localStorageValue.map((obj) => (
              <tr className="border-b bg-gray-800 ">
                <td className="text-sm text-white font-medium px-6 py-4 whitespace-nowrap">
                  {obj?.id}
                </td>
                <td className="text-sm text-white font-medium px-6 py-4 whitespace-nowrap">
                  {obj?.bookingId}
                </td>
                <td className="text-sm text-white font-medium px-6 py-4 whitespace-nowrap">
                  {new Date(obj.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    weekday: "long",
                    year: "2-digit",
                    month: "long",
                  })}
                </td>
                <td className="text-sm text-white font-medium px-6 py-4 whitespace-nowrap ">
                  <a href={"tel:" + obj?.mobile}>
                    <img
                      className="w-6 h-6 cursor-pointer hover:scale-150"
                      src="https://i.pinimg.com/originals/84/4e/8c/844e8cd4ab26c82286238471f0e5a901.png"
                      alt="Call?"
                    />
                  </a>
                </td>
                <td className="text-sm text-white font-medium px-6 py-4 whitespace-nowrap">
                  {obj?.mobile}
                </td>
                <td className="text-sm text-white font-medium px-6 py-4 whitespace-nowrap">
                  {obj?.seatsLength}
                </td>
                <td className="text-sm text-white font-medium px-6 py-4 whitespace-nowrap">
                  {[...obj?.seatsNumber].join(" ")}
                </td>
                <td >
                    <input type="checkbox" onClick={(e) => handleArrivedClick(e, obj?.id)} defaultChecked={obj?.arrived} className={obj?.arrived && "cursor-not-allowed"}/>
                </td>
              </tr>
            ))}
          </tbody>
          </>
          :
          <p className="mx-auto text-center font-bold w-full text-lg font-mono uppercase text-gray-900 my-4">
          No Bookings Yet
        </p>
          }
        </table>
        <button
          className="text-center py-2 uppercase font-mono px-4 text-base tracking-wider hover:bg-gray-200 rounded-md border border-white bg-black hover:text-black hover:border-black font-medium text-white cursor-pointer mb-16"
          onClick={() => history("/")}
        >
          back to home
        </button>
      </div>
    </div>
  );
};
