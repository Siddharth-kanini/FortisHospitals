using AdminApplication.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ModelLibrary.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace hotelbookingsystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizeController : ControllerBase
    {
        public IConfiguration? _configuration;
        private readonly AdminContext _context;
        private const string AdminRole = "Admin";

        public AuthorizeController(IConfiguration config, AdminContext context)
        {
            _configuration = config;
            _context = context;
        }

        

        [HttpPost("Admin")]
        public async Task<IActionResult> PostAdmin(Admin _adminData)
        {
            if (_adminData != null && _adminData.AdminName != null && _adminData.AdminPassword != null)
            {
                var admin = await GetAdmin(_adminData.AdminName, _adminData.AdminPassword);

                if (admin != null)
                {
                    //create claims details based on the user information
                    var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("AdminName", admin.AdminName.ToString()),
                        new Claim("AdminPassword",admin.AdminPassword),
                        new Claim(ClaimTypes.Role, AdminRole)

                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(30),
                        signingCredentials: signIn);

                    return Ok(new JwtSecurityTokenHandler().WriteToken(token));
                }
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            else
            {
                return BadRequest();
            }
        }

        private async Task<Admin> GetAdmin(string Username, string Password)
        {
            return await _context.Admins.FirstOrDefaultAsync(u => u.AdminName == Username && u.AdminPassword == Password);
        }
    }
}
