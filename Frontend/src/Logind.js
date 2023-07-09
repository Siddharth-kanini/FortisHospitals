import React from "react";
import { Component } from "react";
import axios from "axios";

export default class Logind extends Component {
    constructor(props) {
      super(props);
      this.state = {
        Doctor:[],
        doctorName: 0,
        doctor_Name: "",
        age: 0,
        gender: "",
        dob: new Date(),
        specialization: "",
        doctorEmail: "user@example.com",
        doctorAddress: "",
        doctorMobile: 0,
        emergencyNo: 0,
        doctor_Experience: "",
        constulting_Day: "",
        constulting_Time: new Date(),
        username: "",
        password:"",
        status: "pending",
        imageName: "",
        review: "",
        lastLogin: new Date(),
        file: "",
        selectedDoctor: null,
    };
    }
  
    componentDidMount() {
      this.fetchDoctor();
    }
  
    fetchDoctor() {
      fetch("https://localhost:7097/api/doctors")
        .then((response) => response.json())
        .then((data) => {
          this.setState({ Doctor: data });
          console.log("Fetched doctor data");
        })
        .catch((error) => {
          console.log("Error fetching doctor data:", error);
        });
      }

      CreateDoctor = () => {
        const { doctorName, age, dob, gender, specialization, doctorEmail, doctorAddress, doctorMobile, emergencyNo, doctor_Experience, constulting_Day, constulting_Time, username, password,imageName, status, file,review } = this.state;
      
        const formData = new FormData();
        formData.append('doctor.doctorName', doctorName);
        formData.append('doctor.age', age);
        formData.append('doctor.dob', dob);
        formData.append('doctor.gender', gender);
        formData.append('doctor.specialization', specialization);
        formData.append('doctor.doctorEmail', doctorEmail);
        formData.append('doctor.doctorAddress', doctorAddress);
        formData.append('doctor.doctorMobile', doctorMobile);
        formData.append('doctor.emergencyNo', emergencyNo);
        formData.append('doctor.doctor_Experience', doctor_Experience);
        formData.append('doctor.constulting_Day', constulting_Day);
        formData.append('doctor.constulting_Time', constulting_Time);
        formData.append('doctor.username', username);
        formData.append('doctor.imageName', imageName);
        formData.append('password', password);
        formData.append('doctor.status', status);
        formData.append('doctor.file', file);
        formData.append('doctor.review', review);
      
        fetch("https://localhost:7089/api/doctors", {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Doctor is created', data);
            alert.success('Doctor is created');
            this.setState({
              doctorName: '',
              age: 0,
              gender: '',
              dob: new Date(),
              specialization: '',
              doctorEmail: '',
              doctorAddress: '',
              doctorMobile: 0,
              emergencyNo: 0,
              doctor_Experience: '',
              constulting_Day: '',
              constulting_Time: new Date(),
              username: '',
              password: '',
              status: '',
              file: null,
              review:""
            });
      
            this.fetchDoctor();
          })
          .catch((error) => {
            console.error('Error creating doctor:', error);
          });
      };
      
      
    deleteHotel = (doctorId) => {
      if (window.confirm("Are you sure you want to delete this room?")) {
        fetch("https://localhost:7097/api/doctors/" + `${doctorId}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              console.log("Doctor deleted successfully");
              alert.success("Doctor deleted successfully");
              this.fetchDoctor();
            } else {
              throw new Error(alert.error("Error deleting Doctor:"));
             
            }
          })
          .catch((error) => {
            console.error("Error deleting Doctor:", error);
          });
      }
    };
    changeStatus = async (doctorID, newStatus) => {
      try {
        const response = await axios.post(`https://localhost:7097/api/doctors/${doctorID}/activation`, {
          status: newStatus,
        });
        console.log(response.data);
        this.fetchDoctor();
        // Handle successful activation
      } catch (error) {
        console.error('An error occurred during doctor activation', error);
        // Handle error
      }
    };
  
    updateDoctor = () => {
        const {
          selectedDoctor,
          doctorName,
          age,
          dob,
          gender,
          specialization,
          doctorEmail,
          doctorAddress,
          doctorMobile,
          emergencyNo,
          doctor_Experience,
          constulting_Day,
          constulting_Time,
          username,
          password,
          status,
          imageName,
          review,
          file,
        } = this.state;
      
        if (!selectedDoctor) {
          return;
        }
      
        const updatedDoctor = {
          ...selectedDoctor,
          doctorName: doctorName,
          age: age,
          dob: dob,
          gender: gender,
          specialization: specialization,
          doctorEmail: doctorEmail,
          doctorAddress: doctorAddress,
          doctorMobile: doctorMobile,
          emergencyNo: emergencyNo,
          doctor_Experience: doctor_Experience,
          constulting_Day: constulting_Day,
          constulting_Time: constulting_Time,
          username: username,
          password: password,
          status: status,
          imageName: imageName,
          review: review
        };
        const formData = new FormData();
        formData.append('file', file);
        formData.append('doctorData', JSON.stringify(updatedDoctor));
        fetch("https://localhost:7097/api/doctors/" + selectedDoctor.doctor_ID, {
          method: "PUT",
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Doctor is updated ", data);
            this.setState({
              selectedDoctor: null,
              doctorName: "",
              age: 0,
              dob: new Date(),
              gender: "",
              specialization: "",
              doctorEmail: "",
              doctorAddress: "",
              doctorMobile: 0,
              emergencyNo: 0,
              doctor_Experience: "",
              constulting_Day: "",
              constulting_Time: new Date(),
              username: "",
              password: "",
              status: "",
              imageName: "",
              review: "",
              file:null,
            });
      
            this.fetchDoctor();
          })
          .catch((error) => {
            console.error("Error updating doctor:", error);
            alert.error("Error updating doctor:", error);
          });
      };
  
      handleDoctorNameInputChange = (event) => {
        this.setState({ doctorName: event.target.value });
      };
      
      handleAgeInputChange = (event) => {
        this.setState({ age: event.target.value });
      };
      
      handleDobInputChange = (event) => {
        this.setState({ dob: event.target.value });
      };
      
      handleGenderInputChange = (event) => {
        this.setState({ gender: event.target.value });
      };
      
      handleSpecializationInputChange = (event) => {
        this.setState({ specialization: event.target.value });
      };
      
      handleDoctorEmailInputChange = (event) => {
        this.setState({ doctorEmail: event.target.value });
      };
      
      handleDoctorAddressInputChange = (event) => {
        this.setState({ doctorAddress: event.target.value });
      };
      
      handleDoctorMobileInputChange = (event) => {
        this.setState({ doctorMobile: event.target.value });
      };
      
      handleEmergencyNoInputChange = (event) => {
        this.setState({ emergencyNo: event.target.value });
      };
      
      handleDoctorExperienceInputChange = (event) => {
        this.setState({ doctor_Experience: event.target.value });
      };
      
      handleConsultingDayInputChange = (event) => {
        this.setState({ constulting_Day: event.target.value });
      };
      
      handleConsultingTimeInputChange = (event) => {
        this.setState({ constulting_Time: event.target.value });
      };
      
      handleUsernameInputChange = (event) => {
        this.setState({ username: event.target.value });
      };
      
      handlePasswordInputChange = (event) => {
        this.setState({ password: event.target.value });
      };
      
      handleStatusInputChange = (event) => {
        this.setState({ status: event.target.value });
      };
      
      handleImageNameInputChange = (event) => {
        this.setState({ imageName: event.target.value });
      };
      
      handleReviewInputChange = (event) => {
        this.setState({ review: event.target.value });
      };
      handleFileChange = (event) => {
        this.setState({ file:event.target.files[0]});
      };
      
  
  
      selectDoctorForUpdate = (doctor) => {
        this.setState({
          selectedDoctor: doctor,
          doctorName: doctor.doctorName,
          age: doctor.age,
          dob: doctor.dob,
          gender: doctor.gender,
          specialization: doctor.specialization,
          doctorEmail: doctor.doctorEmail,
          doctorAddress: doctor.doctorAddress,
          doctorMobile: doctor.doctorMobile,
          emergencyNo: doctor.emergencyNo,
          doctor_Experience: doctor.doctor_Experience,
          constulting_Day: doctor.constulting_Day,
          constulting_Time: doctor.constulting_Time,
          username: doctor.username,
          password: null,
          status: doctor.status,
          imageName: doctor.imageName,
          review: doctor.review,
        });
      };
      
      render() {
        const {
          Doctor,
          selectedDoctor,
          doctorName,
          age,
          dob,
          gender,
          specialization,
          doctorEmail,
          doctorAddress,
          doctorMobile,
          emergencyNo,
          doctor_Experience,
          constulting_Day,
          constulting_Time,
          username,
          password,
          status,
          imageName,
          review,
        } = this.state;
      
        return (
            <div className="container-fluid">
            <h1>Doctor Register</h1>
          
            <div className="row">
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  value={doctorName}
                  onChange={this.handleDoctorNameInputChange}
                  placeholder="Name"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  value={age}
                  onChange={this.handleAgeInputChange}
                  placeholder="Age"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="date"
                  className="form-control"
                  value={dob}
                  onChange={this.handleDobInputChange}
                  placeholder="Date of Birth"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  value={gender}
                  onChange={this.handleGenderInputChange}
                  placeholder="Gender"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  value={specialization}
                  onChange={this.handleSpecializationInputChange}
                  placeholder="Specialization"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="email"
                  className="form-control"
                  value={doctorEmail}
                  onChange={this.handleDoctorEmailInputChange}
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  value={doctorAddress}
                  onChange={this.handleDoctorAddressInputChange}
                  placeholder="Address"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  value={doctorMobile}
                  onChange={this.handleDoctorMobileInputChange}
                  placeholder="Mobile"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  value={emergencyNo}
                  onChange={this.handleEmergencyNoInputChange}
                  placeholder="Emergency Contact"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  value={doctor_Experience}
                  onChange={this.handleDoctorExperienceInputChange}
                  placeholder="Experience"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  value={constulting_Day}
                  onChange={this.handleConsultingDayInputChange}
                  placeholder="Consulting Day"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="date"
                  className="form-control"
                  value={constulting_Time}
                  onChange={this.handleConsultingTimeInputChange}
                  placeholder="Consulting Time"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={this.handleUsernameInputChange}
                  placeholder="Username"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={this.handlePasswordInputChange}
                  placeholder="Password"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  value={status}
                  onChange={this.handleStatusInputChange}
                  placeholder="Status"
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  value={imageName}
                  onChange={this.handleImageNameInputChange}
                  placeholder="Image Name"
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  value={review}
                  onChange={this.handleReviewInputChange}
                  placeholder="Review"
                />
              </div>

    <div className="col-md-2">
      <input
        type="file"
        className="form-control-file"
        onChange={this.handleFileChange}
      />
    </div>

              <div className="col-md-2">
                {selectedDoctor ? (
                  <button className="btn btn-primary" onClick={this.updateDoctor}>
                    Save
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={this.CreateDoctor}>
                    Create
                  </button>
                )}
              </div>
              


            </div>
            
            <div className="row mt-3">
        {Doctor.map((item) => (
          <div></div>
        ))}
      </div>
    </div>
  );
}
}