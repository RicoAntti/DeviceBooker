using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceBooker.Model
{
    public class DeviceBookerContext : DbContext
    {
        static DeviceBookerContext()
        {
            Database.SetInitializer(new CreateDatabaseIfNotExists<DeviceBookerContext>());
        }
        public DeviceBookerContext()
            : base("testiDB")
        {
            // EF 6 feature
            //Database.Log = s => Logger.Trace(s);
        }

        public DbSet<Device> Devices { get; set; }

        public DbSet<DeviceGroup> DeviceGroups { get; set; }

    }
}
