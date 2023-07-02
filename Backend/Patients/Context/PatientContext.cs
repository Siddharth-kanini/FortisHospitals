﻿using Microsoft.EntityFrameworkCore;
using ModelLibrary.Models;

namespace PatientApplication.Context
{
    public class PatientContext : DbContext
    {
        public DbSet<Patient> Patients { get; set; }
        public PatientContext(DbContextOptions options) : base(options)
        {

        }

    }
}
