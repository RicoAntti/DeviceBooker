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

        [HttpGet]
        [Route("GetReservationData")]
        public List<ReservationData> GetReservationData()
        {
            List<ReservationData> Return_List = new List<ReservationData>();

            var tempDev = _ctx.Devices.Where(d => d.IsBorrow == true).ToList();

            foreach (var td in tempDev)
            {
                ReservationData _rd = new ReservationData();
                _rd.Reservation = _ctx.Reservations.Where(r => r.Id == td.BorrowResId).Single();
                _rd.IsBorrow = true;
                _rd.DeviceName = td.Name;
                var tempGroup = _ctx.DeviceGroups.Where(dg => dg.Id == td.DeviceGroupId).Single();
                _rd.GroupName = tempGroup.GroupName;
                _rd.DeviceId = td.Id;
                Return_List.Add(_rd);
            }

            var yesterday = DateTime.Today.AddDays(-1);
            var nextWeek = DateTime.Today.AddDays(7);
            var tempRes = _ctx.Reservations.Where(res => res.EndTime < nextWeek && res.EndTime > yesterday);

            foreach (var res in tempRes)
            {
                var tempD = _ctx.Devices.Where(d => d.Id == res.DeviceId).Single();
                if (tempD.IsBorrow == false)
                {
                    ReservationData _rd = new ReservationData();
                    _rd.Reservation = res;
                    _rd.DeviceName = tempD.Name;
                    var tempG = _ctx.DeviceGroups.Where(dg => dg.Id == tempD.DeviceGroupId).Single();
                    _rd.GroupName = tempG.GroupName;
                    _rd.DeviceId = res.DeviceId;

                    Return_List.Add(_rd);
                }
            }

            return Return_List;
        }

        [HttpGet]
        [Route("Borrow/{DevId}_{ResId}")]
        public void Borrow(int DevId, int ResId)
        {
            var temp = _ctx.Devices.Where(d => d.Id == DevId).Single();
            temp.IsBorrow = true;
            temp.BorrowResId = ResId;
            _ctx.SaveChanges();
        }

        [HttpGet]
        [Route("Return/{id}")]
        public void Return(int id)
        {
            var temp = _ctx.Devices.Where(d => d.Id == id).Single();
            temp.IsBorrow = false;
            temp.BorrowResId = 0;
            _ctx.SaveChanges();
        }
    }
}