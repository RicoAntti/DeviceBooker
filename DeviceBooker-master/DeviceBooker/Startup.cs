using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(DeviceBooker.Startup))]
namespace DeviceBooker
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
         
        }
    }
}
