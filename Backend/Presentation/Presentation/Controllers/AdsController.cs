using Application.IServices;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AdsController(IAdService adService) : ControllerBase
    {

        [HttpGet]
        public IActionResult GetAllAds()
        {
            var ads = adService.GetAllAds();
            return Ok(ads);
        }

        [HttpGet("{id}")]
        public IActionResult GetAdById(int id)
        {
            var ad = adService.GetAdById(id);
            if (ad == null)
            {
                return NotFound(new { Message = "Ad not found." });
            }

            return Ok(ad);
        }

        [HttpPost]
        public IActionResult CreateAd([FromBody] Ad newAd)
        {
            if (newAd == null)
            {
                return BadRequest(new { Message = "Invalid ad data." });
            }

            adService.AddAd(newAd);
            return CreatedAtAction(nameof(GetAdById), new { id = newAd.Id }, newAd);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateAd(int id, [FromBody] Ad updatedAd)
        {
            if (updatedAd == null || id != updatedAd.Id)
            {
                return BadRequest(new { Message = "Invalid ad data." });
            }

            var isUpdated = adService.UpdateAd(id, updatedAd);
            if (!isUpdated)
            {
                return NotFound(new { Message = "Ad not found." });
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteAd(int id)
        {
            var isDeleted = adService.DeleteAd(id);
            if (!isDeleted)
            {
                return NotFound(new { Message = "Ad not found." });
            }

            return NoContent();
        }
    }
}