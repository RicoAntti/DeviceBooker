module CalendarScript {
    //var data = new FormData();

    var evs = [];
    var deviceId;
    export function Init(deviId: number)
   {
        deviceId = deviId;

        $('#startDatePicker').datepicker({ format: 'dd.mm.yyyy' });
        $('#endDatePicker').datepicker({ format: 'dd.mm.yyyy' });

        getData();
        
    }

    function getData() {

        getReservations();

        function getReservations() {

            var def = getReservationsFromDB(deviceId);
            var arra = [];

            def.done((data: Models.Reservation[]) => {
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
                } else {
                    alert("virhe");
                }

            });

        }

        function getReservationsFromDB(devId: number): JQueryPromise<Models.Reservation[]> {
            var def = $.Deferred<Models.Reservation[]>();

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
            select: function (start, end) {
                $('#ReservationModal').modal('show');

                var startDate = start.toDate().getDate() + "." + start.toDate().getMonth() + " - " + start.toDate().getFullYear();
                var endDate = end.toDate().getDate() + "." + end.toDate().getMonth() + " - " + end.toDate().getFullYear();

                $('#startDatePicker').datepicker("setDate", startDate);
                $('#endDatePicker').datepicker("setDate", endDate);  
            },
            editable: false,
            events: evs
        });

        $("#submitButton").on("click", function (ev) {
            var DG = new Models.Reservation();

            var startDate = $('#startDatePicker').val();
            var startTime = $('#startTimeSelect').val();
            var startDateTime = startDate + " " + startTime;
            var _start = moment(startDateTime, "MM-DD-YYYY HH:mm").toDate();

            var endDate = $('#endDatePicker').val();
            var endTime = $('#endTimeSelect').val();
            var endDateTime = endDate + " " + endTime;
            var _end = moment(endDateTime, "MM-DD-YYYY HH:mm").toDate();

            DG.StartTime = _start;
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

    };

}