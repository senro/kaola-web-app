/**
 * Created with PhpStorm.
 * User: Administrator
 * Date: 2015/10/26
 * Time: 14:29
 * To change this template use File | Settings | File Templates.
 */
define(function (require, exports, module) {
    //设置app ios 顶部状态栏的背景色
    window.parent.postMessage(require('components/cordova/statusBar/setStatusBar'), '*');
});
