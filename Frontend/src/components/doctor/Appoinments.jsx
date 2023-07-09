import React, { useState } from 'react';

const DoctorRegister = () => {
  const [doctor, setDoctor] = useState({
    doctorName: '',
    age: '',
    gender: '',
    dob: '',
    specialization: '',
    doctorEmail: '',
    doctorAddress: '',
    doctorMobile: '',
    emergencyNo: '',
    doctor_Experience: '',
    constulting_Day: '',
    constulting_Time: '',
    username: '',
    password: '',
    file: null,
    imageName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const imageName = file.name;
    setDoctor((prevState) => ({
      ...prevState,
      file,
      imageName,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // Append the form data fields
    Object.entries(doctor).forEach(([key, value]) => {
      if (key === 'file') {
        formData.append('imageName', doctor.imageName);
    } else {
        formData.append('imageName', doctor.imageName);
    }
    });

    try {
      const response = await fetch('https://localhost:7089/api/doctors', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful registration, e.g., show a success message
        console.log('Registration successful:', data);
      } else {
        // Handle registration error, e.g., show an error message
        console.error('Registration failed:', response.statusText);
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <h2>Doctor Registration</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <div>
          <label htmlFor="doctorName">Doctor Name:</label>
          <input
            type="text"
            id="doctorName"
            name="doctorName"
            value={doctor.doctorName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={doctor.age}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={doctor.gender}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={doctor.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="specialization">Specialization:</label>
          <input
            type="text"
            id="specialization"
            name="specialization"
            value={doctor.specialization}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="doctorEmail">Email:</label>
          <input
            type="email"
            id="doctorEmail"
            name="doctorEmail"
            value={doctor.doctorEmail}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="doctorAddress">Address:</label>
          <input
            type="text"
            id="doctorAddress"
            name="doctorAddress"
            value={doctor.doctorAddress}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="doctorMobile">Mobile:</label>
          <input
            type="text"
            id="doctorMobile"
            name="doctorMobile"
            value={doctor.doctorMobile}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="emergencyNo">Emergency Contact:</label>
          <input
            type="text"
            id="emergencyNo"
            name="emergencyNo"
            value={doctor.emergencyNo}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="doctor_Experience">Experience:</label>
          <input
            type="text"
            id="doctor_Experience"
            name="doctor_Experience"
            value={doctor.doctor_Experience}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="constulting_Day">Consulting Day:</label>
          <input
            type="text"
            id="constulting_Day"
            name="constulting_Day"
            value={doctor.constulting_Day}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="constulting_Time">Consulting Time:</label>
          <input
            type="time"
            id="constulting_Time"
            name="constulting_Time"
            value={doctor.constulting_Time}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={doctor.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={doctor.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="file">Profile Image:</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            required
          />
        </div>

        {/* Submit button */}
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default DoctorRegister;
