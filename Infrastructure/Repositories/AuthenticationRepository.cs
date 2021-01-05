using System.Threading.Tasks;
using Core.Interfaces;
using Core.Services;
using Microsoft.Extensions.Configuration;
using TMDbLib.Client;
using TMDbLib.Objects.Account;
using TMDbLib.Objects.Authentication;
using Transversal.DTOs;

namespace Infrastructure.Repositories
{
    public class AuthenticationRepository : IAuthenticationRepository
    {
        private readonly TMDbClient _client;

        public AuthenticationRepository(TmDbService tmDbService)
        {
            _client = tmDbService.client;
        }

        public async Task<UserSession> Login(LoginDTO login)
        {
            //Session id
            //d0f85a9fc646f43e6dbb0327143699ca7eaa833b
            // var token = await _client.AuthenticationRequestAutenticationTokenAsync();
            var userSession = await _client.AuthenticationGetUserSessionAsync(login.userName, login.password, default);

            if (userSession.Success)
            {
                _client.SetSessionInformation(userSession.SessionId, SessionType.UserSession);
            }

            return userSession;
        }



        public async Task<AccountDetails> GetDetails(string sessionId)
        {
            _client.SetSessionInformation(sessionId, SessionType.UserSession);
            return await _client.AccountGetDetailsAsync();
        }




    }
}