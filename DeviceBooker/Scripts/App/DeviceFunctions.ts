﻿module DeviceFunctions {

    export function CreateNewGroup(data: Models.DeviceGroup): JQueryPromise<boolean> {
        var def = $.Deferred<boolean>();

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
    export function CreateNewDevice(data: Models.Device): JQueryPromise<boolean> {
        var def = $.Deferred<boolean>();

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
    export function ListDeviceGroups(): JQueryPromise<Models.DeviceGroup[]> {
        var def = $.Deferred<Models.DeviceGroup[]>();

        $.ajax({
            type: "Get",
            url: "/Api/DeviceGroupList",
            success: function (data) {
                def.resolve(data);
            }
        });

        return def.promise();
    }

    export function UpdateDeviceGroup(data: Models.DeviceGroup): JQueryPromise<boolean> {
        var def = $.Deferred<boolean>(); 
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
    export function UpdateDevice(data: Models.Device): JQueryPromise<boolean> {
        var def = $.Deferred<boolean>();
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
    export function DeleteDeviceGroup(data: Models.DeviceGroup): JQueryPromise<boolean> {
        var def = $.Deferred<boolean>();
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
    export function DeleteDevice(data: Models.Device): JQueryPromise<boolean> {
        var def = $.Deferred<boolean>();
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
    export function ListDevices(id:number): JQueryPromise<Models.Device[]> {
        var def = $.Deferred<Models.Device[]>();

        $.ajax({
            type: "Get",
            url: "/Api/DeviceList/" + id,
            success: function (data) {
                def.resolve(data);
            }
        });

        return def.promise();
    }
    export function ListAllDevices(): JQueryPromise<Models.Device[]> {
        var def = $.Deferred<Models.Device[]>();

        $.ajax({
            type: "Get",
            url: "/Api/DeviceListAll",
            success: function (data) {
                def.resolve(data);
            }
        });

        return def.promise();
    }

}