var CalendarScript;
(function (CalendarScript) {
    //var data = new FormData();
    var evs = [];
    var deviceId;
    function Init(deviId) {
        deviceId = deviId;
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
                            allDay: true
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
            selectable: true,
            selectHelper: true,
            selectOverlap: false,
            select: function (start, end, allDay) {
                var title = prompt('');
                if (title) {
                    var DG = new Models.Reservation();
                    DG.Title = title;
                    DG.StartTime = new Date(start);
                    DG.EndTime = new Date(end);
                    DG.DeviceId = deviceId;
                    calendarFunc(DG);
                    calendar.fullCalendar('renderEvent', {
                        title: title,
                        start: start,
                        end: end,
                        allDay: allDay
                    }, true // make the event "stick"
                    );
                }
                calendar.fullCalendar('unselect');
            },
            editable: false,
            events: evs
        });
        function calendarFunc(data) {
            console.log("tulee tänne");
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                type: "POST",
                url: "/Api/Reservation",
                data: JSON.stringify(data),
                success: function () {
                    //alert('success!');
                },
                error: function () {
                    alert('error!');
                }
            });
        }
    }
    ;
})(CalendarScript || (CalendarScript = {}));
