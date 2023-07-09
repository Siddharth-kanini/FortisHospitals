using System.ComponentModel.DataAnnotations;

namespace AppointmentApplication.DTO
{
    public class UpdateAppointmentDTO 
    {
        [Required]
        public int Appoinment_ID { get; set; }

        [Required]
        public string Patient_Status { get; set; } = "consulting";

        public string Diagnosis { get; set; }

        public string Treatment { get; set; }
    }

}
