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
    function CreateNewDevice(data) {
        var def = $.Deferred();
        $.ajax({
            type: "POST",
            url: "/Api/CreateDevice",
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            success: function (data) {
                def.resolve(data);
            }
        });
        return def.promise();
    }
    DeviceFunctions.CreateNewDevice = CreateNewDevice;
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
    function UpdateDeviceGroup(data) {
        var def = $.Deferred();
        $.ajax({
            type: "POST",
            url: "/Api/UpdateDeviceGroup",
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            success: function (data) {
                def.resolve(data);
            }
        });
        return def.promise();
    }
    DeviceFunctions.UpdateDeviceGroup = UpdateDeviceGroup;
    function UpdateDevice(data) {
        var def = $.Deferred();
        $.ajax({
            type: "POST",
            url: "/Api/UpdateDevice",
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            success: function (data) {
                def.resolve(data);
            }
        });
        return def.promise();
    }
    DeviceFunctions.UpdateDevice = UpdateDevice;
    function DeleteDeviceGroup(data) {
        var def = $.Deferred();
        $.ajax({
            type: "POST",
            url: "/Api/DeleteDeviceGroup",
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            success: function (data) {
                def.resolve(data);
            }
        });
        return def.promise();
    }
    DeviceFunctions.DeleteDeviceGroup = DeleteDeviceGroup;
    function DeleteDevice(data) {
        var def = $.Deferred();
        $.ajax({
            type: "POST",
            url: "/Api/DeleteDevice",
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            success: function (data) {
                def.resolve(data);
            }
        });
        return def.promise();
    }
    DeviceFunctions.DeleteDevice = DeleteDevice;
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
    function ListAllDevices() {
        var def = $.Deferred();
        $.ajax({
            type: "Get",
            url: "/Api/DeviceListAll",
            success: function (data) {
                def.resolve(data);
            }
        });
        return def.promise();
    }
    DeviceFunctions.ListAllDevices = ListAllDevices;
})(DeviceFunctions || (DeviceFunctions = {}));
//# sourceMappingURL=DeviceFunctions.js.map