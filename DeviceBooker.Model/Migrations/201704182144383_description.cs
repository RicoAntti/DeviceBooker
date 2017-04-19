namespace DeviceBooker.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class description : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Devices", "Description", c => c.String());
        }
        
        public override void Down()
        {

        }
    }
}
