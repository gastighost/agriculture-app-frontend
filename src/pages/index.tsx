import { ChangeEvent, useState, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations } from "../store/locations";
import { AppDispatch, RootState } from "../store/store";

const Home = () => {
  const { locations } = useSelector((store: RootState) => store.locations);
  const dispatch = useDispatch<AppDispatch>();

  const [location, setLocation] = useState<string>("");

  const onLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const onSearch = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(fetchLocations({}));
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-green-700 tracking-wide uppercase">
            Welcome to
          </h2>
          <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Your best farming tool!
          </h1>
          <p className="mt-2 text-lg text-gray-500">
            Start searching locations now!
          </p>
          <div className="mt-6 max-w-lg mx-auto">
            <form className="grid grid-cols-1 gap-6">
              <div className="relative">
                <input
                  className="block w-full py-3 px-4 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 border-gray-300 border-2"
                  type="text"
                  placeholder="Where are you going?"
                  value={location}
                  onChange={onLocationChange}
                />
              </div>
              <div>
                <button
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={onSearch}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Use our new farming tool today!
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              From cozy country homes to funky city apartments, find the perfect
              place to stay for your next trip.
            </p>
          </div>

          <div className="mt-10">
            <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:flex lg:place-content-around">
              <li className="flex flex-col items-center justify-center text-center">
                <div className="flex justify-center items-center h-12 w-12 rounded-md bg-green-600 text-white">
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                    />
                  </svg>
                </div>
                <div className="mt-5 text-lg leading-6 font-medium text-gray-900">
                  Explore farms
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Find find farms from over 190 locations
                </div>
              </li>

              <li className="flex flex-col items-center justify-center text-center">
                <div className="flex justify-center items-center h-12 w-12 rounded-md bg-green-600 text-white">
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-4-2-4 2m4-16v14"
                    />
                  </svg>
                </div>
                <div className="mt-5 text-lg leading-6 font-medium text-gray-900">
                  Book experiences
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Discover unique activities, guided tours, and more experiences
                  to help you explore your destination.
                </div>
              </li>

              <li className="flex flex-col items-center justify-center text-center">
                <div className="flex justify-center items-center h-12 w-12 rounded-md bg-green-600 text-white">
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div className="mt-5 text-lg leading-6 font-medium text-gray-900">
                  Stay anywhere
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Book a listing from a secure platform, so you can feel at ease
                  wherever you go.
                </div>
              </li>

              <li className="flex flex-col items-center justify-center text-center">
                <div className="flex justify-center items-center h-12 w-12 rounded-md bg-green-600 text-white">
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-4-2-4 2m4-16v14"
                    />
                  </svg>
                </div>
                <div className="mt-5 text-lg leading-6 font-medium text-gray-900">
                  Join our community
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Connect with like-minded travelers and hosts, and share your
                  experiences.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
