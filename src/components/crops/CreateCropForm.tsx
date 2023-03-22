import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "react-modal";
import { useDispatch } from "react-redux";

import api from "../../common/api";
import { fetchCrops } from "../../store/crops";
import { AppDispatch } from "../../store/store";

interface CreateCropFormProps {
  farmId: string;
  isOpen: boolean;
  onClose: (arg: boolean) => void;
}

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: "1000",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "600px",
    width: "100%",
    padding: "2rem",
  },
};

const CreateCropForm = ({ farmId, isOpen, onClose }: CreateCropFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    name: "",
    plantingDate: "",
    harvestDate: "",
    status: "growing",
    area: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prevState) => {
      const { name, value } = e.target;

      return { ...prevState, [name]: value };
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.createCrop(farmId, {
        ...formData,
        plantingDate: new Date(formData.plantingDate).toISOString(),
        harvestDate: new Date(formData.harvestDate).toISOString(),
        area: Number(formData.area),
      });

      toast.success("Crop successfully created!");

      setFormData({
        name: "",
        plantingDate: "",
        harvestDate: "",
        status: "growing",
        area: "",
      });

      onClose(false);

      dispatch(fetchCrops({ farmId }));
    } catch (error) {
      toast.error("Failed ");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onClose(false)}
      style={customStyles}
      ariaHideApp={false}
    >
      <form className="max-w-lg mx-auto" onSubmit={onSubmit}>
        <h2 className="text-2xl font-semibold mb-4">Create a Crop</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Grapes"
            value={formData.name}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="plantingDate"
          >
            Planting Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="plantingDate"
            name="plantingDate"
            type="datetime-local"
            placeholder="2023-03-12T06:59:17.218Z"
            value={formData.plantingDate}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="harvestDate"
          >
            Harvest Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="harvestDate"
            name="harvestDate"
            type="datetime-local"
            placeholder="2023-04-12T06:59:17.218Z"
            value={formData.harvestDate}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="status"
          >
            Status
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="status"
            name="status"
            value={formData.status}
            onChange={onChange}
            required
          >
            <option value="growing">Growing</option>
            <option value="harvesting">Harvesting</option>
            <option value="harvested">Harvested</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="area">
            Area
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="area"
            name="area"
            type="number"
            placeholder="120"
            value={formData.area}
            onChange={onChange}
            required
          />
        </div>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Save
        </button>
      </form>
    </Modal>
  );
};

export default CreateCropForm;
