using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLibrary.Models
{
    public class Appointment
    {
        [Key]
        public int Appoinment_ID { get; set; }

        [ForeignKey("Doctor")]
        public int Doctor_ID { get; set; }
        [ForeignKey("Patient")]
        public int Patient_ID { get; set; }
        public string? Consultation { get; set; }
        public string? Status { get; set; }
        public Doctor? Doctor { get; set; }
        public Patient? Patient { get; set; }
    }
}
