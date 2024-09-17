import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import PhotosUploader from "../components/PhotosUploader";
import Perks from "../components/Perks";

const AddHotel = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    try {
      if (id) {
        // update
        await axios.put("/places", {
          id,
          ...placeData,
        });
      } else {
        // new place
        await axios.post("/places", placeData);
      }

      // Redirect after successful operation
      navigate("/account/places");
    } catch (error) {
      // Handle error
      console.error("There was an error saving the place:", error);
    }
  }

  // if (redirect) {
  //   return <Navigate to={"/account/places"} />;
  // }

  return (
    <div>
      <AccountNav />
      <div className="w-full">
  <form
    onSubmit={savePlace}
    className="max-w-3xl flex flex-col w-full mx-auto mb-6 bg-white rounded-lg"
  >
    <h2 className="text-2xl mt-4 font-semibold text-gray-800">Title</h2>
    <p className="text-gray-600 text-sm mb-2">
      Title for your place. Should be short and catchy, like an advertisement.
    </p>
    <input
      type="text"
      value={title}
      onChange={(ev) => setTitle(ev.target.value)}
      placeholder="e.g. My lovely apt"
      className="border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
    />

    <h2 className="text-2xl mt-4 font-semibold text-gray-800">Address</h2>
    <p className="text-gray-600 text-sm mb-2">Address of this place</p>
    <input
      type="text"
      value={address}
      onChange={(ev) => setAddress(ev.target.value)}
      placeholder="Address"
      className="border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
    />

    <h2 className="text-2xl mt-4 font-semibold text-gray-800">Photos</h2>
    <p className="text-gray-600 text-sm mb-2">More photos = better</p>
    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} className="mb-4" />

    <h2 className="text-2xl mt-4 font-semibold text-gray-800">Description</h2>
    <p className="text-gray-600 text-sm mb-2">Description of the place</p>
    <textarea
      value={description}
      onChange={(ev) => setDescription(ev.target.value)}
      className="border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary h-32 resize-none"
    />

    <h2 className="text-2xl mt-4 font-semibold text-gray-800">Perks</h2>
    <p className="text-gray-600 text-sm mb-2">Select all the perks of your place</p>
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 ">
      <Perks selected={perks} onChange={setPerks} />
    </div>

    <h2 className="text-2xl mt-4 font-semibold text-gray-800">Extra Info</h2>
    <p className="text-gray-600 text-sm mb-2">House rules, etc.</p>
    <textarea
      value={extraInfo}
      onChange={(ev) => setExtraInfo(ev.target.value)}
      className="border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary h-32 resize-none"
    />

    <h2 className="text-2xl mt-4 font-semibold text-gray-800">Check-in & Check-out Times</h2>
    <p className="text-gray-600 text-sm mb-2">Add check-in and check-out times, with a window for cleaning.</p>
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4 mb-4">
      <div>
        <h3 className="text-gray-700">Check-in Time</h3>
        <input
          type="text"
          value={checkIn}
          onChange={(ev) => setCheckIn(ev.target.value)}
          placeholder="e.g. 14:00"
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <h3 className="text-gray-700">Check-out Time</h3>
        <input
          type="text"
          value={checkOut}
          onChange={(ev) => setCheckOut(ev.target.value)}
          placeholder="e.g. 11:00"
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <h3 className="text-gray-700">Max Guests</h3>
        <input
          type="number"
          value={maxGuests}
          onChange={(ev) => setMaxGuests(ev.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <h3 className="text-gray-700">Price per Night</h3>
        <input
          type="number"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>

    <button className="bg-primary p-3 w-full text-white rounded-full hover:bg-primary-dark transition duration-300 ease-in-out mt-4">
      Save
    </button>
  </form>
</div>

    </div>
  );
};

export default AddHotel;
