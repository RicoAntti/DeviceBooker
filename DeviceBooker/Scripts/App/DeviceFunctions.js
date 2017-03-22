var DeviceFunctions;
(function (DeviceFunctions) {
    function CreateNewGroup(data) {
        var def = $.Deferred();
        $.ajax({
            type: "POST",
            url: "/Api/CreateGroup",
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            success: function (data) {
                def.resolve(data);
            }
        });
        return def.promise();
    }
    DeviceFunctions.CreateNewGroup = CreateNewGroup;
    function ListDeviceGroups() {
        var def = $.Deferred();
        $.ajax({
            type: "Get",
            url: "/Api/DeviceGroupList",
            success: function (data) {
                def.resolve(data);
            }
        });
        return def.promise();
    }
    DeviceFunctions.ListDeviceGroups = ListDeviceGroups;
    function ListDevices(id) {
        var def = $.Deferred();
        $.ajax({
            type: "Get",
            url: "/Api/DeviceList/" + id,
            success: function (data) {
                def.resolve(data);
            }
        });
        return def.promise();
    }
    DeviceFunctions.ListDevices = ListDevices;
})(DeviceFunctions || (DeviceFunctions = {}));
