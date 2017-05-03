namespace testi7.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddBorrow : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Devices", "IsBorrow", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Devices", "IsBorrow");
        }
    }
}
