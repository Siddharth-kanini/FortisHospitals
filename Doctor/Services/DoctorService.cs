using Doctorapp.Repositories;
using Doctors.Models.DTO;
using ModelLibrary.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Doctorapp.Services
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
    }
}
