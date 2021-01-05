using System.Threading.Tasks;
using TMDbLib.Objects.General;
using TMDbLib.Objects.Lists;
using Transversal.DTOs;

namespace Core.Interfaces
{
    public interface IListRepository
    {
        #region List Maintanance
        Task<SearchContainer<AccountList>> GetListOfCurrentUser();

        Task<GenericList> GetListDetail(string listId);

        Task<string> Create(ListDTO list);

        Task<bool> ClearList(string listId);

        Task<bool> DeleteList(string listId);

        #endregion
    
        #region List Movie Maintanance 
        Task<bool> AddMovie(string listId, int movieId);

        Task<bool> RemoveMovie(string listId, int movieId);

        Task<GenericList> GetMoviesByListId(string listId);

         #endregion
    }
}