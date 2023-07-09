using AdminApplication.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ModelLibrary.Models;
using ModelLibrary.Models.Helpers;

namespace AdminApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly AdminContext _context;

        public AdminController(AdminContext context)
        {
            _context = context;
        }

        [HttpGet("Admindoc")]
        public async Task<IEnumerable<Doctor>> GetAllDoctorsAsync()
        {
            return await _context.Doctors.ToListAsync();
        }

        [HttpPatch("{doctorId}/status")]
        public async Task UpdateDoctorStatusAsync(int doctorId, string status)
        {
            var doctor = await _context.Doctors.FindAsync(doctorId);
            if (doctor != null)
            {
                doctor.Status = status;
                _context.Doctors.Update(doctor);
                await _context.SaveChangesAsync();
            }
        }

        [HttpPost("add_doctors")]
        public async Task<int> AddDoctorAsync([FromForm] Doctor doctor, string password)
        {
            string path = Path.Combine(@"C:\Users\pc\Desktop\img", doctor.ImageName);
            using (Stream stream = new FileStream(path, FileMode.Create))
            {
                doctor.File.CopyTo(stream);
            }
            string hashedPassword = PasswordHasher.HashPassword(password);
            doctor.HashedPassword = hashedPassword;
            doctor.Status = "pending";
            doctor.LastLogin = default;

            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();
            return doctor.DoctorID;
        }


        [HttpPut("{doctorId}")]
        public async Task<IActionResult> UpdateDoctorAsync(int doctorId, Doctor doctor)
        {
            if (doctorId != doctor.DoctorID)
            {
                return BadRequest();
            }
            _context.Doctors.Update(doctor);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{doctorId}")]
        public async Task DeleteDoctorAsync(int doctorId)
        {
            var doctor = await _context.Doctors.FindAsync(doctorId);
            if (doctor != null)
            {
                _context.Doctors.Remove(doctor);
                await _context.SaveChangesAsync();
            }
        }



    }
}
