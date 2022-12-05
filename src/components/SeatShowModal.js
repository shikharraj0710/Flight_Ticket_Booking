import React from 'react';
import { useAppContext } from "../AppContextProvider";

function SeatShowModal() {

  const { selectedSeats, previousClick , nextPageClick} = useAppContext();

  return (
    <div className="h-fit w-full border my-6 border-slate-100 bg-black rounded-md font-mono tracking-wider z-10 text-white flex flex-col gap-2 py-4 text-center sticky bottom-3 capitalize">
    selected seats : {selectedSeats.length}
    <p className="text-xs">Select atmost 6 seats</p>
    <div className="flex justify-center text-center gap-3">
      {selectedSeats.map((seats, index) => (
        <span key={index}>{seats}</span>
      ))}
    </div>
    <div className="flex justify-around">
      <button className="text-center py-2 px-4 text-mono hover:bg-slate-400 rounded-md border border-white bg-transparent text-white cursor-pointer" onClick={() => previousClick()}>Previous</button>
      <button className={selectedSeats.length > 0 ? "text-center py-2 px-4 text-mono hover:bg-slate-400 rounded-md border border-white bg-transparent text-white cursor-pointer" : "text-center py-2 px-4 text-mono  rounded-md border border-white bg-transparent text-white cursor-not-allowed" } onClick={() => nextPageClick()}>Confirm</button>
    </div>
  </div>
  )
}

export default SeatShowModal