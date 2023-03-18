import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import api from "../../common/api";
import { fetchFarms } from "../../store/farms";
import { AppDispatch } from "../../store/store";

interface CreateFarmFormProps {
  isOpen: boolean;
  onClose: () => void;
  locationId: string;
}

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
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

const CreateFarmForm = ({
  isOpen,
  onClose,
  locationId,
}: CreateFarmFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    name: "",
    areaSize: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.createFarm(locationId, {
        ...formData,
        areaSize: Number(formData.areaSize),
      });

      dispatch(fetchFarms({ locationId }));

      toast.success("Farm successfully created!");

      onClose();
    } catch (error) {
      toast.error("Failed to create farm");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      ariaHideApp={false}
    >
      <h2 className="text-2xl font-semibold mb-4">Create a Farm</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Farm Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="areaSize"
          >
            Area Size (in square meters)
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="areaSize"
            name="areaSize"
            type="number"
            placeholder="Area Size"
            value={formData.areaSize}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-800 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Farm
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateFarmForm;
