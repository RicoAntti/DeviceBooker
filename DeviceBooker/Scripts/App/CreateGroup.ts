module CreateGroup {

    var deviceGroupList: Models.DeviceGroup[];

    export function Init() {

        RegisterEvents();

    }

    function RegisterEvents() {
        $("#createGroupBtn").on('click', function (ev) {
            var DG = new Models.DeviceGroup();
            DG.GroupName = $("#groupNameEdit").val();
            var def = DeviceFunctions.CreateNewGroup(DG);
            def.done((ok: boolean) => {
                Utils.unblockUI();
                if (ok) {
                    alert("onnistui");
                } else {
                    alert("Virhe kutsussa");
                }
            });

        });


    }
}