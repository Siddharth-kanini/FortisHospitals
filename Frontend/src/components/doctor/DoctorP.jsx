import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { Menu } from 'antd';

import './Doctorp.css';

const HomeDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const Navbar = () => {
    return (
        <Menu mode="horizontal" theme="dark">
        <Menu.Item className="navbar-hospital">
          <a href="/"className="nav-link">FORTIS HOSPITALS</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/"className="nav-link">Home</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/patientreg"className="nav-link">Patient Registration</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/HomeDoctor"className="nav-link">Doctors</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/appointments"className="nav-link">Appointments</a>
        </Menu.Item>
      </Menu>
    );
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch('https://localhost:7089/api/doctors/doctors-with-patients');
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.log('Error fetching doctors:', error);
    }
  };

  const handleBookAppointment = (doctorID) => {
    form.resetFields();
    setModalVisible(true);
    
    const patientID = localStorage.getItem('patient_ID');

    const selectedDoctor = doctors.find((doctor) => doctor.doctorID === doctorID);

    form.setFieldsValue({
        doctorID: selectedDoctor.doctorID,
      patient_ID: patientID,
    });
  };

  const handleModalSubmit = async (values) => {
    console.log('Payload:', values); 

    try {
      const response = await fetch('https://localhost:7130/api/appointments/initial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log('Appointment created:', data);
      setModalVisible(false);
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <h1 className="text-center">Doctors in Our Hospital</h1>
        <div className="row">
          {doctors.map((doctor, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-4">
                <img src={`/Img/${doctor.imageName}`} className="card-img-top" alt="Doctor" />
                <div className="card-body">
                  <h5 className="card-title">{doctor.doctorName}</h5>
                  <p className="card-text">Mobile: {doctor.doctorMobile}</p>
                  <p className="card-text">Specialization: {doctor.specialization}</p>
                  <p className="card-text">Experience: {doctor.doctor_Experience}</p>
                  <p className="card-text">Consulting Day: {doctor.constulting_Day}</p>
                  <p className="card-text">Consulting Time: {doctor.constulting_Time}</p>
                  <p className="card-text">Review: {doctor.review}</p>
                </div>
                <Button
                  type="primary"
                  onClick={() => handleBookAppointment(doctor.doctorID)}
                  className="book-appointment-btn"
                >
                  Book Appointment
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        title="Book Appointment"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleModalSubmit} layout="vertical">
          <Form.Item
            label="Doctor ID"
            name="doctor_ID"
            hidden
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Patient ID"
            name="patient_ID"
            hidden
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Reason of Visit"
            name="reason_of_visit"
            rules={[{ required: true, message: 'Please enter the reason of visit' }]}
          >
            <Input placeholder="Reason of Visit" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default HomeDoctor;




{/* <img src={`/Img/${doctor.imageName}`} className="card-img-top" alt="Doctor" />
                          <div className="card-body">
                              <h5 className="card-title">{doctor.doctorName}</h5>
                              <p className="card-text">Mobile: {doctor.doctorMobile}</p>
                              <p className="card-text">Specialization: {doctor.specialization}</p>
                              <p className="card-text">Experience: {doctor.doctor_Experience}</p>
                              <p className="card-text">Consulting Day: {doctor.constulting_Day}</p>
                              <p className="card-text">Consulting Time: {doctor.constulting_Time}</p>
                              <p className="card-text">Review: {doctor.review}</p>
                          </div> */}



{/* <Menu mode="horizontal" theme="dark">
        <Menu.Item className="navbar-hospital">
          <a href="/"className="nav-link">FORTIS HOSPITALS</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/"className="nav-link">Home</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/patientreg"className="nav-link">Patient Registration</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/HomeDoctor"className="nav-link">Doctors</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/appointments"className="nav-link">Appointments</a>
        </Menu.Item>
      </Menu> */}