// IAppointmentService.cs

using System.Collections.Generic;
using System.Threading.Tasks;
using Appointment.DTO;
using ModelLibrary.Models;

namespace Appointment.Interface
{
    public interface IAppointmentService
    {
        Task<int> CreateInitialAppointment(InitialAppointmentDTO initialAppointmentDTO);
        Task UpdateAppointment(UpdateAppointmentDTO updateAppointmentDTO);
        Task ConfirmAppointment(ConfirmAppointmentDTO confirmAppointmentDTO);
        Task<Appoinment> GetAppointment(int appointmentId);
        Task<List<Appoinment>> GetAllAppointments();
        Task DeleteAppointment(int appointmentId);
    }
}
