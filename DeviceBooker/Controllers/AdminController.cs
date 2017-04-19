using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DeviceBooker.Web.Controllers
{
    public class AdminController : Controller
    {

        [Route("CreateGroup")]
        [Route("Luo laiteryhmä")]
        public ActionResult CreateGroup()
        {
            ViewBag.Message = "CreateGroup";
            /*List<Model.DeviceGroup> list = null;
            using (var ctx = new Model.DeviceBookerContext())
            {
                list = ctx.DeviceGroups.ToList();
            }

            ViewBag.DeviceGroups = list;*/
            return View();
        }

        [Route("CreateDevice")]
        [Route("Lisää laite ryhmään")]
        public ActionResult CreateDevice()
        {
            ViewBag.Message = "CreateGroup";

            return View();
        }

    }
}