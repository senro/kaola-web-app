/**
 * Created with PhpStorm.
 * User: Administrator
 * Date: 2015/10/26
 * Time: 14:17
 * To change this template use File | Settings | File Templates.
 */
define(function (require, exports, module) {

    /*
     *保存数据：localStorage.setItem(key,value);
     读取数据：localStorage.getItem(key);
     删除单个数据：localStorage.removeItem(key);
     删除所有数据：localStorage.clear();
     得到某个索引的key：localStorage.key(index);
     * */
    var signals=require('signals');

    var localObj,
        userObj = {
            account: {},
            goodsIds: []
        };

    signals.getLocalObj.add(function (localObj) {
        if (localObj != 'null') {
            userObj = localObj;
        } else if (cookie('get', 'userObj')) {
            userObj = JSON.parse(cookie('get', 'userObj'));
        } else {
            userObj = {account: {}, goodsIds: []};
        }
    });
    window.parent.postMessage(require('components/cordova/cache/getLocalObj'), '*');

});