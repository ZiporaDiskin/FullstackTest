using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using Test.Models;

namespace Test.Controllers.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        /// <summary>
        /// Submit the form, retrun the current time and email 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        [IgnoreAntiforgeryToken]
        [Route("submitForm")]
        
        public IActionResult SubmitForm(FormModel request )
        {
            var response = new FormResponse();
            response.Email = request.Email;
            response.Time = DateTime.Now;
            return Ok(response);
        }
    }
}
