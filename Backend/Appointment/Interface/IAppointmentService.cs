﻿using System.Collections.Generic;
using System.Threading.Tasks;
using AppointmentApplication.DTO;
using ModelLibrary.Models;

namespace AppointmentApplication.Interface
{
    public interface IAppointmentService
    {
        Task<int> CreateInitialAppointment(InitialAppointmentDTO initialAppointmentDTO);
        Task UpdateAppointment(UpdateAppointmentDTO updateAppointmentDTO);
        Task ConfirmAppointment(ConfirmAppointmentDTO confirmAppointmentDTO);
        Task<Appoinment> GetAppointment(int appoinmentId);
        Task<List<Appoinment>> GetAllAppointments();
        Task DeleteAppointment(int appoinmentId);
        Task<List<Appoinment>> GetAppointmentsByUsername(string username);



    }
}
