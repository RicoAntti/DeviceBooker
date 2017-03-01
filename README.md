# DeviceBooker
Projekti4

HUOM! Kun ajat projektin VS:llä, linkki ei tule toimimaan, ellei se ohjaa suoraan localhost:xxxx -osoitteeseen. Eli jos linkkiin ilmestyy vaikka localhost:xxxx/Home/Index, poista /Home/Index linkistä

Asenna SQL Server 

Aaa SQL management studio, jotta näet toimiiko seuraava:
  
Visual Studiossa: View - Other Windows - Package Manager Console
Valitse default project - valikosta DeviceBooker.Model

  Kirjoita:
    1) Enable-Migrations (saattaa tulla, että already enabled)
    2) Add-Migrations Initial
    3) Update-Database
  
Toiminta:

HomeController - Avaa viewin

_layout.cshtml 
-tiedosto lataa joka viewiiin jscriptejä.

DeviceGrouplist.cshtml
-tiedoston alhaalla käynnistyy DeviceGouplist.ts -tiedoston Init() komento

DeviceFunctions.ts:n Api.Get viittaa ApiHelper.ts -tiedostoon

ApiHelper.ts taas viittaa DeviceApiControlleriin.

BUTTON-malli

(fillDeviceGroupsList -funktio)
            var dgl = deviceGroupList[i];
            copy.find('BUTTONIN NIMI').attr('href', '/[kansio]/' + dgl.[muuttuja]);
            
(.cshtml)
           <a class="btn btn-xs btn-default BUTTONIN NIMI" href="#">Nappulan teksti</a>
