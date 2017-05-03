var Admin;
(function (Admin) {
    function Init() {
        LoadData();
    }
    Admin.Init = Init;
    function LoadData() {
        Utils.blockUI("Ladataan laitteita.. odota hetki");
        var def = GetData();
        def.done(function (data) {
            Utils.unblockUI();
            if (data) {
                var ResData = data;
                fillLists(ResData);
            }
            else {
                alert("virhe");
            }
        });
    }
    function GetData() {
        var def = $.Deferred();
        $.ajax({
            type: "Get",
            url: "/Api/GetReservationData",
            success: function (data) {
                def.resolve(data);
            }
        });
        return def.promise();
    }
    function fillLists(reslist) {
        var borrow_template = $("#BorrowListTemplate");
        var reservation_template = $("#ReserveListTemplate");
        var b_container = $("#BorrowList");
        var r_container = $("#ReserveList");
        b_container.html('');
        r_container.html('');
        for (var i = 0; i < reslist.length; i++) {
            console.log(reslist[i].DeviceName + ' ' + reslist[i].IsBorrow);
            if (reslist[i].IsBorrow == true) {
                var copy = borrow_template.clone();
                var res = reslist[i];
                copy.find('.name').html(res.GroupName + " : " + res.DeviceName);
                copy.find('.user').html(res.Reservation.Title);
                copy.attr('id', res.DeviceId);
                copy.removeClass('hidden');
                b_container.append(copy);
            }
            else if (reslist[i].IsBorrow == false) {
                var copy = reservation_template.clone();
                var res = reslist[i];
                copy.find('.name').html(res.GroupName + " : " + res.DeviceName);
                copy.find('.user').html(res.Reservation.Title);
                copy.find('.time').html(new Date(res.Reservation.StartTime).getDate().toString() + "." + new Date(res.Reservation.StartTime).getMonth().toString());
                copy.attr('DevId', res.DeviceId);
                copy.attr('ResId', res.Reservation.Id);
                copy.removeClass('hidden');
                r_container.append(copy);
            }
        }
        $('#BorrowListTable').find('tr').click(function () {
            $.ajax({
                type: "Get",
                url: "/Api/Return/" + $(this).attr('id'),
                success: function (data) {
                    LoadData();
                }
            });
            //location.href = "/Api/Return/" + $(this).attr('id');
        });
        $('#ReserveListTable').find('tr').click(function () {
            $.ajax({
                type: "Get",
                url: "/Api/Borrow/" + $(this).attr('DevId') + '_' + $(this).attr('ResId'),
                success: function (data) {
                    LoadData();
                }
            });
            //location.href = "/Api/Borrow/" + $(this).attr('DevId') + '_' + $(this).attr('ResId');
        });
    }
})(Admin || (Admin = {}));
