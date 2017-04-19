module DeviceList {

    var deviceList: Models.Device[];

    export function Init(groupid: number) {

        LoadData(groupid);


    }

    function LoadData(groupid: number) {
        Utils.blockUI("Ladataan laitteita.. odota hetki");
        var def = DeviceFunctions.ListDevices(groupid);
        def.done((data: Models.Device[]) => {
            Utils.unblockUI();
            if (data) {
                deviceList = data;
                fillDeviceList(deviceList);
            } else {
                alert("virhe");
            }
        });
    }


    function fillDeviceList(devicelist: Models.Device[]) {

        var template = $("#deviceListItemTemplate");
        var container = $("#deviceList");
        container.html('');

        for (var i = 0; i < deviceList.length; i++) {
            var copy = template.clone();
            var dgl = deviceList[i];
           
            copy.find('.name').html(dgl.Name);
            copy.find('.description').html(dgl.Description);
            copy.attr('id', dgl.Id);
            copy.removeClass('hidden');
            container.append(copy);
        }
        $('#deviceListTable').find('tr').click(function () {
            location.href="/Kalenteri/"+$(this).attr('id');
        });
    }
    
}