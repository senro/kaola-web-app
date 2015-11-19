/*
* alert('Latitude: '          + position.coords.latitude          + '\n' +
 'Longitude: '         + position.coords.longitude         + '\n' +
 'Altitude: '          + position.coords.altitude          + '\n' +
 'Accuracy: '          + position.coords.accuracy          + '\n' +
 'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
 'Heading: '           + position.coords.heading           + '\n' +
 'Speed: '             + position.coords.speed             + '\n' +
 'Timestamp: '         + position.timestamp                + '\n');
* */
define(function (require, exports, module) {
    module.exports=[
        "var onSuccess = function(position) {",
                "$('#iframe')[0].contentWindow.postMessage('getCurrPos|:|'+JSON.stringify(position),'*');",
            "};",
        "var onError = function(error) {",
            "//alert('code:'+ error.code +',message: ' + error.message);",
        "}",

        "navigator.geolocation.getCurrentPosition(onSuccess, onError);"
    ].join("\n");

});