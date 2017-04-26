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
    function fillDeviceList(devicelist) {
        var template = $("#deviceListItemTemplate");
        var container = $("#deviceList");
        container.html('');
        for (var i = 0; i < deviceList.length; i++) {
            var copy = template.clone();
            var dgl = deviceList[i];
            copy.find('.name').html(dgl.Name);
            copy.find('.description').html(dgl.Description);
            copy.removeClass('hidden');
            container.append(copy);
        }
    }
})(DeviceList || (DeviceList = {}));
