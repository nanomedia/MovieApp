using System.Threading.Tasks;
using TMDbLib.Objects.General;
using TMDbLib.Objects.Search;

namespace Core.Interfaces
{
    public interface IRatedMovieRepository
    {

        Task<SearchContainer<SearchMovieWithRating>> GetRatedMovies(string sessionId, int page);

        Task SetMovieRating(string sessionId, int movieId, double rating);

        Task RemoveMovieRating(string sessionId, int movieId);
    }
}