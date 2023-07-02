using ModelLibrary.Models;

namespace DoctorApplication.DTO
{
    public class DoctorWithPassword
    {
        public Doctor Doctor { get; set; }
        public string Password { get; set; }
    }
}
