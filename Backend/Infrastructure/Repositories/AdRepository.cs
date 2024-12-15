using Domain.Entities;
using Domain.Repositories;
using Newtonsoft.Json;

namespace Infrastructure.Repositories
{
    public class AdRepository:IAdRepository
    {
        private const string FilePath = "ads.json";

        public List<Ad> GetAllAds()
        {
            if (!File.Exists(FilePath))
            {
                return new List<Ad>();
            }

            var json = File.ReadAllText(FilePath);
            return JsonConvert.DeserializeObject<List<Ad>>(json) ?? new List<Ad>();
        }

        public Ad GetAdById(int id)
        {
            var ads = GetAllAds();
            return ads.Find(ad => ad.Id == id);
        }

        public void AddAd(Ad newAd)
        {
            var ads = GetAllAds();
            ads.Add(newAd);
            SaveAds(ads);
        }

        public bool UpdateAd(int id, Ad updatedAd)
        {
            var ads = GetAllAds();
            var index = ads.FindIndex(ad => ad.Id == id);
            if (index == -1) return false;

            ads[index] = updatedAd;
            SaveAds(ads);
            return true;
        }

        public bool DeleteAd(int id)
        {
            var ads = GetAllAds();
            var adToRemove = ads.Find(ad => ad.Id == id);
            if (adToRemove == null) return false;

            ads.Remove(adToRemove);
            SaveAds(ads);
            return true;
        }

        public void SaveAds(List<Ad> ads)
        {
            var json = JsonConvert.SerializeObject(ads, Formatting.Indented);
            File.WriteAllText(FilePath, json);
        }

    }
}
