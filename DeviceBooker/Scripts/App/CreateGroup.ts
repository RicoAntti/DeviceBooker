module CreateGroup {

    var deviceGroupList: Models.DeviceGroup[];

    export function Init() {

        RegisterEvents();
        LoadData();

    }

    function RegisterEvents() {
        $("#createGroupBtn").on('click', function (ev) {
            var DG = new Models.DeviceGroup();
            DG.GroupName = $("#groupNameEdit").val();
            var def = DeviceFunctions.CreateNewGroup(DG);
            def.done((ok: boolean) => {
                Utils.unblockUI();
                if (ok) {
                    LoadData();
                } else {
                    alert("Virhe kutsussa");
                }
            });

        });

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
            copy.find('.editBtn').attr('id', i);
            copy.find('.deleteBtn').attr('id', i);
            copy.find('.showBtn').attr('id', i);
            //copy.find('.editBtn').attr('href', '/EditGroup/' + dgl.Id);
            
            

            copy.removeClass('hidden');
            container.append(copy);
        }
    }
    export function deleteGroup(element) {
       
        var DG = new Models.DeviceGroup();

        DG = deviceGroupList[element.id];
        var def = DeviceFunctions.DeleteDeviceGroup(DG);
        def.done((ok: boolean) => {
            Utils.unblockUI();
            if (ok) {
                LoadData();
            } else {
                alert("Virhe kutsussa");
            }
        });

        

    }
    
    export function openModal(element) {
       
        $("#groupNameModal").val(deviceGroupList[element.id].GroupName);
        $(".saveBtn").attr('id', element.id);
    }

    export function saveGroupName(element) {
        var DG = new Models.DeviceGroup();
        //DG[0] = new Models.DeviceGroup();
        //alert(element.id);
        //DG[0] = deviceGroupList[element.id];
        DG = deviceGroupList[element.id];
        DG.GroupName = $("#groupNameModal").val();

        var def = DeviceFunctions.UpdateDeviceGroup(DG);
        def.done((ok: boolean) => {
            Utils.unblockUI();
            if (ok) {
                LoadData();
            } else {
                alert("Virhe kutsussa");
            }
        });
    }
}