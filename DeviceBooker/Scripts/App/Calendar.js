var Calendar;
(function (Calendar) {
    // <reference path="../jquery/jquery.d.ts"/>
    function getCalendar() {
        $(document).ready(function () {
            $('#calendar').fullCalendar({
                defaultDate: '2014-06-12',
                editable: true,
                dayClick: function (date, jsEvent, view) {
                    //* date.format() on virhe, mutta jos funktiossa date: any, niin toimii. (miksi..?) /* 
                    alert(date.format() + " has been clicked!");
                },
                eventClick: function (calEvent, jsEvent, view) {
                    alert('Event: ' + calEvent.title);
                },
                events: [
                    {
                        title: 'All Day Event',
                        start: '2014-06-01'
                    },
                    {
                        title: 'The Event',
                        start: '2014-06-07',
                        end: '2014-06-10'
                    },
                    {
                        title: 'Long Event',
                        start: '2014-06-03',
                        end: '2014-06-10'
                    },
                    {
                        id: 999,
                        title: 'Repeating Event',
                        start: '2014-06-09T16:00:00'
                    },
                    {
                        id: 999,
                        title: 'Repeating Event',
                        start: '2014-06-16T16:00:00'
                    },
                    {
                        title: 'Meeting',
                        start: '2014-06-12T10:30:00',
                        end: '2014-06-12T12:30:00'
                    },
                    {
                        title: 'Lunch',
                        start: '2014-06-12T12:00:00'
                    },
                    {
                        title: 'Birthday Party',
                        start: '2014-06-13T07:00:00'
                    },
                    {
                        title: 'Click for Google',
                        url: 'http://google.com/',
                        start: '2014-06-28'
                    }
                ]
            });
        });
    }
    Calendar.getCalendar = getCalendar;
})(Calendar || (Calendar = {}));
