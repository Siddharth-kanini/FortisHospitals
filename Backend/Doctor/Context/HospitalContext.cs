using Microsoft.EntityFrameworkCore;
using ModelLibrary.Models;

namespace DoctorApplication.Context
{
    public class HospitalContext : DbContext
    {


        public DbSet<Doctor> Doctors { get; set; }


        public HospitalContext(DbContextOptions<HospitalContext> options) : base(options) { }
    }
}

