import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT'];
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = async () => {
    const info = doctors.find(doc => doc._id === docId);
    setDocInfo(info);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(currentDate.getHours() >= 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        timeSlots.push({
          datetime: new Date(currentDate),
          time: currentDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots(prev => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  return (
    <div className='flex flex-col p-4'>
      {docInfo ? (
        <div className="border border-gray-300 rounded-xl p-6 shadow-md bg-white w-full space-y-6">
          {/* Doctor Info */}
          <div className='flex flex-col sm:flex-row gap-6'>
            <img
              src={docInfo.image}
              alt={docInfo.name}
              className='w-48 h-48 rounded-full object-cover border-4 border-blue-100'
            />
            <div className='flex flex-col justify-center space-y-4 w-full'>
              <h2 className='text-2xl font-semibold flex items-center gap-2'>
                {docInfo.name}
                <img src={assets.verified_icon} alt="verified" className='w-5 h-5' />
              </h2>
              <p className='text-gray-600'>
                <span className='font-medium'>{docInfo.degree}</span> — {docInfo.speciality}
              </p>
              <button className='px-4 py-2 bg-blue-500 text-white rounded-lg w-fit'>
                {docInfo.experience} Experience
              </button>
              <div className='mt-4'>
                <h3 className='font-semibold text-lg flex items-center gap-2'>
                  About <img src={assets.info_icon} alt="info" className='w-4 h-4' />
                </h3>
                <p className='text-gray-700 mt-4 pt-2 border-t border-gray-300'>{docInfo.about}</p>
              </div>
              <p className='text-gray-700'>
                Appointment fee: <span>{currencySymbol}{docInfo.fees}</span>
              </p>
            </div>
          </div>

          {/* Booking Slot Section */}
          <div className='font-medium text-gray-700'>
            <p>Booking Slot</p>

            {/* Date Selector */}
            <div className='flex gap-3 items-center w-full overflow-x-scroll whitespace-nowrap scrollbar-hide mt-4'>
              {docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 px-4 min-w-[4rem] rounded-full cursor-pointer border 
                    ${slotIndex === index ? 'bg-blue-500 text-white' : 'border-gray-400 text-gray-700'}`}
                  key={index}
                >
                  <p>{daysOfWeek[item[0]?.datetime.getDay()]}</p>
                  <p>{item[0]?.datetime.getDate()}</p>
                </div>
              ))}
            </div>

            {/* Time Slots */}
            <div className='flex items-center gap-3 w-full overflow-x-scroll whitespace-nowrap scrollbar-hide mt-4'>
              {docSlots[slotIndex]?.map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer border 
                    ${item.time === slotTime ? 'bg-blue-500 text-white' : 'border-gray-300 text-gray-700'}`}
                  key={index}
                >
                  {item.time}
                </p>
              ))}
            </div>

            <button className='mt-4 bg-blue-500 text-white text-sm font-light px-14 py-3 rounded-full'>
              Book an Appointment
            </button>
          </div>
        </div>
      ) : (
        <p className='text-center text-gray-500'>Loading doctor info...</p>
      )}

      {docInfo && (
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      )}
    </div>
  );
};

export default Appointment;
