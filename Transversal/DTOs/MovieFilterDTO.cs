using System;

namespace Transversal.DTOs
{
    public class MovieFilterDTO
    {
        public string Name { get; set; }

        public string Persons { get; set; }

        public DateTime? ReleaseDateAfter { get; set; }
        public DateTime? ReleaseDateBefore { get; set; }

        public int? NumberPage { get; set; } = 1;
    }
}