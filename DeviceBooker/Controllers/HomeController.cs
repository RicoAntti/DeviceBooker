using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DeviceBooker.Web.Controllers
{
    public class HomeController : Controller
    {

        [Route("")]
        public ActionResult Index()
        {
            return View();
        }

        [Route("Laitteet")]
        public ActionResult DeviceGroupList()
        {
            ViewBag.Message = "DeviceList";
            /*List<Model.DeviceGroup> list = null;
            using (var ctx = new Model.DeviceBookerContext())
            {
                list = ctx.DeviceGroups.ToList();
            }

            ViewBag.DeviceGroups = list;*/
            return View();
        }


        [Route("Search")]
        public ActionResult Search()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [Route("Laitteet/{groupid}")]
        public ActionResult DeviceList()
        {
            return View();
        }
    }
}