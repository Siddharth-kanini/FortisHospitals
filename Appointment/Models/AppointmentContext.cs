using Microsoft.EntityFrameworkCore;
using ModelLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Appointment.Models
{
    public class AppointmentContext : DbContext
    {


        public DbSet<Doctor> Doctors { get; set; }

        public DbSet<Patient> Patients { get; set; }

        public DbSet<Appoinment> Appoinments { get; set; }

        public DbSet<Admin> Admins { get; set; }


        public AppointmentContext(DbContextOptions<AppointmentContext> options) : base(options) { }
    }
}

