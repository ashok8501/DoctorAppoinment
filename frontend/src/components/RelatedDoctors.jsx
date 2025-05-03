import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [relDoc, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDocs(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className="w-full grid grid-cols-2 sm:grid-cols-5 gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relDoc.length === 0 ? (
          <p className="col-span-full text-center text-sm text-gray-500">
            No related doctors found.
          </p>
        ) : (
          relDoc.slice(0, 5).map((item) => (
            <div
              key={item._id}
              onClick={()=>{navigate(`/appointment/${item._id}`);scrollTo(0,0)}}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2.5 hover:shadow-lg transition-all duration-500"
            >
              <img
                className="bg-blue-50 w-full h-40 object-cover"
                src={item.image || '/default-doctor.jpg'}
                alt={item.name}
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <button
        onClick={() => {
          navigate(`/doctors`);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        more
      </button>
    </div>
  );
};

export default RelatedDoctors;
