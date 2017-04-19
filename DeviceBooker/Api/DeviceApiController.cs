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

        [HttpPost]
        [Route("Reservation")]
        public void AddReservation(Reservation newReservation)
        {
            /*if (HttpContext.Current.Request.Form.AllKeys.Any())
            {
                string title = HttpContext.Current.Request.Form.Get("Title");
                System.Diagnostics.Debug.WriteLine("hei: " + title);
            }*/
            System.Diagnostics.Debug.WriteLine("title: " + newReservation.Title);
            System.Diagnostics.Debug.WriteLine("s: " + newReservation.StartTime);
            System.Diagnostics.Debug.WriteLine("e: " + newReservation.EndTime);
            System.Diagnostics.Debug.WriteLine("dvid: " + newReservation.DeviceId);
            _ctx.Reservations.Add(newReservation);
            _ctx.SaveChanges();
        }
    }
}