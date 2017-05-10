var CalendarScript;
(function (CalendarScript) {
    //var data = new FormData();
    var evs = [];
    var deviceId;
    function Init(deviId) {
        deviceId = deviId;
        $('#startDatePicker').datepicker({ format: 'dd.mm.yyyy' });
        $('#endDatePicker').datepicker({ format: 'dd.mm.yyyy' });
        getData();
    }
    CalendarScript.Init = Init;
    function getData() {
        getReservations();
        function getReservations() {
            var def = getReservationsFromDB(deviceId);
            var arra = [];
            def.done(function (data) {
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        evs.push({
                            title: data[i].Title,
                            start: data[i].StartTime,
                            end: data[i].EndTime,
                            allDay: false
                        });
                    }
                    CalendarFunctions();
                }
                else {
                    alert("virhe");
                }
            });
        }
        function getReservationsFromDB(devId) {
            var def = $.Deferred();
            var id = devId;
            $.ajax({
                type: "GET",
                url: "/Api/Reservation/" + id,
                success: function (data) {
                    //alert('success!');
                    def.resolve(data);
                },
                error: function () {
                    alert('error!');
                }
            });
            return def.promise();
        }
    }
    function CalendarFunctions() {
        /* var date = new Date();
         var d = date.getDate();
         var m = date.getMonth();
         var y = date.getFullYear();
         */
        var calendar = $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            displayEventTime: true,
            eventOverlap: false,
            selectable: true,
            selectHelper: true,
            selectOverlap: true,
            select: function (start, end) {
                $('#ReservationModal').modal('show');
                var startDate = start.toDate().getDate() + "." + start.toDate().getMonth() + 1 + " - " + start.toDate().getFullYear();
                console.log("1: " + startDate);
                var endDate = end.toDate().getDate() + "." + end.toDate().getMonth() + 1 + " - " + end.toDate().getFullYear();
                $('#startDatePicker').datepicker("setDate", startDate);
                $('#endDatePicker').datepicker("setDate", endDate);
            },
            editable: false,
            events: evs,
            timeFormat: 'H:mm',
            displayEventEnd: true
        });
        $("#submitButton").on("click", function (ev) {
            var DG = new Models.Reservation();
            var startDate = $('#startDatePicker').val();
            var startTime = $('#startTimeSelect').val();
            var startDateTime = startDate + " " + startTime;
            var _start = moment.utc(startDateTime, "DD-MM-YYYY HH:mm").toDate();
            var endDate = $('#endDatePicker').val();
            var endTime = $('#endTimeSelect').val();
            var endDateTime = endDate + " " + endTime;
            var _end = moment.utc(endDateTime, "DD-MM-YYYY HH:mm").toDate();
            DG.StartTime = new Date(_start);
            DG.EndTime = _end;
            DG.DeviceId = deviceId;
            calendarFunc(DG);
        });
        function calendarFunc(data) {
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: "POST",
                url: "/Api/Reservation",
                data: JSON.stringify(data),
                success: function () {
                    window.location.reload();
                },
                error: function () {
                    alert('error!');
                }
            });
        }
    }
    ;
})(CalendarScript || (CalendarScript = {}));
//# sourceMappingURL=CalendarScript.js.map