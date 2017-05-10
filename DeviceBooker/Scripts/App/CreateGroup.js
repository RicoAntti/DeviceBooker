var CreateGroup;
(function (CreateGroup) {
    var deviceGroupList;
    function Init() {
        RegisterEvents();
    }
    CreateGroup.Init = Init;
    function RegisterEvents() {
        $("#createGroupBtn").on('click', function (ev) {
            var DG = new Models.DeviceGroup();
            DG.GroupName = $("#groupNameEdit").val();
            var def = DeviceFunctions.CreateNewGroup(DG);
            def.done(function (ok) {
                Utils.unblockUI();
                if (ok) {
                    alert("onnistui");
                }
                else {
                    alert("Virhe kutsussa");
                }
            });
        });
    }
})(CreateGroup || (CreateGroup = {}));
//# sourceMappingURL=CreateGroup.js.map