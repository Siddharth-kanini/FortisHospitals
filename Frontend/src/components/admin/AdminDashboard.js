import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  FileOutlined,
  TeamOutlined,
  IdcardOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import logo from './logo.png';


const { Header, Sider, Content } = Layout;

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const isSectionSelected = (section) => {
    return selectedSection === section;
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    fetchDoctors();
    fetchPatients();
  }, []);

  const fetchDoctors = () => {
    axios
      .get('https://localhost:7089/api/doctors')
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchPatients = () => {
    axios
      .get('https://localhost:7010/api/Patient')
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeStatus = async (doctorID, newStatus) => {
    try {
      const response = await axios.post(
        `https://localhost:7089/api/doctors/${doctorID}/activation`,
        {
          status: newStatus,
        }
      );
      console.log(response.data);
      fetchDoctors();
      // Handle successful activation
    } catch (error) {
      console.error('An error occurred during doctor activation', error);
      // Handle error
    }
  };

  function ManageDoctors({ doctors }) {
    const activeDoctors = doctors.filter((doctor) => doctor.status !== 'pending');
    const doctorRequests = doctors.filter((doctor) => doctor.status === 'pending');

    return (
      <div className="section">
        <h4 className="title">Manage Doctors</h4>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Active Doctors</h5>
                <div className="card-container">
                  {activeDoctors.map((doctor) => (
                    <DoctorCard key={doctor.id} {...doctor} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Doctor Requests</h5>
                <div className="card-container">
                  {doctorRequests.map((doctor) => (
                    <DoctorCard
                      key={doctor.id}
                      {...doctor}
                      changeStatus={changeStatus}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function DoctorCard({
    doctorID,
    imageName,
    doctorName,
    gender,
    doctorMobile,
    specialization,
    doctor_Experience,
    constulting_Day,
    constulting_Time,
    review,
    status,
    changeStatus,
  }) {
    return (
      <div className="card">
        <div className="card-image-container">
          <img
            src={`/Img/${imageName}`}
            alt={doctorName}
            className="card-image"
          />
        </div>
        <div className="card-content">
          <h2 className="card-title">{doctorName}</h2>
          <p className="card-description">Gender: {gender}</p>
          <p className="card-description">Specialization: {specialization}</p>
          <p className="card-description">Experience: {doctor_Experience}</p>
          <p className="card-description">Consulting Day: {constulting_Day}</p>
          <p className="card-description">Consulting Time: {constulting_Time}</p>
          <p className="card-description">Review: {review}</p>
          <p className="card-description">Mobile: {doctorMobile}</p>
          <p className="card-description">Status: {status}</p>
          {status === 'pending' && (
            <div className="d-flex justify-content-around">
              <button
                className="btn btn-sm btn-success"
                onClick={() => changeStatus(doctorID, 'active')}
              >
                Active
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  function ManagePatients() {
    const handleDelete = (patientID) => {
      axios
        .delete(`https://localhost:7010/api/Patient/${patientID}`)
        .then((response) => {
          setPatients((prevPatients) =>
            prevPatients.filter((patient) => patient.patient_ID !== patientID)
          );
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return (
      <div className="section">
        <h4 className="title">Manage Patients</h4>
        <div className="card-container">
          {patients.length === 0 ? (
            <p>No patients found.</p>
          ) : (
            patients.map((patient) => (
              <PatientCard
                key={patient.patient_ID}
                {...patient}
                onDelete={() => handleDelete(patient.patient_ID)}
              />
            ))
          )}
        </div>
      </div>
    );
  }

  function PatientCard({
    patient_Name,
    age,
    gender,
    bloodGroup,
    patient_Address,
    patient_Phone,
    patient_Email,
    patient_UserName,
    onDelete,
  }) {
    return (
      <div className="card">
        <div className="card-content">
          <h2 className="card-title">{patient_Name}</h2>
          <p className="card-description">Age: {age}</p>
          <p className="card-description">Gender: {gender}</p>
          <p className="card-description">Blood Group: {bloodGroup}</p>
          <p className="card-description">Address: {patient_Address}</p>
          <p className="card-description">Phone: {patient_Phone}</p>
          <p className="card-description">Email: {patient_Email}</p>
          <p className="card-description">Username: {patient_UserName}</p>
          <button className="btn btn-danger" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    );
  }

  function ManageStaff() {
    const staffTypes = [
      {
        id: 1,
        type: 'Doctors',
        count: 10,
        icon: <UserOutlined />,
      },
      {
        id: 2,
        type: 'Nurses',
        count: 20,
        icon: <TeamOutlined />,
      },
      {
        id: 3,
        type: 'Technicians',
        count: 5,
        icon: <ToolOutlined />,
      },
      // Add more staff types as needed
    ];

    return (
      <div className="bg-white p-4 rounded shadow">
        <h1 className="text-xl font-bold mb-4">Manage Staff</h1>
        <div className="staff-cards-container">
          {staffTypes.map((staffType) => (
            <StaffCard key={staffType.id} {...staffType} />
          ))}
        </div>
      </div>
    );
  }

  function StaffCard({ type, count, icon }) {
    return (
      <div className="staff-card">
        <div className="staff-card-icon">{icon}</div>
        <div className="staff-card-content">
          <h2 className="staff-card-title">{type}</h2>
          <p className="staff-card-count">{count} Staff</p>
        </div>
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        theme="dark"
      >
        <div className="logos">
        <img src={logo} alt="Logo" className="logo-image" />
        </div>
        <div className="logos" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
        >
          <Menu.Item
            key="1"
            icon={<UserOutlined />}
            onClick={() => handleSectionClick('patients')}
            className={
              isSectionSelected('patients')
                ? 'expandedSection'
                : 'section'
            }
          >
            Manage Patients
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<TeamOutlined />}
            onClick={() => handleSectionClick('doctors')}
            className={
              isSectionSelected('doctors')
                ? 'expandedSection'
                : 'section'
            }
          >
            Manage Doctors
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<IdcardOutlined />}
            onClick={() => handleSectionClick('adminProfile')}
            className={
              isSectionSelected('adminProfile')
                ? 'expandedSection'
                : 'section'
            }
          >
            Admin Profile
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<FileOutlined />}
            onClick={() => handleSectionClick('staff')}
            className={
              isSectionSelected('staff') ? 'expandedSection' : 'section'
            }
          >
            Manage Staff
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0 }}
        >
          {/* Add your top bar components and content here */}
        </Header>
        <Content style={{ margin: '16px' }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <h1>Admin Dashboard</h1>
            {selectedSection === 'patients' && <ManagePatients />}
            {selectedSection === 'doctors' && (
              <ManageDoctors doctors={doctors} changeStatus={changeStatus} />
            )}
            {selectedSection === 'adminProfile' && (
              <div className="section">
                <h4 className="title">Admin Profile</h4>
                <div className="admin-profile-card">
                  <div className="admin-profile-card-header">
                    <h2 className="admin-profile-card-title">
                      Admin Information
                    </h2>
                  </div>
                  <div className="admin-profile-card-body">
                  <div className="admin-profile-field">
                      <span className="admin-profile-field-label">
                        UserName:
                      </span>
                      <span className="admin-profile-field-value">
                        FH601A
                      </span>
                    </div>
                    <div className="admin-profile-field">
                      <span className="admin-profile-field-label">
                        Name:
                      </span>
                      <span className="admin-profile-field-value">
                        Rohan Roy
                      </span>
                    </div>
                    <div className="admin-profile-field">
                      <span className="admin-profile-field-label">
                        Email:
                      </span>
                      <span className="admin-profile-field-value">
                        rohan.roy@gmail.com
                      </span>
                    </div>
                    <div className="admin-profile-field">
                      <span className="admin-profile-field-label">
                        Role:
                      </span>
                      <span className="admin-profile-field-value">
                        Admin
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {selectedSection === 'staff' && <ManageStaff />}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
