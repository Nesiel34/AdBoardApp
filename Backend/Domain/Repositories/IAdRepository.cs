using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IAdRepository
    {
        public List<Ad> GetAllAds();
        public Ad GetAdById(int id);
        public void AddAd(Ad newAd);
        public bool UpdateAd(int id, Ad updatedAd);
        public bool DeleteAd(int id);
        protected void SaveAds(List<Ad> ads);

    }
}
