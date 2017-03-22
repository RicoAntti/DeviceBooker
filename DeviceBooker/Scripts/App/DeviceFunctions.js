var DeviceFunctions;
(function (DeviceFunctions) {
    function CreateNewGroup(data) {
        var def = $.Deferred();
        Api.Post("CreateGroup/", JSON.stringify(data), function (data) {
            def.resolve(data);
        }, function (err) {
            console.log("ERR: " + err);
            def.resolve(null);
        });
        return def.promise();
    }
    DeviceFunctions.CreateNewGroup = CreateNewGroup;
    function ListDeviceGroups() {
        var def = $.Deferred();
        Api.Get("DeviceGroupList", function (data) {
            def.resolve(data);
        }, function (err) {
            console.log("ERR: " + err);
            def.resolve(null);
        });
        return def.promise();
    }
    DeviceFunctions.ListDeviceGroups = ListDeviceGroups;
    function ListDevices(id) {
        var def = $.Deferred();
        Api.Get("DeviceList/" + id, function (data) {
            def.resolve(data);
        }, function (err) {
            console.log("ERR: " + err);
            def.resolve(null);
        });
        return def.promise();
    }
    DeviceFunctions.ListDevices = ListDevices;
})(DeviceFunctions || (DeviceFunctions = {}));
//# sourceMappingURL=DeviceFunctions.js.map