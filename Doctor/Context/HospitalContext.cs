using Microsoft.EntityFrameworkCore;
using ModelLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Doctorapp.Models
{
    public class HospitalContext : DbContext
    {


        public DbSet<Doctor> Doctors { get; set; }


        public HospitalContext(DbContextOptions<HospitalContext> options) : base(options) { }
    }
}

