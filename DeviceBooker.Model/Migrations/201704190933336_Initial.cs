namespace testi7.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.DeviceGroups",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        GroupName = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Devices",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        DeviceGroupId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.DeviceGroups", t => t.DeviceGroupId, cascadeDelete: true)
                .Index(t => t.DeviceGroupId);
            
            CreateTable(
                "dbo.Reservations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        StartTime = c.DateTime(nullable: false),
                        EndTime = c.DateTime(nullable: false),
                        DeviceId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Devices", t => t.DeviceId, cascadeDelete: true)
                .Index(t => t.DeviceId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Reservations", "DeviceId", "dbo.Devices");
            DropForeignKey("dbo.Devices", "DeviceGroupId", "dbo.DeviceGroups");
            DropIndex("dbo.Reservations", new[] { "DeviceId" });
            DropIndex("dbo.Devices", new[] { "DeviceGroupId" });
            DropTable("dbo.Reservations");
            DropTable("dbo.Devices");
            DropTable("dbo.DeviceGroups");
        }
    }
}
