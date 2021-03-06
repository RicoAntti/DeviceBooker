﻿module DeviceGroupList {

    var deviceGroupList: Models.DeviceGroup[];

    export function Init() {

        LoadData();

    }

    function LoadData() {
        Utils.blockUI("Ladataan laitteita.. odota hetki");
        var def = DeviceFunctions.ListDeviceGroups();
        def.done((data: Models.DeviceGroup[]) => {
            Utils.unblockUI();
            if (data) {
                deviceGroupList = data;
                fillDeviceGroupList(deviceGroupList);
            } else {
                alert("virhe");
            }
        });
    }

    function fillDeviceGroupList(devicegrouplist: Models.DeviceGroup[]) {

        var template = $("#deviceGroupListItemTemplate");
        var container = $("#deviceGroupList");
        container.html('');

        for (var i = 0; i < deviceGroupList.length; i++) {
            var copy = template.clone();
            var dgl = deviceGroupList[i];

            copy.find('.DeviceListBtn').html(dgl.GroupName);
            copy.find('.DeviceListBtn').attr('href', '/Laitteet/' + dgl.Id);

            copy.removeClass('hidden');
            container.append(copy);
        }
    }
    
}