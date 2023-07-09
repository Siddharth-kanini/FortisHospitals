import React from 'react';
import { Carousel, Row, Col, Card, Divider, Menu } from 'antd';
import { HeartOutlined, MedicineBoxOutlined, UsergroupAddOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';
import './PatientLanding.css';

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

const Home = () => {
  return (
    <div>
      <Navbar />

      <div className="body-container">
        {/* Image Carousel */}
        <Carousel autoplay>
          <div>
            <img className="carousel-image" src="https://watermark.lovepik.com/photo/40177/5152.jpg_wh1200.jpg" alt="Carousel 1" />
          </div>
          <div>
            <img className="carousel-image" src="https://thumbs.dreamstime.com/b/healthcare-medical-concept-medicine-doctor-stethoscope-hand-patients-come-to-hospital-background-179931139.jpg" alt="Carousel 2" />
          </div>
        </Carousel>

        {/* Specializations */}
        <div className="specializations-container">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card className="specialization-card" bordered={false}>
                <HeartOutlined className="specialization-icon" />
                <h3>Cardiology</h3>
              </Card>
            </Col>
            <Col span={8}>
              <Card className="specialization-card" bordered={false}>
                <MedicineBoxOutlined className="specialization-icon" />
                <h3>Internal Medicine</h3>
              </Card>
            </Col>
            <Col span={8}>
              <Card className="specialization-card" bordered={false}>
                <UsergroupAddOutlined className="specialization-icon" />
                <h3>Pediatrics</h3>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

     <footer className="footer">
  <div className="footer-content">
    <h3>Contact Us</h3>
    <p>123 Street, City</p>
    <p>Phone: 123-456-7890</p>
    <p>Email: info@fortishospitals.com</p>
  </div>
</footer>

    </div>
  );
};

export default Home;
