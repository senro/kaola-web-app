/**
 * Created with PhpStorm.
 * User: Administrator
 * Date: 2015/10/31
 * Time: 13:30
 * To change this template use File | Settings | File Templates.
 */
define(function (require, exports, module) {
    var Mock=require('mock');

    // Mock.mock(rurl, template)
    Mock.mock(/login\/enter\.do/, {
        "status":"1",
        "data":{
            "userId":"1",
            "runnerId":1,
            "userName":"haowu@haowu.com",
            "name":"admin",
            "isAdmin":"1",
            "isSetPassword":"1",
            "cityId":"310100",
            "cityName":"上海市",
            "activityManageGoodsDTOs":[]
        },
        "detail":"请求数据成功!",
        "key":"3e801f50-10d8-44d7-9ce7-83e57fe582f1"
    });
});
