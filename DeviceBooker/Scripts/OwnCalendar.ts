module OwnCalendar {
    //var data = new FormData();

    var evs = [];
    var _user;
    export function Init(user: string) {
        _user = user;
        getData();

    }

    function getData() {

        getReservations();

        function getReservations() {

            var def = getReservationsFromDB(_user);
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
                        CalendarFunctions();
                    }
                } else {
                    alert("virhe");
                }

            });

        }

        function getReservationsFromDB(user: string): JQueryPromise<Models.Reservation[]> {
            var def = $.Deferred<Models.Reservation[]>();

            var _user = new Models.Reservation();
            _user.Title = user;

            $.ajax({
                type: "POST",
                url: "/Api/OwnReservation/",
                data: JSON.stringify(_user),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                success: function (data) {
                    def.resolve(data);
                },
                error: function () {
                    alert('error!');
                }
            });

            return def.promise();
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
                editable: false,
                events: evs
            });
        }


    }
}