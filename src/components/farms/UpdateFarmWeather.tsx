import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import Modal from "react-modal";

import api from "../../common/api";
import { AppDispatch } from "../../store/store";
import { fetchFarm } from "../../store/farms";

interface UpdateFarmWeatherProps {
  farmId: string;
  weatherUpdateModal: boolean;
  setWeatherUpdateModal: (arg: boolean) => void;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#f5f5f5",
    borderRadius: "0.5rem",
    padding: "2rem",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: "1000",
  },
};

const UpdateFarmWeather = (props: UpdateFarmWeatherProps) => {
  const { farmId, weatherUpdateModal, setWeatherUpdateModal } = props;

  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    date: "",
    temperature: "",
    humidity: "",
    rainfall: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.updateFarmWeather(farmId, {
        ...formData,
        temperature: Number(formData.temperature),
        humidity: Number(formData.humidity),
        rainfall: Number(formData.rainfall),
      });

      dispatch(fetchFarm(farmId));

      toast.success("Farm weather successfully updated!");

      setWeatherUpdateModal(false);
    } catch (error) {
      toast.error("Failed to update farm weather");
    }
  };

  return (
    <Modal
      isOpen={weatherUpdateModal}
      onRequestClose={() => {
        setWeatherUpdateModal(false);
      }}
      style={customStyles}
      ariaHideApp={false}
    >
      <div>
        <div className="mt-3 text-center sm:mt-5">
          <h3
            className="text-lg leading-6 font-medium text-gray-900"
            id="modal-headline"
          >
            Add weather record
          </h3>
          <div className="mt-2">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <div className="mt-1">
                  <input
                    type="datetime-local"
                    name="date"
                    id="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="py-2 px-3 rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="temperature"
                  className="block text-sm font-medium text-gray-700"
                >
                  Temperature (in celsius)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="temperature"
                    id="temperature"
                    value={formData.temperature}
                    onChange={handleChange}
                    required
                    className="py-2 px-3 rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="humidity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Humidity (%)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="humidity"
                    id="humidity"
                    value={formData.humidity}
                    onChange={handleChange}
                    required
                    className="py-2 px-3 rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-indigo-500focus:border-indigo-500 block w-full sm:text-sm border"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="rainfall"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rainfall (cm)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="rainfall"
                    id="rainfall"
                    value={formData.rainfall}
                    onChange={handleChange}
                    required
                    className="py-2 px-3 rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border"
                  />
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="submit"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                >
                  Add weather
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateFarmWeather;
