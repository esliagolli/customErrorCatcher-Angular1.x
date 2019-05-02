'use strict';

var app = angular.module("customErrorCatcher", []);

var errorsArray = []

app.factory('$exceptionHandler', ['$injector', function ($injector) {
    return function (...args) {
        var infoError = {
            exception: args[0],
            cause: args[1]
        };
        // console.log('Exception caught by $exceptionHandler', ...args);
        console.log('this is the error object: ', infoError)

        if(errorsArray.length > 0) {
            if((infoError.exception !== errorsArray[errorsArray.length - 1].exception) && (infoError.cause !== errorsArray[errorsArray.length - 1].cause)) {
                errorsArray.push(infoError)
            }
        } else {
            errorsArray.push(infoError)
        }

        console.log('errorsArray', errorsArray)
    }
}])

window.onbeforeunload = function($http) {

    $http.post('/path-to-send-the-error-array', errorsArray,{
    }).then(function (response) {
        console.log(response)
    }).catch(reason => console.error('unable to send exception info to server due to...', reason));

    return undefined; //using onbeforeload without dialog
}