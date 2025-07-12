import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/CalendarPage.css';
import AppointmentForm from '../components/AppointmentForm';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('appointments');
    return saved ? JSON.parse(saved) : {};
  });

  const handleSave = (appointment) => {
    const dateKey = date.toDateString();
    const updated = {
      ...appointments,
      [dateKey]: [...(appointments[dateKey] || []), appointment],
    };
    setAppointments(updated);
    localStorage.setItem('appointments', JSON.stringify(updated));
  };

  const handleDayClick = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleDelete = (index) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;

    const dateKey = date.toDateString();
    const updatedAppointments = [...(appointments[dateKey] || [])];
    updatedAppointments.splice(index, 1);

    const updated = {
      ...appointments,
      [dateKey]: updatedAppointments,
    };

    setAppointments(updated);
    localStorage.setItem('appointments', JSON.stringify(updated));
  };

  return (
    <div className="calendar-container">
      <h2><center>Appointment Calendar</center></h2>
      <Calendar onClickDay={handleDayClick} value={date} className="custom-calendar" />

      <div className="appointment-section">
        <h3>Appointments for {date.toDateString()}</h3>
        <ul className="appointment-list">
          {(appointments[date.toDateString()] || []).map((a, idx) => (
            <li key={idx} className="appointment-item">
              <strong>{a.time}</strong> - {a.patient} with {a.doctor}
              <button
                className="delete-button"
                onClick={() => handleDelete(idx)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <h3>Add Appointment</h3>
        <AppointmentForm onSave={handleSave} />
      </div>
    </div>
  );
};

export default CalendarPage;
