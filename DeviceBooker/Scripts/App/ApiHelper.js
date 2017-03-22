/// <reference path="../typings/jquery/jquery.d.ts" />
// extend jquery static interface
var Api;
(function (Api) {
    function call(url, method, data, success, error) {
        if (APIBaseUrl == null) {
            APIBaseUrl = "/admin/Api/";
            console.log('ERROR: APIBaseUrl is not defined!');
            throw "ERROR: APIBaseUrl is not defined!";
        }
        // NOTE: quick hax to handle IE 10 äö problems
        //url = encodeURI(APIBaseUrl + url);
        url = APIBaseUrl + url;
        return $.ajax(url, {
            data: data, type: method, dataType: "json",
            contentType: 'application/json; charset=utf-8',
            converters: {
                "text json": function (value) { return $.parseJSON(value, true); } // momentify dates
            },
            error: function (qXHR, textStatus, errorThrow) {
                console.log("AJAX ERROR!");
                if (error !== undefined) {
                    {
                        //textStatus contains only "timeout", "error", "abort", and "parsererror". 
                        // If server gives more information on 
                        // qXHR.responseText - field (in case of http error), just show it.
                        if (qXHR.responseText !== "") {
                            if (qXHR.status == 404) {
                                window.location.href = '/Error';
                                return;
                            }
                            error(qXHR.responseText);
                        }
                        else
                            error(textStatus);
                    }
                }
            },
            success: function (d) {
                if (d == null) {
                    success(d);
                }
                else {
                    if (d.Message === "Authorization has been denied for this request.")
                        alert(d.Message);
                    success(d);
                }
            }
        });
    }
    function Get(url, success, error) {
        if (url.indexOf('?') > -1) {
            url += "&ts=" + new Date().getTime();
        }
        else {
            url += "?ts=" + new Date().getTime();
        }
        return call(url, "GET", {}, success, error);
    }
    Api.Get = Get;
    function Post(url, data, success, error) {
        return call(url, "POST", data, success, error);
    }
    Api.Post = Post;
    function Put(url, data, success, error) {
        return call(url, "PUT", data, success, error);
    }
    Api.Put = Put;
    function Delete(url, success, error) {
        return call(url, "DELETE", {}, success, error);
    }
    Api.Delete = Delete;
})(Api || (Api = {}));
