using System.Threading.Tasks;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using TMDbLib.Objects.General;
using TMDbLib.Objects.Search;
using Transversal.DTOs;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RatedMovieController : ControllerBase
    {
        private readonly IRatedMovieRepository _ratedMovieRepository;

        public RatedMovieController(IRatedMovieRepository ratedMovieRepository)
        {
            _ratedMovieRepository = ratedMovieRepository;
        }

        [HttpGet()]
        public async Task<ActionResult<SearchContainer<SearchMovieWithRating>>> GetRatedMovies(string sessionId, int page)
        {
            return Ok(await _ratedMovieRepository.GetRatedMovies(sessionId, page));
        }

        [HttpPost()]
        public async Task<ActionResult> SetMovieRating([FromBody]RatedMovieRequestDTO request)
        {
            await _ratedMovieRepository.SetMovieRating(request.sessionId, request.movieId, request.rating);
            return Ok();
        }

        [HttpPost("remove")]
        public async Task<ActionResult> RemoveMovingRating([FromBody]RatedMovieRequestDTO request)
        {
            await _ratedMovieRepository.RemoveMovieRating(request.sessionId, request.movieId);
            return Ok();
        }

    }
}