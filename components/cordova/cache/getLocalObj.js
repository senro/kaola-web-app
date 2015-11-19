/**
 * Created with PhpStorm.
 * User: Administrator
 * Date: 2015/10/26
 * Time: 14:26
 * To change this template use File | Settings | File Templates.
 */
define(function (require, exports, module) {
    module.exports=[
        "var localObj=window.localStorage.getItem('localObj');",
        "$('#iframe')[0].contentWindow.postMessage('getLocalObj|:|'+localObj,'*');"
    ].join("\n");

});
