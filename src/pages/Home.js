import { useAppContext } from "../AppContextProvider";
import SeatSelection from "../components/SeatSelection";
import SeatShowModal from "../components/SeatShowModal";
import SingleBooking from "../components/SingleBooking";
import StepOne from "../components/StepOne";

export const Home = () => {
  const { homePage } = useAppContext();
  return (
    <div className="flex justify-center items-center flex-col min-h-full bg-gray-50">
      <h1 className="text-4xl font-mono mt-4">Flight Booking</h1>
      <p className="mx-auto text-base font-mono uppercase text-gray-900 my-4 font-semibold tracking-wider">
        Mumbai to hyderabad @ 8 PM
      </p>

      <div className="border border-b-2 my-4 p-4 rounded-md shadow-md min-w-[20%] relative">
        {homePage === 1 && <StepOne />}
        {homePage === 2 && (
          <>
            <SeatSelection />
            <SeatShowModal />
          </>
        )}
        {homePage === 3 && <SingleBooking />}
      </div>
    </div>
  );
};
