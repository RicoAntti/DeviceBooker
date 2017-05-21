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
    export function LoadAllData() {
        Utils.blockUI("Ladataan laitteita.. odota hetki");
        var def = DeviceFunctions.ListAllDevices();
        def.done((data: Models.Device[]) => {
            Utils.unblockUI();
            if (data) {
                deviceList = data;
                fillDeviceListAll(deviceList);
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
            if (dgl.Description.length>40)
                copy.find('.description').html(dgl.Description.substr(0, 40) + "...");
            else
                copy.find('.description').html(dgl.Description);
            copy.attr('id', dgl.Id);
            copy.removeClass('hidden');
            container.append(copy);
        }
        $('#deviceListTable').find('tr').click(function () {
            location.href="/Kalenteri/"+$(this).attr('id');
        });

    }
    export function deleteDevice(element) {

        var DG = new Models.Device();

        DG = deviceList[element.id];
        alert(DG.Name);
        var def = DeviceFunctions.DeleteDevice(DG);
        def.done((ok: boolean) => {
            Utils.unblockUI();
            if (ok) {
                LoadAllData();
            } else {
                alert("Virhe kutsussa");
            }
        });
    }
    
    function fillDeviceListAll(devicelist: Models.Device[]) {

        var template = $("#deviceListItemTemplate");
        var container = $("#deviceList");
        container.html('');

        for (var i = 0; i < deviceList.length; i++) {
            var copy = template.clone();
            var dgl = deviceList[i];

            copy.find('.name').html(dgl.Name);
            if (dgl.Description.length > 40)
                copy.find('.description').html(dgl.Description.substr(0, 40) + "...");
            else
                copy.find('.description').html(dgl.Description);
            copy.find('.deleteBtn2').attr("id", i);
            copy.attr('id', dgl.Id);
            copy.removeClass('hidden');
            container.append(copy);
        }
        //$('#deviceListTable').find('tr').click(function () {
        //    location.href = "/Kalenteri/" + $(this).attr('id');
        //});
    }
}