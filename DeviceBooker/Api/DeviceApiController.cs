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
    }
}