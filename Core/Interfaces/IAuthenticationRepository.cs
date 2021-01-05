using System.Threading.Tasks;
using TMDbLib.Objects.Account;
using TMDbLib.Objects.Authentication;
using Transversal.DTOs;

namespace Core.Interfaces
{
    public interface IAuthenticationRepository
    {
        Task<UserSession> Login(LoginDTO login);
        Task<AccountDetails> GetDetails(string sessionId);
    }
}