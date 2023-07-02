using System.ComponentModel.DataAnnotations;

namespace AdminApplication.DTO
{
    public class UpdateDoctorStatusDTO
    {
        [Required]
        public int DoctorID { get; set; }

        [Required]
        public string Status { get; set; }
    }
}
