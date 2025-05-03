import React, { useState } from 'react';
import { assets } from '../assets/assets';

const Myprofile = () => {
  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    image: assets.profile_pic,
    email: 'richardjameswap@gmail.com',
    phone: '+1 123 456 7890',
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Church Road, London"
    },
    gender: 'Male',
    dob: '20 July, 2024'
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto text-gray-700">
      {/* Profile Image & Name */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={userData.image}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div className="flex-1">
          {isEdit ? (
            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="border p-2 rounded w-full"
            />
          ) : (
            <h2 className="text-2xl font-semibold">{userData.name}</h2>
          )}
        </div>
        <button
          onClick={() => setIsEdit(!isEdit)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {isEdit ? 'Save' : 'Edit'}
        </button>
      </div>

      <hr className="my-4" />

      {/* Contact Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">CONTACT INFORMATION</h3>
        <div className="space-y-2">
          <p><span className="font-medium">Email:</span> {userData.email}</p>
          <p><span className="font-medium">Phone:</span></p>
          {isEdit ? (
            <input
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="border p-2 rounded w-full"
            />
          ) : (
            <p>{userData.phone}</p>
          )}

          <p className="font-medium mt-4">Address:</p>
          {isEdit ? (
            <div className="space-y-2">
              <input
                type="text"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                className="border p-2 rounded w-full"
              />
            </div>
          ) : (
            <p>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div>
        <h3 className="text-lg font-semibold mb-2">BASIC INFORMATION</h3>
        <div className="space-y-2">
          <p><span className="font-medium">Gender:</span></p>
          {isEdit ? (
            <select
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              className="border p-2 rounded w-full"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p>{userData.gender}</p>
          )}

          <p><span className="font-medium">Date of Birth:</span> {userData.dob}</p>
        </div>
      </div>
    </div>
  );
};

export default Myprofile;
