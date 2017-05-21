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
        [HttpGet]
        [Route("DeviceListAll")]
        public List<Device> ListDevice()
        {
            return _ctx.Devices.ToList();
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
        [Route("DeleteDeviceGroup")]
        public bool DeleteDeviceGroup(DeviceGroup group)
        {
            _ctx.DeviceGroups.Attach(group);
            _ctx.DeviceGroups.Remove(group);

            _ctx.SaveChanges();

            return true;
        }
        [HttpPost]
        [Route("DeleteDevice")]
        public bool DeleteDeviceGroup(Device device)
        {
            _ctx.Devices.Attach(device);
            _ctx.Devices.Remove(device);

            _ctx.SaveChanges();

            return true;
        }
        [Route("UpdateDeviceGroup")]
        public bool UpdateDeviceGroup(DeviceGroup group)
        {

                var result = _ctx.DeviceGroups.SingleOrDefault(b => b.Id == group.Id);
                if (result != null)
                {
                    result.GroupName = group.GroupName;
                    _ctx.SaveChanges();
                }

            return true;
        }
        [HttpPost]
        [Route("UpdateDevice")]
        public bool UpdateDevice(Device device)
        {

            var result = _ctx.Devices.SingleOrDefault(b => b.Id == device.Id);
            if (result != null)
            {
                result.Name = device.Name;
                result.Description = device.Description;
                result.DeviceGroupId = device.DeviceGroupId;
                _ctx.SaveChanges();
            }

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