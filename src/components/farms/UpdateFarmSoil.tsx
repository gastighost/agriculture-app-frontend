import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import Modal from "react-modal";

import api from "../../common/api";
import { AppDispatch } from "../../store/store";
import { fetchFarm } from "../../store/farms";

interface UpdateFarmSoilProps {
  farmId: string;
  soilUpdateModal: boolean;
  setSoilUpdateModal: (arg: boolean) => void;
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

const UpdateFarmSoil = (props: UpdateFarmSoilProps) => {
  const { farmId, soilUpdateModal, setSoilUpdateModal } = props;

  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    date: "",
    pH: "",
    moisture: "",
    fertility: "",
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
      await api.updateFarmSoil(farmId, {
        ...formData,
        pH: Number(formData.pH),
        moisture: Number(formData.moisture),
        fertility: Number(formData.fertility),
      });

      dispatch(fetchFarm(farmId));

      toast.success("Farm soil successfully updated!");

      setSoilUpdateModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update farm soil");
    }
  };

  return (
    <Modal
      isOpen={soilUpdateModal}
      onRequestClose={() => {
        setSoilUpdateModal(false);
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
            Add soil record
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
                  htmlFor="pH"
                  className="block text-sm font-medium text-gray-700"
                >
                  pH level
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="pH"
                    id="pH"
                    value={formData.pH}
                    onChange={handleChange}
                    required
                    className="py-2 px-3 rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="moisture"
                  className="block text-sm font-medium text-gray-700"
                >
                  Moisture (%)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="moisture"
                    id="moisture"
                    value={formData.moisture}
                    onChange={handleChange}
                    required
                    className="py-2 px-3 rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-indigo-500focus:border-indigo-500 block w-full sm:text-sm border"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="fertility"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fertility (%)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="fertility"
                    id="fertility"
                    value={formData.fertility}
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
                  Add soil record
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateFarmSoil;
