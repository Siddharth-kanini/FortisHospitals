import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DoctorDashboard from './components/doctor/DoctorDashboard';
import Home from './components/patient/PatientLanding';
import LoginPage from './components/Login/LoginPage';
import AdminDashboard from './components/admin/AdminDashboard';
import PatientLanding from './components/patient/PatientLanding';
import PatientLogin from './components/patient/PatientLogin';
import Patientreg from './Patientreg';
import Doctorcomp from './components/doctor/Appoinments';
import Logind from './Logind';
import HomeDoctor from './components/doctor/DoctorP';
// import DoctorRegistrationForm from './components/doctor/DoctorRegistrationForm';

function Routing() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Stafflogin" element={<LoginPage />}/>
          <Route path='/Login' element={<PatientLogin/>}/>
          <Route path="/doctordashboard" element={<DoctorDashboard/>}/>
          <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
          <Route path="/PatientLanding" element={<PatientLanding/>}/>
          <Route path='/patientreg' element={<Patientreg/>}/>
          <Route path='/docsamp' element={<Doctorcomp/>}/>
          <Route path='/Logind' element={<Logind/>}/>
          <Route path='/HomeDoctor' element={<HomeDoctor/>}/>


          
        </Routes>
      </BrowserRouter>
    );
  }
  

export default Routing;
