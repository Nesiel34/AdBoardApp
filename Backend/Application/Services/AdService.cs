using Application.IServices;
using Domain.Entities;
using Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    internal class AdService(IAdRepository adRepository) : IAdService
    {
        public void AddAd(Ad newAd)
        {
            var ads = GetAllAds();
            newAd.Id = ads.Any() ? ads.Max(ad => ad.Id) + 1 : 1;
            adRepository.AddAd(newAd);
        }

        public bool DeleteAd(int id)
        {
            return adRepository.DeleteAd(id);
        }

        public Ad GetAdById(int id)
        {
            return adRepository.GetAdById(id);
        }

       public IEnumerable<Ad> GetAllAds()
        {
            return adRepository.GetAllAds();
        }

       public bool UpdateAd(int id, Ad updatedAd)
        {
            return adRepository.UpdateAd(id, updatedAd);
        }
    }
}
