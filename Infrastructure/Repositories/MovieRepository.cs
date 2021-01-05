using TMDbLib.Client;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using TMDbLib.Objects.General;
using TMDbLib.Objects.Search;
using Core.Interfaces;
using System.Collections.Generic;
using TMDbLib.Objects.Discover;
using System;
using Transversal.DTOs;
using System.Linq;
using TMDbLib.Objects.Movies;
using Core.Services;

namespace Infrastructure.Repositories
{
    public class MovieRepository : IMovieRepository
    {
        private readonly TMDbClient _client;

        public MovieRepository(TmDbService tmDbService)
        {
            _client = tmDbService.client;
        }
        public async Task<SearchContainer<SearchPerson>> SearchPersonByName(string name, int page = 1)
        {
            return await _client.SearchPersonAsync(query: name, page);
        }

        private async Task<SearchContainer<SearchMovie>> SearchByMovieName(MovieFilterDTO movieFilter)
        {
            return await _client.SearchMovieAsync(movieFilter.Name);
        }

        private async Task<SearchContainer<SearchMovie>> SearchMovieByPersonAndReleasedDate(MovieFilterDTO movieFilter)
        {
            var discoverQuery = _client.DiscoverMoviesAsync();

            if (!string.IsNullOrEmpty(movieFilter.Persons))
            {
                var personIds = movieFilter.Persons.Split(',')
                                                   .Select(int.Parse)
                                                   .ToList();

                discoverQuery.IncludeWithAllOfPeople(personIds);
            }

            if (movieFilter.ReleaseDateAfter != null)
            {
                discoverQuery.WherePrimaryReleaseDateIsAfter(movieFilter.ReleaseDateAfter.Value);
            }

            if (movieFilter.ReleaseDateBefore != null)
            {
                discoverQuery.WherePrimaryReleaseDateIsBefore(movieFilter.ReleaseDateBefore.Value);
            }

            var result = await discoverQuery.Query(movieFilter.NumberPage.Value);

            return result;
        }

        public async Task<SearchContainer<SearchMovie>> SearchMovie(MovieFilterDTO movieFilter)
        {
            if (!string.IsNullOrEmpty(movieFilter.Name))
            {
                return await SearchByMovieName(movieFilter);
            }

            return await SearchMovieByPersonAndReleasedDate(movieFilter);
        }

        public async Task<Movie> GetMovie(int movieId)
        {
            return await _client.GetMovieAsync(movieId, MovieMethods.Recommendations);
        }

    }
}