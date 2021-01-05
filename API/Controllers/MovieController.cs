using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using TMDbLib.Objects.Discover;
using TMDbLib.Objects.General;
using TMDbLib.Objects.Movies;
using TMDbLib.Objects.Search;
using Transversal.DTOs;

namespace API.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class MovieController : ControllerBase
    {
        private readonly IMovieRepository _movieRepository;

        public MovieController(IMovieRepository movieRepository)
        {
            _movieRepository = movieRepository;
        }

        [HttpGet("getPersonByName")]
        public async Task<ActionResult<SearchContainer<SearchPerson>>> GetPersonsByName(string name, int page = 1)
        {
            return Ok(await _movieRepository.SearchPersonByName(name, page));
        }

        [HttpGet("getMovie")]
        public async Task<ActionResult<Movie>> GetMovie(int movieId)
        {
            return Ok(await _movieRepository.GetMovie(movieId));
        }


        [HttpPost("searchMovie")]
        public async Task<ActionResult<SearchContainer<SearchMovie>>> SearchMovie([FromBody] MovieFilterDTO filter)
        {
            return Ok(await _movieRepository.SearchMovie(filter));
        }

    }
}