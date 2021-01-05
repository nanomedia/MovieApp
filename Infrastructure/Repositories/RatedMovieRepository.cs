using System.Threading.Tasks;
using Core.Interfaces;
using Core.Services;
using TMDbLib.Client;
using TMDbLib.Objects.Authentication;
using TMDbLib.Objects.General;
using TMDbLib.Objects.Search;

namespace Infrastructure.Repositories
{
    public class RatedMovieRepository:IRatedMovieRepository
    {
        private readonly TMDbClient _client;

        public RatedMovieRepository(TmDbService tmDbService)
        {
            _client = tmDbService.client;
        }

        public async Task<SearchContainer<SearchMovieWithRating>> GetRatedMovies(string sessionId, int page)
        {
            _client.SetSessionInformation(sessionId, SessionType.UserSession);
            return await _client.AccountGetRatedMoviesAsync(page);
        }
        public async Task SetMovieRating(string sessionId, int movieId, double rating)
        {
            _client.SetSessionInformation(sessionId, SessionType.UserSession);
             await _client.MovieSetRatingAsync(movieId,rating);
        }
        public async Task RemoveMovieRating(string sessionId, int movieId)
        {
            _client.SetSessionInformation(sessionId, SessionType.UserSession);
             await _client.MovieRemoveRatingAsync(movieId);
        }
    }
}