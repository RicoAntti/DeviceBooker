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
                            allDay: false
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
        var bookedStart;
        var bookedEnd;
        var calendar = (<any>$('#calendar')).fullCalendar({      
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,testWeek'
            },
            views: {
                testWeek: {
                    type: 'agenda',
                    duration: { weeks: 2 },
                    rows: 2 
                }
            },
            defaultView: 'testWeek',
            businessHours: [{
                dow: [1, 2, 3, 4, 5],
                start: '08:00',
                end: '15:00'
            }],
            weekends: false,
            timezone: 'local',
            contentHeight: 'auto',
            firstDay: 1,
            minTime: '08:00',
            maxTime: '15:00',
            slotDuration: '01:00:00',
            displayEventTime: true,
            displayEventEnd: true,
            eventOverlap: false,
            selectable: true,
            selectHelper: true,
            selectOverlap: false,
            select: function (start, end) {
               /* var today = new Date().getDate();
                var selectStart = start.toDate().getDate();
                if (selectStart >= today)
                {*/
                
                    $('#ReservationModal').modal('show');
                     

                    $('#startTimeSelect option').filter(function () {
                        return $(this).val() <= bookedStart;
                    }).prop('disabled', true);

                    $('#endTimeSelect option').filter(function () {
                        return $(this).val() >= bookedEnd;
                    }).prop('disabled', true);
              /*  }
                else
                {
                    alert("varausta ei voida suorittaa tälle päivämäärälle");
                }*/
                var startMonth = start.toDate().getMonth() + 1;
                var endMonth = end.toDate().getMonth() + 1;

                var startDate = start.toDate().getDate() + "." + startMonth + " - " + start.toDate().getFullYear();
                console.log("1: " + startDate);
                var endDate = end.toDate().getDate() + "." + endMonth + " - " + end.toDate().getFullYear();
                var startTime = start.toDate().getHours();
                var endTime = end.toDate().getHours();
                $('#startDatePicker').datepicker("setDate", startDate);
                if (startTime == '8' || startTime == '9')
                {
                    $('#startTimeSelect').val('0' + startTime + ':00');
                }
                else
                {
                    $('#startTimeSelect').val(startTime + ':00');
                }
                if (endTime == '8' || endTime == '9') {
                    $('#endTimeSelect').val('0' + endTime + ':00');
                }
                else
                {
                    $('#endTimeSelect').val(endTime + ':00');
                }
                $('#endDatePicker').datepicker("setDate", endDate);  
            },
            editable: false,
            events: evs,
            timeFormat: 'H:mm',
            viewRender: function (view, element) {
                if (view.type == 'testWeek') {
                    var viewStart = moment(view.start).format();
                    $('#calendar .fc-prev-button').click(function () {
                        $('#calendar').fullCalendar('gotoDate', moment(viewStart).subtract(7, 'days'));
                        $('#calendar').fullCalendar('render');
                    });
                    $('#calendar .fc-next-button').click(function () {
                        $('#calendar').fullCalendar('gotoDate', moment(viewStart).add(7, 'days'));
                        $('#calendar').fullCalendar('render');
                    });
                }
            }    
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
    };

}