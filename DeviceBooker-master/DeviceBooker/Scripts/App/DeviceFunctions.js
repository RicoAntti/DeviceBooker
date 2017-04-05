var DeviceFunctions;
(function (DeviceFunctions) {
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
})(DeviceFunctions || (DeviceFunctions = {}));
//# sourceMappingURL=DeviceFunctions.js.map