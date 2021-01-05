using System.Threading.Tasks;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using TMDbLib.Objects.Authentication;
using Transversal.DTOs;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationRepository _auth;
        public AuthenticationController(IAuthenticationRepository auth)
        {
            _auth = auth;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login([FromBody] LoginDTO login)
        {
            var result = await _auth.Login(login);
            var account = await _auth.GetDetails(result.SessionId);
            return new UserDTO
            {
                SessionId = result.SessionId,
                UserName = account.Username,
                Name = account.Name
            };
        }

        [HttpGet("details")]
        public async Task<ActionResult<UserDTO>> GetDetails(string sessionId)
        {
            var account = await _auth.GetDetails(sessionId);
            return new UserDTO
            {
                UserName = account.Username,
                Name = account.Name
            };
        }
    }
}