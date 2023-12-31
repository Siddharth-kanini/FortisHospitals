﻿using DoctorApplication.Context;
using DoctorApplication.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ModelLibrary.Models;
using ModelLibrary.Models.Helpers;

namespace DoctorApplication.Services
{
    internal class DoctorRepository : IDoctorRepository
    {
        private readonly HospitalContext _context;

        public DoctorRepository(HospitalContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Doctor>> GetAllDoctorsAsync()
        {
            return await _context.Doctors.ToListAsync();
        }

        public async Task<Doctor> GetDoctorByIdAsync(int doctorId)
        {
            return await _context.Doctors.FindAsync(doctorId);
        }

        public async Task<Doctor> GetDoctorByUsernameAsync(string username)
        {
            return await _context.Doctors.FirstOrDefaultAsync(d => d.Username == username);
        }

        public async Task<int> AddDoctorAsync([FromForm] Doctor doctor, string password)
        {
            string path = Path.Combine(@"C:\Users\pc\React\fortishospitals\public\Img", doctor.ImageName);
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



        public async Task UpdateDoctorAsync(Doctor doctor)
        {
            _context.Doctors.Update(doctor);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteDoctorAsync(int doctorId)
        {
            var doctor = await _context.Doctors.FindAsync(doctorId);
            if (doctor != null)
            {
                _context.Doctors.Remove(doctor);
                await _context.SaveChangesAsync();
            }
        }


        public bool VerifyPassword(string password, string hashedPassword)
        {
            return PasswordHasher.VerifyPassword(password, hashedPassword);
        }
    }
}
