namespace DeviceBooker.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddReservation : DbMigration
    {
        public override void Up()
        {
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
            DropIndex("dbo.Reservations", new[] { "DeviceId" });
            DropTable("dbo.Reservations");

        }
    }
}
