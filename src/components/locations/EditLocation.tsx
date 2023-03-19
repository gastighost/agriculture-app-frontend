import { useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Modal from "react-modal";

import api from "../../common/api";
import { AppDispatch, RootState } from "../../store/store";
import { fetchLocation } from "../../store/locations";

interface EditLocationProps {
  editLocationModal: boolean;
  setEditLocationModal: (arg: any) => void;
}

const EditLocation = (props: EditLocationProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { location } = useSelector((store: RootState) => store.locations);

  const { editLocationModal, setEditLocationModal } = props;

  const [name, setName] = useState(location?.name || "");
  const [region, setRegion] = useState(location?.region || "");
  const [country, setCountry] = useState(location?.country || "");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!location) {
        toast.error("Please refresh page");
        return;
      }

      setSubmitting(true);

      await api.editLocation(location.id, { name, region, country });

      toast.success("Successfully updated location!");

      dispatch(fetchLocation(location.id));

      setEditLocationModal(false);
    } catch (error: any) {
      toast.error(error.data.message || "Failed to update location");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={editLocationModal}
      onRequestClose={() => setEditLocationModal(false)}
      style={{
        content: {
          width: "50%",
          height: "60%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "none",
        },
      }}
      ariaHideApp={false}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-6">Edit Location</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="form-input w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="region"
            >
              Region
            </label>
            <input
              className="form-input w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              id="region"
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="country"
            >
              Country
            </label>
            <input
              className="form-input w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              id="country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg ${
                submitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditLocation;
