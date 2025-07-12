import React, { useState } from 'react';
import patients from '../data/patients.json';
import doctors from '../data/doctors.json';
import '../styles/AppointmentForm.css';

const AppointmentForm = ({ onSave }) => {
  const [patient, setPatient] = useState('');
  const [doctor, setDoctor] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patient || !doctor || !time) {
      alert('Please fill all fields.');
      return;
    }

    const appointment = { patient, doctor, time };
    onSave(appointment);
    setPatient('');
    setDoctor('');
    setTime('');
  };

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <label>Patient:</label>
      <select value={patient} onChange={(e) => setPatient(e.target.value)}>
        <option value="">-- Select Patient --</option>
        {patients.map((p) => (
          <option key={p}>{p}</option>
        ))}
      </select>

      <label>Doctor:</label>
      <select value={doctor} onChange={(e) => setDoctor(e.target.value)}>
        <option value="">-- Select Doctor --</option>
        {doctors.map((d) => (
          <option key={d}>{d}</option>
        ))}
      </select>

      <label>Time:</label>
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />

      <button type="submit">Save Appointment</button>
    </form>
  );
};

export default AppointmentForm;
