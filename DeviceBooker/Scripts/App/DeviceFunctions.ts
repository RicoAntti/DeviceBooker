module DeviceFunctions {

    export function ListDeviceGroups(): JQueryPromise<Models.DeviceGroup[]> {
        var def = $.Deferred<Models.DeviceGroup[]>();

        Api.Get("DeviceGroupList", data => {
            def.resolve(data);
        }, err => {
            console.log("ERR: " + err);
            def.resolve(null);
        });

        return def.promise();
    }

}