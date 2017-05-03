namespace testi7.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddBRI : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Devices", "BorrowResId", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Devices", "BorrowResId");
        }
    }
}
