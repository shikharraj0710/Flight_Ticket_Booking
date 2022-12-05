import React, { useState } from "react";
import { useAppContext } from "../AppContextProvider";

function getMinDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; 
    let yyyy = today.getFullYear();
    
    if (dd < 10) {
       dd = '0' + dd;
    }
    
    if (mm < 10) {
       mm = '0' + mm;
    } 
        
    today = yyyy + '-' + mm + '-' + dd;
    return today
}

function StepOne() {

    const { changeHomeBookingValues, nextPageClick, homeBookingValues } = useAppContext();
  
    const [values, setValues] = useState(() => ({...homeBookingValues}));


    const handleInput = (e) => {
        setValues(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    function handleSubmit(e) {
        e.preventDefault();
        changeHomeBookingValues(values);
        nextPageClick()
    }

  return (
    <form autoComplete="off" onSubmit={handleSubmit} className="">
      <div className="flex flex-col text-lg gap-2 mb-3">
        <label htmlFor="date" className="pl-1">
          Date
        </label>
        <input
          type="date"
          placeholder="date"
          name="date"
          id="date"
          min={getMinDate()}
          defaultValue={values?.date}
          onChange={handleInput}
          title="Date should be atmost 1 month from now."
          required
          className="active:bg-slate-200 tracking-wider outline-none hover:bg-slate-100  focus:bg-slate-200 cursor-pointer border-2 p-2 rounded-md bg-white uppercase text-sm  invalid:border-red-500 valid:border-green-500"
        />
      </div>
      <div className="flex flex-col text-lg gap-2 mb-3">
        <label htmlFor="mobile" className="pl-1">
          Phone Number
        </label>
        <input
          type="tel"
          placeholder="phone number"
          name="mobile"
          id="mobile"
          minLength="10"
          defaultValue={values?.mobile}
          onChange={handleInput}
          title="Phone Number must be atleast 10 digits"
          maxLength="13"
          required
          className="active:bg-slate-200 tracking-wider outline-none hover:bg-slate-100  focus:bg-slate-200 cursor-pointer border-2 p-2 rounded-md bg-white uppercase text-sm invalid:border-red-500 valid:border-green-500"
        />
      </div>
      <input
        type="submit"
        value="next"
        disabled={(!values.date || values?.mobile.length < 10) }
        className={(!values.date || values?.mobile.length < 10) ? "py-2 flex items-center justify-center rounded-sm mt-6 mb-3 border border-black capitalize cursor-not-allowed font-mono   w-full" : "py-2 flex items-center justify-center rounded-sm mt-6 mb-3 border border-black capitalize font-mono   w-full hover:bg-gray-900 hover:text-white  cursor-pointer  " }
      />
    </form>
  );
}

export default StepOne;
