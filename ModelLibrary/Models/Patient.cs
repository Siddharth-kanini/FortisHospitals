using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLibrary.Models
{
    public class Patient
    {
        [Key]
        public int Patient_ID { get; set; }
        [Required]
        public string? Patient_Name { get; set; }
        [Required]
        [Range(1, 150)]
        public int Age { get; set; }
        [Required]
        [RegularExpression("^(male|female|other)$")]
        public string? Gender { get; set; }
        [Required]
        public string? BloodGroup { get; set; }
        [Required]
        public string? Patient_Address { get; set; }
        [Required]
        [RegularExpression(@"^\d{10}$")]
        public int Patient_Phone { get; set; }
        [Required]
        [EmailAddress]
        public string? Patient_Email { get; set; }
        [Required]
        public string? Patient_UserName { get; set; }
        [Required]
        public string? Patient_Password { get; set; }
        [Required]
        public DateTime Patient_DOB { get; set; }
        [Required]
        [RegularExpression(@"^(admitted|not admitted)$")]
        public string? Patient_Status { get; set; }
        [Required]
        public int Patient_Payment { get; set; }
    }


}
