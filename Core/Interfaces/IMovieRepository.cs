using System.Collections.Generic;
using System.Threading.Tasks;
using TMDbLib.Objects.Discover;
using TMDbLib.Objects.General;
using TMDbLib.Objects.Movies;
using TMDbLib.Objects.Search;
using Transversal.DTOs;

namespace Core.Interfaces
{
    public interface IMovieRepository
    {
        Task<SearchContainer<SearchPerson>> SearchPersonByName(string name, int page);

        Task<SearchContainer<SearchMovie>> SearchMovie(MovieFilterDTO movieFilter);

        Task<Movie> GetMovie(int movieId);
    }
}