/**
 * Created with PhpStorm.
 * User: Administrator
 * Date: 2015/9/11
 * Time: 16:16
 * To change this template use File | Settings | File Templates.
 */
define(function (require, exports, module) {
    module.exports=[
        "navigator.camera.getPicture(onSuccess, onFail, { quality: 1,",
            "destinationType: Camera.DestinationType.DATA_URL",
        "});",

        "function onSuccess(imageData) {",
            "$('#iframe')[0].contentWindow.postMessage('getPicture|:|'+imageData,'*');",
        "}",

        "function onFail(message) {",
            "alert('Failed because: ' + message);",
        "}"
    ].join("\n");

});
