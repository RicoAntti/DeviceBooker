var CreateDevice;
(function (CreateDevice) {
    var deviceList;
    var deviceGroupList;
    var selectedGroup;
    function Init() {
        RegisterEvents();
        LoadData();
    }
    CreateDevice.Init = Init;
    function RegisterEvents() {
        $("#createDeviceBtn").on('click', function (ev) {
            var DG = new Models.Device();
            DG.Name = $("#DeviceNameEdit").val();
            var asd = $("#DeviceDescriptionEdit").val();
            DG.Description = asd;
            DG.DeviceGroupId = getGroupId();
            var def = DeviceFunctions.CreateNewDevice(DG);
            def.done(function (ok) {
                Utils.unblockUI();
                if (ok) {
                    alert("onnistui");
                }
                else {
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
        def.done(function (data) {
            Utils.unblockUI();
            if (data) {
                deviceGroupList = data;
                selectedGroup = deviceGroupList[0].GroupName;
                fillDeviceGroupList(deviceGroupList);
            }
            else {
                alert("virhe");
            }
        });
    }
    function fillDeviceGroupList(devicegrouplist) {
        for (var i = 0; i < deviceGroupList.length; i++) {
            var x = document.createElement("option");
            var t = document.createTextNode(devicegrouplist[i].GroupName);
            x.appendChild(t);
            document.getElementById("deviceGroupList").appendChild(x);
        }
    }
    function getGroupId() {
        var id = -1;
        for (var i = 0; i < deviceGroupList.length; i++) {
            if (deviceGroupList[i].GroupName == selectedGroup)
                id = deviceGroupList[i].Id;
        }
        return id;
    }
})(CreateDevice || (CreateDevice = {}));
//# sourceMappingURL=CreateDevice.js.map