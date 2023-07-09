import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Typography, Button } from 'antd';
import { UserOutlined, CalendarOutlined, CheckCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import './DoctorDashboard.css';
import logo from './logo.png';


const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const DoctorDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState('1');
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentRequests, setAppointmentRequests] = useState([]);
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get('https://localhost:7089/api/doctors');
        const doctors = response.data;
        const username = localStorage.getItem('username');
        const filteredDoctor = doctors.find(doctor => doctor.username === username);
        setDoctorData(filteredDoctor);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAppointmentRequests = async () => {
      try {
        const username = localStorage.getItem('username');
        const response = await axios.get(`https://localhost:7130/api/appointments/doctor/${username}`);
        const appointments = response.data;
        const pendingAppointments = appointments.filter(appointment => appointment.status === 'waiting');
        const confirmedAppointments = appointments.filter(appointment => appointment.status === 'Confirmed');
        setAppointmentRequests(pendingAppointments);
        setAcceptedAppointments(confirmedAppointments);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDoctorData();
    fetchAppointmentRequests();
  }, []);

  const handleConfirmAppointment = async (Appoinment_ID) => {
    console.log('Appointment ID:', Appoinment_ID);    
    try {
      await axios.put('https://localhost:7130/api/appointments/confirm', {
        appointment_ID: Appoinment_ID,
        status: 'Confirmed'
      });

      const updatedAppointments = appointmentRequests.map(appointment => {
        if (appointment.appoinment_ID === Appoinment_ID) {
          return { ...appointment, status: 'Confirmed' };
        }
        return appointment;
      });

      setAppointmentRequests(updatedAppointments);
    } catch (error) {
      console.log(error);
    }
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case '1':
      return (
        <div>
          <Title level={2}>Doctor Profile</Title>
          {doctorData && (
            <div>
              <img src={`/Img/${doctorData.imageName}`} alt="Doctor Profile" className="doctor-image" />
              <p>Doctor Name: {doctorData.doctorName}</p>
              <p>Age: {doctorData.age}</p>
              <p>Gender: {doctorData.gender}</p>
              <p>Date of Birth: {doctorData.dob}</p>
              <p>Specialization: {doctorData.specialization}</p>
              <p>Email: {doctorData.doctorEmail}</p>
              <p>Address: {doctorData.doctorAddress}</p>
              <p>Mobile: {doctorData.doctorMobile}</p>
              <p>Experience: {doctorData.doctor_Experience}</p>
              <p>Consulting Day: {doctorData.constulting_Day}</p>
              <p>Consulting Time: {doctorData.constulting_Time}</p>
              <p>Username: {doctorData.username}</p>
              <p>Status: {doctorData.status}</p>
            </div>
          )}
        </div>
      );
      case '2':
        return (
          <div>
            <Title level={2}>Appointment Requests</Title>
            <div className="card-container">
              {appointmentRequests.map((appointment) => (
                <Card key={appointment.appoinment_ID} className="appointment-card" hoverable>
                  <Title level={4}>Reason of Visit: {appointment.reason_of_visit}</Title>
                  <p>Status: {appointment.status}</p>
                  <p>Patient Name: {appointment.patient.patient_Name}</p>
                  <p>Age: {appointment.patient.age}</p>
                  <p>Gender: {appointment.patient.gender}</p>
                  <Button type="primary" onClick={() => handleConfirmAppointment(appointment.appoinment_ID)}>
                    Confirm
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        );
      case '3':
        return (
          <div>
            <Title level={2}>Accepted Appointments</Title>
            <div className="card-container">
              {acceptedAppointments.map((appointment) => (
                <Card key={appointment.appointment_ID} className="appointment-card" hoverable>
                  <Title level={4}>Reason of Visit: {appointment.reason_of_visit}</Title>
                  <p>Patient Name: {appointment.patient.patient_Name}</p>
                  <p>Age: {appointment.patient.age}</p>
                  <p>Gender: {appointment.patient.gender}</p>
                </Card>
              ))}
            </div>
          </div>
        );
      case '4':
        return (
          <div>
            <Title level={2}>Completed Appointments</Title>
           
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} theme="dark">
      <div className="logos">
        <img src={logo} alt="Logo" className="logo-image" />
        </div>
        <div className="logos" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[selectedMenu]}
          onClick={({ key }) => setSelectedMenu(key)}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            Doctor Profile
          </Menu.Item>
          <Menu.Item key="2" icon={<CalendarOutlined />}>
            Appointment Requests
          </Menu.Item>
          <Menu.Item key="3" icon={<CheckCircleOutlined />}>
            Accepted Appointments
          </Menu.Item>
          <Menu.Item key="4" icon={<CheckCircleOutlined />}>
            Completed Appointments
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          
        </Header>
        <Content style={{ margin: '16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default DoctorDashboard;
