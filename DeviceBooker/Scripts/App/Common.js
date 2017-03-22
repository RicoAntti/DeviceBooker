/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/bootstrap/index.d.ts" />
/// <reference path="../typings/jquery.blockUI/jquery.blockUI.d.ts" />
var Utils;
(function (Utils) {
    // bootstrap date picker options
    //export function MakeSortable(el: JQuery) {
    //    var t = el.stupidtable({
    //        "dateFi": (a, b) => {
    //            var aDate: any = moment(a, 'DD.MM.YYYY');
    //            var bDate: any = moment(b, 'DD.MM.YYYY');
    //            return aDate - bDate;
    //        },
    //        "dateTimeFi": (a, b) => {
    //            var aDate: any = moment(a, 'DD.MM.YYYY hh:mm');
    //            var bDate: any = moment(b, 'DD.MM.YYYY hh:mm');
    //            return aDate - bDate;
    //        },
    //        "numberFi": (a, b) => {
    //            var aNum = +a.replace(',', '.').replace('€', '');
    //            var bNum = +b.replace(',', '.').replace('€', '');
    //            return aNum - bNum;
    //        },
    //        "fixingPercent": (a, b) => {
    //            a = a.replace("Systeemihinta:", "").replace("Aluehinta:", "").replace("%", "").trim();
    //            b = b.replace("Systeemihinta:", "").replace("Aluehinta:", "").replace("%", "").trim();
    //            var aNum = +a.replace(',', '.');
    //            var bNum = +b.replace(',', '.');
    //            return aNum - bNum;
    //        }
    //    });
    //    t.find('th').css('cursor', 'pointer');
    //    t.on("aftertablesort", function (event, d) {
    //        var ths = $(this).find("th");
    //        ths.find('.sortArrow').removeClass('glyphicon-arrow-up');
    //        ths.find('.sortArrow').removeClass('glyphicon-arrow-down');
    //        ths.find('.sortArrow').addClass('glyphicon-sort');
    //        var arrow = $(ths[d.column]).find(".sortArrow");
    //        var dir = $.fn.stupidtable.dir;
    //        var arrowName = d.direction === dir.ASC ? "glyphicon-arrow-up" : "glyphicon-arrow-down";
    //        arrow.removeClass('glyphicon-sort');
    //        arrow.addClass(arrowName);
    //    });
    //}
    // block whole page
    function blockUI(msg) {
        var message = "Ladataan..";
        if (msg !== null && msg !== undefined) {
            message = msg;
        }
        $.blockUI({ message: '<h1 style="margin-bottom: 20px;"><i class="fa fa-spinner fa-spin" style="position: absolute; left: 15px;"></i>' + message + '</h1>' });
    }
    Utils.blockUI = blockUI;
    // unblock page
    function unblockUI() {
        $.unblockUI();
    }
    Utils.unblockUI = unblockUI;
    // block ui element
    function blockElement(el) {
        el.block({ message: '<span>Ladataan..</span>', css: { border: 'none', backgroundColor: 'transparent', color: 'white' } });
    }
    Utils.blockElement = blockElement;
    // unblock ui element
    function unblockElement(el) {
        el.unblock();
    }
    Utils.unblockElement = unblockElement;
    function InitErrorViewer() {
        $("#closeErrorViewBtn").on('click', function (ev) {
            $("#commonErrorView").modal('hide');
        });
    }
    Utils.InitErrorViewer = InitErrorViewer;
    function showError(error) {
        $("#errorMessageLabel").html('');
        //if (error.length > 1000)
        //    error = error.substring(0, 1000);
        //error = encodeURI(error);
        $("#errorMessageLabel").html(error);
        $("#commonErrorView").modal('show');
    }
    Utils.showError = showError;
})(Utils || (Utils = {}));
