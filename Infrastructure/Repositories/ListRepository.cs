using System.Threading.Tasks;
using Core.Interfaces;
using Core.Services;
using TMDbLib.Client;
using TMDbLib.Objects.General;
using TMDbLib.Objects.Lists;
using Transversal.DTOs;

namespace Infrastructure.Repositories
{
    public class ListRepository : IListRepository
    {
        private readonly TMDbClient _client;

        public ListRepository(TmDbService tmDbService)
        {
            _client = tmDbService.client;
        }

        #region List Maintanance
        public async Task<SearchContainer<AccountList>> GetListOfCurrentUser()
        {
            return await _client.AccountGetListsAsync();
        }

        public async Task<GenericList> GetListDetail(string listId)
        {
            return await _client.GetListAsync(listId);
        }

        public async Task<string> Create(ListDTO list)
        {
            return await _client.ListCreateAsync(list.Name, list.Description);
        }

        public async Task<bool> ClearList(string listId)
        {
            return await _client.ListClearAsync(listId);
        }

        public async Task<bool> DeleteList(string listId)
        {
            return await _client.ListDeleteAsync(listId);
        }

        #endregion


        #region List Movie Maintanance 
        public async Task<bool> AddMovie(string listId, int movieId)
        {
            return await _client.ListAddMovieAsync(listId, movieId);
        }

        public async Task<bool> RemoveMovie(string listId, int movieId)
        {
            return await _client.ListRemoveMovieAsync(listId, movieId);
        }      

        public async Task<GenericList> GetMoviesByListId(string listId)
        {
            return await _client.GetListAsync(listId);
        }

         #endregion




    }
}