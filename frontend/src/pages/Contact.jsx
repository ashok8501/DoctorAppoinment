import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="px-6 md:px-20">
      {/* Heading */}
      <div className="text-center text-3xl pt-10 text-gray-500 font-medium">
        <p>
          CONTACT <span className="text-gray-800 font-semibold">US</span>
        </p>
      </div>

      {/* Content */}
      <div className="my-10 flex flex-col md:flex-row items-center gap-12 mb-28 text-sm text-gray-600">
        {/* Image */}
        <img
          className="w-full md:max-w-[360px] rounded-lg shadow-md"
          src={assets.contact_image}
          alt="Contact"
        />

        {/* Info Section */}
        <div className="space-y-4">
          <div>
            <p className="text-lg font-semibold text-gray-700">Our OFFICE</p>
            <p className="mt-1">54709 Willms Station</p>
            <p>Suite 350, Washington, USA</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Tel:</p>
            <p>(415) 555‑0132</p>
            <p className="font-semibold text-gray-700 mt-2">Email:</p>
            <p>greatstackdev@gmail.com</p>
          </div>

          <div className="pt-4">
            <p className="text-md font-semibold text-gray-700">Careers at PRESCRIPTO</p>
            <p>Learn more about our teams and job openings.</p>
            <button className="mt-4 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
