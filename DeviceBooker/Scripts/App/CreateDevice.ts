module CreateDevice {

    var deviceList: Models.Device[];
    var deviceGroupList: Models.DeviceGroup[];
    var selectedGroup;


    export function Init() {

        RegisterEvents();
        LoadData();


    }

    function RegisterEvents() {
        $("#createDeviceBtn").on('click', function (ev) {
            var DG = new Models.Device();
            DG.Name = $("#DeviceNameEdit").val();
            var asd = $("#DeviceDescriptionEdit").val();
            DG.Description = asd;
            DG.DeviceGroupId = getGroupId();
            
            var def = DeviceFunctions.CreateNewDevice(DG);
            def.done((ok: boolean) => {
                Utils.unblockUI();
                if (ok) {
                    alert("onnistui");
                } else {
                    alert("Virhe kutsussa");
                }
            });

        });
        $('#deviceGroupList').change(function () {
            selectedGroup = $(this).find("option:selected").text();
 
        });
        


    }

    function LoadData() {
        Utils.blockUI("Ladataan laiteryhmiä.. odota hetki");
        var def = DeviceFunctions.ListDeviceGroups();
        def.done((data: Models.DeviceGroup[]) => {
            Utils.unblockUI();
            if (data) {
                deviceGroupList = data;
                selectedGroup = deviceGroupList[0].GroupName;
                fillDeviceGroupList(deviceGroupList);
            } else {
                alert("virhe");
            }
        });
        
    }

    function fillDeviceGroupList(devicegrouplist: Models.DeviceGroup[]) {
       
        for (var i = 0; i < deviceGroupList.length; i++) {
            var x = document.createElement("option");
            var t = document.createTextNode(devicegrouplist[i].GroupName);
            x.appendChild(t);
            document.getElementById("deviceGroupList").appendChild(x);           
        }

    }
    function getGroupId(): number {
        var id = -1;
        for (var i = 0; i < deviceGroupList.length; i++) {
            if (deviceGroupList[i].GroupName == selectedGroup)
                id = deviceGroupList[i].Id;
        }
        return id;
    }
}