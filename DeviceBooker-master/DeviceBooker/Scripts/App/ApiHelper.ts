/// <reference path="../typings/jquery/jquery.d.ts" />
// extend jquery static interface

interface JQueryStatic {
    parseJSON(json: string, convertDates: boolean): any;
}

module Api {

    declare var APIBaseUrl: string;

    function call(url: string, method: string, data: any, success: Function, error?: Function): JQueryXHR {
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
                "text json": value => $.parseJSON(value, true) // momentify dates
            },
            error: (qXHR, textStatus, errorThrow) => {
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
            success: d => {
                if (d == null) {
                    success(d);
                } else {
                    if (d.Message === "Authorization has been denied for this request.")
                        alert(d.Message);
                    success(d);
                }
            }
        });
    }

    export function Get(url: string, success: Function, error?: Function): JQueryXHR {
        if (url.indexOf('?') > -1) {
            url += "&ts=" + new Date().getTime();
        } else {
            url += "?ts=" + new Date().getTime();
        }
        return call(url, "GET", {}, success, error);
    }

    export function Post(url: string, data: any, success: Function, error?: Function): JQueryXHR {
        return call(url, "POST", data, success, error);
    }

    export function Put(url: string, data: any, success: Function, error?: Function): JQueryXHR {
        return call(url, "PUT", data, success, error);
    }

    export function Delete(url: string, success: Function, error?: Function): JQueryXHR {
        return call(url, "DELETE", {}, success, error);
    }
}
