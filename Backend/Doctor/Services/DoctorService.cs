using DoctorApplication.DTO;
using DoctorApplication.Interface;
using ModelLibrary.Models;

namespace DoctorApplication.Services
{
    public class DoctorService
    {
        private readonly IDoctorRepository _doctorRepository;

        public DoctorService(IDoctorRepository doctorRepository)
        {
            _doctorRepository = doctorRepository;
        }

        public async Task<IEnumerable<DoctorPatientDTO>> GetAllDoctorsWithPatientsAsync()
        {
            var doctors = await _doctorRepository.GetAllDoctorsAsync();
            var doctorPatientDTOs = doctors.Select(d => new DoctorPatientDTO
            {
                DoctorID = d.DoctorID,
                ImageName = d.ImageName,
                DoctorName = d.DoctorName,
                DoctorMobile = d.DoctorMobile,
                Specialization = d.Specialization,
                Doctor_Experience = d.Doctor_Experience,
                Constulting_Day = d.Constulting_Day,
                Constulting_Time = d.Constulting_Time,
                Review = d.Review
            });

            return doctorPatientDTOs;
        }
        public async Task<DoctorActive_DTO> Activation(int id, DoctorActive_DTO doctorActivationDTO)
        {
            Doctor doctor = await _doctorRepository.GetDoctorByIdAsync(id);
            doctor.Status = doctorActivationDTO.status;
            await _doctorRepository.UpdateDoctorAsync(doctor);
            return doctorActivationDTO;
        }
    }
}
