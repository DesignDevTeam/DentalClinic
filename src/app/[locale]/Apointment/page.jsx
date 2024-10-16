"use client";
import { useState } from "react";
import { addDays, format } from "date-fns";

// Mock available time slots

const Appointment = () => {
  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];
  const [date, setDate] = useState();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();

  const handleBookAppointment = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const phone = formData.get("phone");

    // send this data to backend
    console.log("Booking appointment:", {
      name,
      phone,
      date: date ? format(date, "yyyy-MM-dd") : null,
      timeSlot: selectedTimeSlot,
    });

    // Reset form and selections
    setDate(undefined);
    setSelectedTimeSlot(null);
    e.target.reset();

    alert("Appointment booked successfully!");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Book an Appointment</h1>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Select a date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            min={format(new Date(), "yyyy-MM-dd")}
            max={format(addDays(new Date(), 30), "yyyy-MM-dd")}
            onChange={(e) => setDate(new Date(e.target.value))}
          />
        </div>

        {date && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Available Time Slots
            </label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  className={`py-2 px-4 rounded-md text-sm font-medium ${
                    selectedTimeSlot === slot
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedTimeSlot(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedTimeSlot && (
          <form onSubmit={handleBookAppointment} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="phone"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Book Appointment
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
export default Appointment;
