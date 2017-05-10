var OwnReservation;
(function (OwnReservation) {
    var _user;
    function Init(user) {
        _user = user;
        LoadData();
    }
    OwnReservation.Init = Init;
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
        var res = new Models.Reservation();
        res.Title = _user;
        $.ajax({
            type: "Post",
            url: "/Api/GetOwnData/",
            data: JSON.stringify(res),
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
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
            if (reslist[i].IsBorrow == true && reslist[i].Reservation.Title == _user && reslist[i].Reservation.Id == reslist[i].BorrowResId) {
                var copy = borrow_template.clone();
                var res = reslist[i];
                copy.find('.name').html(res.GroupName + " : " + res.DeviceName);
                copy.find('.user').html(res.Reservation.Title);
                copy.attr('id', res.DeviceId);
                copy.removeClass('hidden');
                b_container.append(copy);
            }
            else {
                var copy = reservation_template.clone();
                var res = reslist[i];
                var _time = moment(res.Reservation.StartTime).format('DD.MM HH:mm');
                _time += " - ";
                _time += moment(res.Reservation.EndTime).format('DD.MM HH:mm');
                //new Date(res.Reservation.StartTime).getDate().toString() + "." + new Date(res.Reservation.StartTime).getMonth().toString()
                copy.find('.name').html(res.GroupName + " : " + res.DeviceName);
                copy.find('.time').html(_time);
                copy.attr('DevId', res.DeviceId);
                copy.attr('ResId', res.Reservation.Id);
                copy.removeClass('hidden');
                r_container.append(copy);
            }
        }
        $('#ReserveListTable').find('tr').click(function () {
            if (confirm("Poistetaanko varaus?")) {
                $.ajax({
                    type: "Get",
                    url: "/Api/DeleteRes/" + $(this).attr('ResId'),
                    success: function (data) {
                        LoadData();
                    }
                });
            }
            //location.href = "/Api/Borrow/" + $(this).attr('DevId') + '_' + $(this).attr('ResId');
        });
    }
})(OwnReservation || (OwnReservation = {}));
//# sourceMappingURL=OwnReservation.js.map