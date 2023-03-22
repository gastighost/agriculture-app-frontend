import Head from "next/head";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Soil, Weather } from "../../store/farms";
import { RootState } from "../../store/store";
import CreateCropForm from "../crops/CreateCropForm";
import FarmCropCard from "../crops/FarmCropCard";
import UpdateFarmSoil from "./UpdateFarmSoil";
import UpdateFarmWeather from "./UpdateFarmWeather";

const FarmDetails = () => {
  const { farm } = useSelector((store: RootState) => store.farms);
  const { crops } = useSelector((store: RootState) => store.crops);

  const [weatherDesc, setWeatherDesc] = useState<boolean>(true);
  const [weather, setWeather] = useState<Weather[]>([]);

  const [soilDesc, setSoilDesc] = useState<boolean>(true);
  const [soil, setSoil] = useState<Soil[]>([]);

  const [weatherUpdateModal, setWeatherUpdateModal] = useState<boolean>(false);
  const [soilUpdateModal, setSoilUpdateModal] = useState<boolean>(false);

  const [createCropModal, setCreateCropModal] = useState<boolean>(false);

  const convertDateToUs = (date: string) => {
    return new Date(date).toLocaleString("en-US");
  };

  useEffect(() => {
    if (farm?.weather) {
      const newWeather = [...farm?.weather];

      if (weatherDesc) {
        setWeather(
          newWeather.sort((a, b) => {
            if (new Date(a.date) < new Date(b.date)) {
              return 1;
            } else {
              return -1;
            }
          })
        );
      } else {
        setWeather(
          newWeather.sort((a, b) => {
            if (new Date(a.date) < new Date(b.date)) {
              return -1;
            } else {
              return 1;
            }
          })
        );
      }
    }
  }, [weatherDesc, farm?.weather]);

  useEffect(() => {
    if (farm?.soil) {
      const newSoil = [...farm?.soil];

      if (soilDesc) {
        setSoil(
          newSoil.sort((a, b) => {
            if (new Date(a.date) < new Date(b.date)) {
              return 1;
            } else {
              return -1;
            }
          })
        );
      } else {
        setSoil(
          newSoil.sort((a, b) => {
            if (new Date(a.date) < new Date(b.date)) {
              return -1;
            } else {
              return 1;
            }
          })
        );
      }
    }
  }, [soilDesc, farm?.soil]);

  if (!farm) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex items-center justify-center space-x-2 text-green-700">
          <svg
            className="animate-spin h-5 w-5 mr-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20a8 8 0 01-8-8H0c0 6.627 5.373 12 12 12v-4zm0-16a8 8 0 018 8h4a12.015 12.015 0 00-3-8.938A7.962 7.962 0 0112 4z"
            ></path>
          </svg>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{farm.name} - Farm Details</title>
      </Head>

      <div className="flex flex-col items-center">
        <div className="justify-self-start w-2/3 mt-4">
          <Link href={`/locations/${farm.locationId}`}>
            <button className="rounded bg-green-600 hover:bg-green-700 px-3 py-1 text-white text-sm">
              Back
            </button>
          </Link>
        </div>
        <h1 className="text-4xl font-bold mt-8 mb-2">{farm.name}</h1>
        <p className="text-lg text-gray-600 mb-8">{farm.areaSize} sqm.</p>

        <div className="w-full md:w-2/3 mb-8">
          <h2 className="text-2xl font-bold mb-4">Weather</h2>
          <div className="flex justify-between">
            <button
              onClick={() => setWeatherDesc((prevState) => !prevState)}
              className="rounded bg-blue-500 px-3 py-1 text-white text-sm"
            >
              Sort {weatherDesc ? "Ascending" : "Descending"}
            </button>

            <button
              onClick={() => setWeatherUpdateModal(true)}
              className="rounded bg-blue-500 hover:bg-blue-600 px-3 py-1 text-white text-sm"
            >
              Add weather record
            </button>
          </div>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Temperature</th>
                <th className="px-4 py-2 text-left">Humidity</th>
                <th className="px-4 py-2 text-left">Rainfall</th>
              </tr>
            </thead>
            <tbody>
              {weather.map((data, index) => {
                return (
                  <tr key={index}>
                    <td className="border px-4 py-2">
                      {convertDateToUs(data.date)}
                    </td>
                    <td className="border px-4 py-2">
                      {data.temperature} &deg;C
                    </td>
                    <td className="border px-4 py-2">{data.humidity} %</td>
                    <td className="border px-4 py-2">{data.rainfall} cm.</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="w-full md:w-2/3 mb-8">
          <h2 className="text-2xl font-bold mb-4">Soil</h2>
          <div className="flex justify-between">
            <button
              onClick={() => setSoilDesc((prevState) => !prevState)}
              className="rounded bg-amber-800 px-3 py-1 text-white text-sm"
            >
              Sort {soilDesc ? "Ascending" : "Descending"}
            </button>
            <button
              onClick={() => setSoilUpdateModal(true)}
              className="rounded bg-amber-800 hover:bg-amber-900 px-3 py-1 text-white text-sm"
            >
              Add soil record
            </button>
          </div>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">pH</th>
                <th className="px-4 py-2 text-left">Moisture</th>
                <th className="px-4 py-2 text-left">Fertility</th>
              </tr>
            </thead>
            <tbody>
              {soil.map((data, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    {convertDateToUs(data.date)}
                  </td>
                  <td className="border px-4 py-2">{data.pH}</td>
                  <td className="border px-4 py-2">{data.moisture} %</td>
                  <td className="border px-4 py-2">{data.fertility} %</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="justify-self-start w-2/3 mt-4">
          <h2 className="text-2xl font-bold mb-4">Crops</h2>
          <div>
            <button
              className="rounded bg-green-600 hover:bg-green-700 px-3 py-1 text-white text-sm"
              onClick={() => setCreateCropModal(true)}
            >
              Create Crop
            </button>
          </div>

          <div className="flex flex-wrap">
            {crops.map((crop) => (
              <FarmCropCard key={crop.id} crop={crop} />
            ))}
          </div>
        </div>
      </div>
      <UpdateFarmWeather
        farmId={farm.id}
        weatherUpdateModal={weatherUpdateModal}
        setWeatherUpdateModal={setWeatherUpdateModal}
      />
      <UpdateFarmSoil
        farmId={farm.id}
        soilUpdateModal={soilUpdateModal}
        setSoilUpdateModal={setSoilUpdateModal}
      />
      <CreateCropForm
        farmId={farm.id}
        isOpen={createCropModal}
        onClose={setCreateCropModal}
      />
    </Fragment>
  );
};

export default FarmDetails;
