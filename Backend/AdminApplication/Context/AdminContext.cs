using Microsoft.EntityFrameworkCore;
using ModelLibrary.Models;

namespace AdminApplication.Models
{
    public class AdminContext : DbContext
    {


        public DbSet<Doctor> Doctors { get; set; }

        public DbSet<Patient> Patients { get; set; }

        public DbSet<Appoinment> Appoinments { get; set; }

        public DbSet<Admin> Admins { get; set; }


        public AdminContext(DbContextOptions<AdminContext> options) : base(options) { }
    }
}
