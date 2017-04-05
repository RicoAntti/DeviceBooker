namespace DeviceBooker.Model.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<DeviceBooker.Model.DeviceBookerContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(DeviceBooker.Model.DeviceBookerContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            var dg = new DeviceGroup { GroupName = "Raspberry Pi"};
            context.DeviceGroups.AddOrUpdate(
              p => p.GroupName,
              dg
            );

            context.Devices.AddOrUpdate(
              p => p.Name,
              new Device { Name = "A1", DeviceGroup = dg },
              new Device { Name = "B2", DeviceGroup = dg }
            );
        }
    }
}
