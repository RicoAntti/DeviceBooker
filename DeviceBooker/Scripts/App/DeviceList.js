var DeviceList;
(function (DeviceList) {
    var deviceList;
    function Init(groupid) {
        LoadData(groupid);
    }
    DeviceList.Init = Init;
    function LoadData(groupid) {
        Utils.blockUI("Ladataan laitteita.. odota hetki");
        var def = DeviceFunctions.ListDevices(groupid);
        def.done(function (data) {
            Utils.unblockUI();
            if (data) {
                deviceList = data;
                fillDeviceList(deviceList);
            }
            else {
                alert("virhe");
            }
        });
    }
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
    DeviceList.LoadAllData = LoadAllData;
    function fillDeviceList(devicelist) {
        var template = $("#deviceListItemTemplate");
        var container = $("#deviceList");
        container.html('');
        for (var i = 0; i < deviceList.length; i++) {
            var copy = template.clone();
            var dgl = deviceList[i];
            copy.find('.name').html(dgl.Name);
            if (dgl.Description.length > 40)
                copy.find('.description').html(dgl.Description.substr(0, 40) + "...");
            else
                copy.find('.description').html(dgl.Description);
            copy.attr('id', dgl.Id);
            copy.removeClass('hidden');
            container.append(copy);
        }
        $('#deviceListTable').find('tr').click(function () {
            location.href = "/Kalenteri/" + $(this).attr('id');
        });
    }
    function deleteDevice(element) {
        var DG = new Models.Device();
        DG = deviceList[element.id];
        alert(DG.Name);
        var def = DeviceFunctions.DeleteDevice(DG);
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
    DeviceList.deleteDevice = deleteDevice;
    function fillDeviceListAll(devicelist) {
        var template = $("#deviceListItemTemplate");
        var container = $("#deviceList");
        container.html('');
        for (var i = 0; i < deviceList.length; i++) {
            var copy = template.clone();
            var dgl = deviceList[i];
            copy.find('.name').html(dgl.Name);
            if (dgl.Description.length > 40)
                copy.find('.description').html(dgl.Description.substr(0, 40) + "...");
            else
                copy.find('.description').html(dgl.Description);
            copy.find('.deleteBtn2').attr("id", i);
            copy.attr('id', dgl.Id);
            copy.removeClass('hidden');
            container.append(copy);
        }
        //$('#deviceListTable').find('tr').click(function () {
        //    location.href = "/Kalenteri/" + $(this).attr('id');
        //});
    }
})(DeviceList || (DeviceList = {}));
//# sourceMappingURL=DeviceList.js.map