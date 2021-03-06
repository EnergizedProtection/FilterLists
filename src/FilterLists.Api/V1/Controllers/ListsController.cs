﻿using System.Threading.Tasks;
using FilterLists.Data.Entities;
using FilterLists.Services.FilterList;
using FilterLists.Services.Seed;
using FilterLists.Services.Seed.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace FilterLists.Api.V1.Controllers
{
    public class ListsController : BaseController
    {
        private readonly FilterListService filterListService;

        public ListsController(IMemoryCache memoryCache, SeedService seedService, FilterListService filterListService) :
            base(memoryCache, seedService) => this.filterListService = filterListService;

        [HttpGet]
        public async Task<IActionResult> Index() =>
            Json(await MemoryCache.GetOrCreate("ListsController_Index", entry =>
            {
                entry.SlidingExpiration = MemoryCacheSlidingExpirationDefault;
                return filterListService.GetAllSummariesAsync();
            }));

        [HttpGet]
        [Route("{id}")]
        //TODO: respond with appropriate exception if negative id queried
        public async Task<IActionResult> GetById(int id) =>
            Json(await MemoryCache.GetOrCreate("ListsController_GetById_" + id, entry =>
            {
                entry.SlidingExpiration = MemoryCacheSlidingExpirationDefault;
                return filterListService.GetDetailsAsync((uint)id);
            }));

        [HttpGet("seed")]
        public async Task<IActionResult> Seed() =>
            Json(await MemoryCache.GetOrCreate("ListsController_Seed", entry =>
            {
                entry.SlidingExpiration = MemoryCacheSlidingExpirationDefault;
                return SeedService.GetAllAsync<FilterList, FilterListSeedDto>();
            }));
    }
}