var CreateDevice;
(function (CreateDevice) {
    var deviceList;
    var deviceGroupList;
    var selectedGroup;
    var selectedGroup2;
    function Init() {
        RegisterEvents();
        LoadGroupData();
        LoadAllData();
    }
    CreateDevice.Init = Init;
    function LoadAllData() {
        Utils.blockUI("Ladataan laitteita.. odota hetki");
        var def = DeviceFunctions.ListAllDevices();
        def.done(function (data) {
            Utils.unblockUI();
            if (data) {
                deviceList = data;
                fillDeviceListAll(deviceList);
            }
            else {
                alert("virhe");
            }
        });
    }
    CreateDevice.LoadAllData = LoadAllData;
    function fillDeviceListAll(devicelist) {
        var template = $("#deviceListItemTemplate2");
        var container = $("#deviceList2");
        container.html('');
        for (var i = 0; i < deviceList.length; i++) {
            var copy = template.clone();
            var dgl = deviceList[i];
            copy.find('.name').html(dgl.Name);
            if (dgl.Description.length > 40)
                copy.find('.description').html(dgl.Description.substr(0, 40) + "...");
            else
                copy.find('.description').html(dgl.Description);
            var groupName;
            for (var j = 0; j < deviceGroupList.length; j++) {
                if (dgl.DeviceGroupId == deviceGroupList[j].Id)
                    groupName = deviceGroupList[j].GroupName;
            }
            copy.find('.group').html(groupName);
            copy.find('.editBtn2').attr('id', i);
            copy.find('.deleteBtn2').attr('id', i);
            copy.attr('id', dgl.Id);
            copy.removeClass('hidden');
            container.append(copy);
        }
    }
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
        $('#groupList').change(function () {
            selectedGroup = $(this).find("option:selected").text();
        });
    }
    function openModal2(element) {
        for (var i = 0; i < deviceGroupList.length; i++) {
            var x = document.createElement("option");
            var t = document.createTextNode(deviceGroupList[i].GroupName);
            x.appendChild(t);
            $(x).attr("id", i);
            document.getElementById("groupList2").appendChild(x);
        }
        selectedGroup2 = $("#groupList2").find("option:selected").text();
        $("#DeviceNameEdit2").val(deviceList[element.id].Name);
        $("#DeviceDescriptionEdit2").val(deviceList[element.id].Description);
        $("#groupList2").val();
        $(".saveBtn2").attr('id', element.id);
        $('#groupList2').change(function () {
            selectedGroup2 = $(this).find("option:selected").text();
        });
    }
    CreateDevice.openModal2 = openModal2;
    function LoadData(groupid) {
        Utils.blockUI("Ladataan laitteita.. odota hetki");
        var def = DeviceFunctions.ListDevices(groupid);
        def.done(function (data) {
            Utils.unblockUI();
            if (data) {
                deviceList = data;
                fillSpecificDeviceList();
            }
            else {
                alert("virhe");
            }
        });
    }
    function LoadGroupData() {
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
    function ShowDevices(element) {
        LoadData(deviceGroupList[element.id].Id);
        fillSpecificDeviceList();
        $("#deviceListTable2").removeClass("hidden");
    }
    CreateDevice.ShowDevices = ShowDevices;
    function fillSpecificDeviceList() {
        var template = $("#deviceListItemTemplate3");
        var container = $("#deviceList3");
        container.html('');
        for (var i = 0; i < deviceList.length; i++) {
            var copy = template.clone();
            var dgl = deviceList[i];
            copy.find('.editBtn2').attr('id', i);
            copy.find('.deleteBtn2').attr('id', i);
            copy.find('.name').html(dgl.Name);
            if (dgl.Description.length > 40)
                copy.find('.description').html(dgl.Description.substr(0, 40) + "...");
            else
                copy.find('.description').html(dgl.Description);
            copy.attr('id', i);
            copy.removeClass('hidden');
            container.append(copy);
        }
    }
    function Save(element) {
        var DG = new Models.Device();
        //DG[0] = new Models.DeviceGroup();
        //alert(element.id);
        //DG[0] = deviceGroupList[element.id];
        DG = deviceList[element.id];
        DG.Name = $("#DeviceNameEdit2").val();
        DG.Description = $("#DeviceDescriptionEdit2").val();
        var id;
        for (var i = 0; i < deviceGroupList.length; i++) {
            if (deviceGroupList[i].GroupName == selectedGroup2)
                id = deviceGroupList[i].Id;
        }
        DG.DeviceGroupId = id;
        var def = DeviceFunctions.UpdateDevice(DG);
        def.done(function (ok) {
            Utils.unblockUI();
            if (ok) {
                LoadAllData();
            }
            else {
                alert("Virhe kutsussa");
            }
        });
    }
    CreateDevice.Save = Save;
    function fillDeviceGroupList(devicegrouplist) {
        for (var i = 0; i < deviceGroupList.length; i++) {
            var x = document.createElement("option");
            var t = document.createTextNode(devicegrouplist[i].GroupName);
            x.appendChild(t);
            $(x).attr("id", i);
            document.getElementById("groupList").appendChild(x);
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