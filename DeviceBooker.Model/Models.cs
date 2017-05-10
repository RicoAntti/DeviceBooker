using System;
using System.Collections.Generic;
//Nämä piti osata importaa (mitä lie ovat):
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

/*  Täällä määritetään tietokannan taulut
*       Device - yksittäinen laite
*       DeviceGroup - laiteryhmä, esim Raspberry Pi
*/

namespace DeviceBooker.Model
{
    public class Device
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public bool IsBorrow { get; set; }
        public int BorrowResId { get; set; }

        //Seuraavassa luodaan yhteys ja vierasavain DeviceGroupiin:
        public int DeviceGroupId { get; set; }
        [ForeignKey("DeviceGroupId")]
        public virtual DeviceGroup DeviceGroup { get; set; }
    }

    public class DeviceGroup
    {
        public int Id { get; set; }

        public string GroupName { get; set; }

    }

    public class Reservation
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        //Seuraavassa luodaan yhteys ja vierasavain DeviceGroupiin:
        public int DeviceId { get; set; }
        [ForeignKey("DeviceId")]
        public virtual Device Device { get; set; }
    }

    public class ReservationData
    {
        public Reservation Reservation { get; set; }
        public string DeviceName { get; set; }
        public int DeviceId { get; set; }
        public string GroupName { get; set; }
        public bool IsBorrow { get; set; }
        public int BorrowResId { get; set; }
    }
}

/*  Kun SQL Server on käynnissä ja *Context.cs luotu
*       View -> Other Windows -> Package manager console
*   Valitse Default Project: DeviceBooker.Model
*   Kirjoita: 
*       Enable-Migrations
*       Add-Migration Initial
*       Update-Database
*/
