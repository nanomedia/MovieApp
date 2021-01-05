namespace Transversal.DTOs
{
    public class RatedMovieRequestDTO
    {
        public string sessionId { get; set; }
        public int movieId { get; set; }
        public double rating { get; set; }
    }
}