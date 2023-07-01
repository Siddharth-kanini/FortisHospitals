// IAppointmentRepository.cs

using System.Collections.Generic;
using System.Threading.Tasks;
using ModelLibrary.Models;

namespace Appointment.Interface
{
    public interface IAppointmentRepository
    {
        Task<int> CreateAppointment(Appoinment appointment);
        Task UpdateAppointment(Appoinment appointment);
        Task<Appoinment> GetAppointment(int appointmentId);
        Task<List<Appoinment>> GetAllAppointments();
        Task DeleteAppointment(int appointmentId);
    }
}
