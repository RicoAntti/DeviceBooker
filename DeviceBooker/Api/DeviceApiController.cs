using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using DeviceBooker.Model;

namespace DeviceBooker.Web.Api
{

    [RoutePrefix("Api")]

    public class DeviceApiController : ApiController
    {
        // GET: DeviceApi

        private DeviceBookerContext _ctx = new DeviceBookerContext();

        [HttpGet]
        [Route("DeviceGroupList")]
        public List<DeviceGroup> ListDeviceGroups()
        {
            var test = System.Web.HttpContext.Current.User.Identity.Name;
            System.Diagnostics.Debug.WriteLine(test.ToString());
            return _ctx.DeviceGroups.ToList();
        }

        [HttpGet]
        [Route("DeviceList/{id}")]
        public List<Device> ListDevice(int id)
        {
            return _ctx.Devices.Where(r => r.DeviceGroupId == id).ToList();
        }

        [HttpPost]
        [Route("CreateGroup")]
        public bool CreateGroup(DeviceGroup newGroup)
        {
            _ctx.DeviceGroups.Add(newGroup);
            _ctx.SaveChanges();
            return true;
        }

        [Route("CreateDevice")]
        public bool CreateDevice(Device newDevice)
        {
            _ctx.Devices.Add(newDevice);
            _ctx.SaveChanges();
            return true;
        }

        [HttpGet]
        [Route("Reservation/{id}")]
        public List<Reservation> GetReservations(int id)
        {
            List<Reservation> Return_List = new List<Reservation>();
            Return_List.AddRange(_ctx.Reservations.Where(res => res.DeviceId == id).ToList());
            return Return_List;
        }

        [HttpPost]
        [Route("Reservation")]
        public void AddReservation(Reservation newReservation)
        {
            /*if (HttpContext.Current.Request.Form.AllKeys.Any())
            {
                string title = HttpContext.Current.Request.Form.Get("Title");
                System.Diagnostics.Debug.WriteLine("hei: " + title);
            }*/
            newReservation.Title = System.Web.HttpContext.Current.User.Identity.Name;
            _ctx.Reservations.Add(newReservation);
            _ctx.SaveChanges();
        }
    }
}