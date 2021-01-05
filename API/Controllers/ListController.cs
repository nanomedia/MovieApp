using System.Threading.Tasks;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Transversal.DTOs;

namespace API.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class ListController : ControllerBase
    {
        private readonly IListRepository _listRepository;
        public ListController(IListRepository listRepository)
        {
            _listRepository = listRepository;
        }

        [HttpPost("createlist")]
        public async Task<ActionResult<bool>> CreateList([FromBody] ListDTO listDTO)
        {
            return Ok(await _listRepository.Create(listDTO));
        }
        [HttpGet("userlists")]
        public async Task<ActionResult<bool>> UserLists()
        {
            return Ok(await _listRepository.GetListOfCurrentUser());
        }


    }
}