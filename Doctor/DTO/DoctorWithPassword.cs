using ModelLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Doctorapp.DTO
{
    public class DoctorWithPassword
    {
        public Doctor Doctor { get; set; }
        public string Password { get; set; }
    }
}
