import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Myappointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-700 border-b pb-3 mt-12">
        My Appointments
      </h2>

      <div className="mt-6 space-y-6">
        {doctors.slice(0, 2).map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-5 flex flex-col md:flex-row gap-6 border">
            {/* Doctor Image */}
            <div className="flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-md border"
              />
            </div>

            {/* Doctor Info */}
            <div className="flex-1 space-y-1">
              <p className="text-lg font-semibold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-500">{item.speciality}</p>
              <p className="text-sm text-gray-600 font-medium mt-2">Address:</p>
              <p className="text-sm text-gray-500">{item.address.line1}</p>
              <p className="text-sm text-gray-500">{item.address.line2}</p>
              <p className="text-sm text-gray-500 mt-2">
                <span className="font-medium text-gray-600">Date & Time:</span> 25 July, 2024 | 8:30 PM
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col justify-between gap-3 md:items-end">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Pay Online
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myappointments;
