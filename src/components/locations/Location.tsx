import Image from "next/image";

interface LocationProps {
  currentLocation: any;
}

const Location = ({ currentLocation }: LocationProps) => {
  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-medium">{currentLocation.name}</h1>
        <div className="flex items-center space-x-4">
          <button className="bg-gray-100 px-4 py-2 rounded-lg text-gray-800 font-medium">
            Edit
          </button>
          <button className="bg-red-500 px-4 py-2 rounded-lg text-white font-medium">
            Delete
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6">
        <div>
          <Image
            src="/farm-stock-photo.jpeg"
            alt="farm-photo"
            width={400}
            height={300}
            className="rounded-lg"
            style={{ width: "100%", height: "auto" }}
            priority
          />
        </div>
        <div>
          <h2 className="text-xl font-medium mb-2">Location details</h2>
          <p className="text-gray-700 mb-2">
            <span className="font-medium">Region:</span>{" "}
            {currentLocation.region}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-medium">Country:</span>{" "}
            {currentLocation.country}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-medium">Latitude:</span>{" "}
            {currentLocation.latitude}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-medium">Longitude:</span>{" "}
            {currentLocation.longitude}
          </p>
        </div>
      </div>

      {/* <div className="mt-12">
        <h2 className="text-xl font-medium mb-2">
          Farms in {currentLocation.name}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {farms.map((farm) => (
            <div key={farm.id} className="bg-white rounded-lg shadow-md p-4">
              <Image
                src="/farm-image.jpg"
                alt={farm.name}
                width={200}
                height={150}
                className="rounded-lg"
              />
              <h3 className="text-lg font-medium my-2">{farm.name}</h3>
              <p className="text-gray-700">
                <span className="font-medium">Region:</span> {farm.region}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Country:</span> {farm.country}
              </p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Location;
