import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Profile/Sidebar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loader from '../components/common/Loader';

const Profile = () => {
  const [profile, setProfile] = useState(null); // ✅ lowercase to avoid conflict
<<<<<<< HEAD

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {

    // ye dummy data hai , kaam ho jane k baad delete kr dena :
    const fetchProfile = async () => {
    try {
      const mockData = {
        avatar: "https://i.pravatar.cc/150?img=12",
        username: "John Doe",
        email: "john.doe@example.com",
      };
      
      setTimeout(() => {
        setProfile(mockData);
      }, 500);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

    // neeche wala sara main real time data fetch krne k liye h , dont mess with it !!!
    // const fetchProfile = async () => {
    //   try {
    //     const response = await axios.get(
    //       'http://localhost:5174/api/v1/get-user-information',
    //       { headers }
    //     );
    //     setProfile(response.data);
    //   } catch (error) {
    //     console.error('Error fetching profile:', error);
    //   }
    // };

    fetchProfile(); 
  }, []);

  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-screen py-8 gap-4 text-white">
      {!profile ? (
        <div className='w-full h-[100%] flex items-center justify-center'>
            <Loader />
        </div> 
      ) : (
        <>
          <div className="sm:w-full md:w-1/6">
            <Sidebar data={profile} />
          </div>
          <div className="sm:w-full md:w-5/6">
            <Outlet context={{ profile }} /> {/* ✅ pass profile data to nested routes if needed */}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
=======

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {

    // ye dummy data hai , kaam ho jane k baad delete kr dena :
    const fetchProfile = async () => {
    try {
      const mockData = {
        avatar: "https://i.pravatar.cc/150?img=12",
        username: "John Doe",
        email: "john.doe@example.com",
      };
      
      setTimeout(() => {
        setProfile(mockData);
      }, 500);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

    // neeche wala sara main real time data fetch krne k liye h , dont mess with it !!!
    // const fetchProfile = async () => {
    //   try {
    //     const response = await axios.get(
    //       'http://localhost:5174/api/v1/get-user-information',
    //       { headers }
    //     );
    //     setProfile(response.data);
    //   } catch (error) {
    //     console.error('Error fetching profile:', error);
    //   }
    // };

    fetchProfile(); 
  }, []);

  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-screen py-8 gap-4 text-white">
      {!profile ? (
        <div className='w-full h-[100%] flex items-center justify-center'>
            <Loader />
        </div> 
      ) : (
        <>
          <div className="w-full md:w-1/6 h-auto lg:h-screen">
            <Sidebar data={profile} />
          </div>
          <div className="sm:w-full md:w-5/6">
            <Outlet context={{ profile }} /> {/* ✅ pass profile data to nested routes if needed */}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;


>>>>>>> d4e344c35cd5032f6b4b04424973718f13477e9a
