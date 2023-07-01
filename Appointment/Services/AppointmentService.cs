// AppointmentService.cs

using System.Collections.Generic;
using System.Threading.Tasks;
using Appointment.DTO;
using Appointment.Interface;
using ModelLibrary.Models;

namespace Appointment.Services
{
    public class AppointmentService : IAppointmentService
    {
        private readonly IAppointmentRepository _appointmentRepository;

        public AppointmentService(IAppointmentRepository appointmentRepository)
        {
            _appointmentRepository = appointmentRepository;
        }

        public async Task<int> CreateInitialAppointment(InitialAppointmentDTO initialAppointmentDTO)
        {
            var appointment = new Appoinment
            {
                Patient_ID = initialAppointmentDTO.Patient_ID,
                Doctor_ID = initialAppointmentDTO.Doctor_ID,
                Reason_of_visit = initialAppointmentDTO.Reason_of_visit,
                Status = initialAppointmentDTO.Status
            };

            return await _appointmentRepository.CreateAppointment(appointment);
        }

        public async Task UpdateAppointment(UpdateAppointmentDTO updateAppointmentDTO)
        {
            var appointment = await _appointmentRepository.GetAppointment(updateAppointmentDTO.Appointment_ID);

            if (appointment == null)
            {
                // Handle not found scenario
                return;
            }

            appointment.Patient_Status = updateAppointmentDTO.Patient_Status;
            appointment.Diagnosis = updateAppointmentDTO.Diagnosis;
            appointment.Treatment = updateAppointmentDTO.Treatment;

            await _appointmentRepository.UpdateAppointment(appointment);
        }

        public async Task ConfirmAppointment(ConfirmAppointmentDTO confirmAppointmentDTO)
        {
            var appointment = await _appointmentRepository.GetAppointment(confirmAppointmentDTO.Appointment_ID);

            if (appointment == null)
            {
                // Handle not found scenario
                return;
            }

            appointment.Status = confirmAppointmentDTO.Status;

            await _appointmentRepository.UpdateAppointment(appointment);
        }

        public async Task<Appoinment> GetAppointment(int appointmentId)
        {
            return await _appointmentRepository.GetAppointment(appointmentId);
        }

        public async Task<List<Appoinment>> GetAllAppointments()
        {
            return await _appointmentRepository.GetAllAppointments();
        }

        public async Task DeleteAppointment(int appointmentId)
        {
            await _appointmentRepository.DeleteAppointment(appointmentId);
        }
    }
}
