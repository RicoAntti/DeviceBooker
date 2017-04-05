var data = new FormData();
$(document).ready(function () {
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
        select: function(start, end, allDay) {
            var title = prompt('');
           
            if (title) {

                var DG = new Models.Reservation();
                DG.Title = title;
                DG.StartTime = start;
                DG.EndTime = end;
                calendarFunc(DG);
                /*
                data.append("Title", title);
                data.append("StartTime", start);
                data.append("EndTime", end);
                console.log(data.get("Title"));
                 */

                calendar.fullCalendar('renderEvent',
                    {
                        title: title,
                        start: start,
                        end: end,
                        allDay: allDay
                    },
                    true // make the event "stick"
                );
            }
            calendar.fullCalendar('unselect');
        },
        editable: true,
        events: [
            
        ]
    });

});

function calendarFunc(data) {
    /*  $.ajax({
          type: "Post",
          url: "/Api/Reservation",
          data: data,
          cache: false,
          dataType: 'json',
          processData: false,
          contentType: false,
          success: function () {
              alert('success!');
  
          }
      });*/
    console.log("tulee tänne");
    $.ajax({
        type: "POST",
        url: "/Api/Reservation",
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (data) {
            def.resolve(data);
        }
    });
}