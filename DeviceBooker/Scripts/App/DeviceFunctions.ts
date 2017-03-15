module DeviceFunctions {

    export function CreateNewGroup(data: Models.DeviceGroup): JQueryPromise<boolean> {
        var def = $.Deferred<boolean>();
        Api.Post("CreateGroup/", JSON.stringify(data), data => {
            def.resolve(data);
        }, err => {
            console.log("ERR: " + err);
            def.resolve(null);

        });
        return def.promise();
    }

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

    export function ListDevices(): JQueryPromise<Models.Device[]> {
        var def = $.Deferred<Models.Device[]>();

        Api.Get("DeviceList", data => {
            def.resolve(data);
        }, err => {
            console.log("ERR: " + err);
            def.resolve(null);
        });

        return def.promise();
    }

}