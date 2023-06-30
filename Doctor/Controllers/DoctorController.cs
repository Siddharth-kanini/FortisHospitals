
using Doctorapp.Repositories;
using Doctorapp.Services;
using Doctors.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using ModelLibrary.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Doctorapp.Controllers
{
    [ApiController]
    [Route("api/doctors")]
    public class DoctorController : ControllerBase
    {
        private readonly IDoctorRepository _doctorRepository;
        private readonly DoctorService _doctorService;

        public DoctorController(IDoctorRepository doctorRepository, DoctorService doctorService)
        {
            _doctorRepository = doctorRepository;
            _doctorService = doctorService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDoctors()
        {
            var doctors = await _doctorRepository.GetAllDoctorsAsync();
            return Ok(doctors);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDoctor(int id)
        {
            var doctor = await _doctorRepository.GetDoctorByIdAsync(id);
            if (doctor == null)
            {
                return NotFound();
            }

            return Ok(doctor);
        }

        [HttpPost]
        public async Task<IActionResult> AddDoctor([FromForm] Doctor doctor, string password)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            int doctorId = await _doctorRepository.AddDoctorAsync(doctor, password);
            return CreatedAtAction(nameof(GetDoctor), new { id = doctorId }, doctor);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDoctor(int id, Doctor doctor)
        {
            if (id != doctor.DoctorID)
            {
                return BadRequest();
            }

            await _doctorRepository.UpdateDoctorAsync(doctor);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            await _doctorRepository.DeleteDoctorAsync(id);
            return NoContent();
        }

        [HttpGet("doctors-with-patients")]
        public async Task<IActionResult> GetAllDoctorsWithPatients()
        {
            IEnumerable<DoctorPatientDTO> doctorPatientDTOs = await _doctorService.GetAllDoctorsWithPatientsAsync();
            return Ok(doctorPatientDTOs);
        }
    }
}
