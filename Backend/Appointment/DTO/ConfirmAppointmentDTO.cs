using System.ComponentModel.DataAnnotations;

namespace AppointmentApplication.DTO
{
    public class ConfirmAppointmentDTO
    {
        [Required]
        public int Appointment_ID { get; set; }

        [Required]
        public string Status { get; set; } = "waiting";
    }
}
