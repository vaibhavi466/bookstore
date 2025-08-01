import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../common/Loader"; // Make sure this Loader component exists

const Settings = () => {
  const [value, setValue] = useState({ address: "" });
  const [profileData, setProfileData] = useState(null); // default null for conditional rendering

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value: newValue } = e.target;
    setValue((prev) => ({ ...prev, [name]: newValue }));
  };

   
   useEffect(() => {
    const fetch = async () => {
     try {
       const response = await axios.get(
         "http://localhost:1000/api/v1/get-user-information",
          { headers }
       );
       setProfileData(response.data);
       setValue({ address: response.data.address });
     } catch (error) {
       console.error("Error fetching user data:", error);
     }
    };
    fetch();
   }, []);

   const submitAddress = async () => {
     const response = await axios.put("http://localhost:1000/api/v1/update-address", value, { headers });
    alert(response.data.message);
   };
  

 
  return (
    <>
      {!profileData ? (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="h-[100%] p-4 text-zinc-100 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Settings
          </h1>

          <div className="flex flex-col md:flex-row gap-4 md:gap-12">
            <div className="w-full md:w-1/2">
              <label htmlFor="username">Username</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.username}
              </p>
            </div>

            <div className="w-full md:w-1/2">
              <label htmlFor="email">Email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.email}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col">
            <label htmlFor="address">Address</label>
            <input
              className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
              placeholder="Address"
              name="address"
              value={value.address}
              onChange={change}
              readOnly // Set to false if you want it to be editable
            />
          </div>

          <div className="mt-6 flex justify-end">
            <button
              className="bg-yellow-500 text-zinc-900 font-semibold px-4 py-2 rounded hover:bg-yellow-400 transition-all duration-300"
              onClick={submitAddress}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;


