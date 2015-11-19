define(function (require, exports, module) {

    //初始化app的native设置
    require('components/util/deviceSetting');
    //require('components/util/utilRouter');

    var $ = require('zepto');
    var cookie = require('cookie');
    var navigation = require('navigation');
    var App=require('App');

    if(cookie('get', 'userObj')){
        window.userObj = JSON.parse(cookie('get', 'userObj'));     // 全局登录信息
    }

    //模拟接口数据
    //require('components/util/mockInterface');
    require('components/login_section/login_section.js');
    require('components/deliveryManage/addDelivery_section/addDelivery_section.js');
    require('components/user_section/user_section.js');
    require('components/modifyPassword_section/modifyPassword_section.js');

    require('components/areaList_section/areaList_section.js');
    require('components/warehouseManage/warehouseDetail_section/warehouseDetail_section.js');
    require('components/warehouseManage/warehouseDetailReplenishment_section/warehouseDetailReplenishment_section.js');
    require('components/warehouseManage/modifyCount_section/modifyCount_section.js');
    require('components/warehouseManage/applyReplenishment_section/applyReplenishment_section.js');

    require('components/deliveryManage/deliveryDetail_section/deliveryDetail_section.js');
    require('components/deliveryManage/checkPerformance_section/checkPerformance_section.js');
    require('components/deliveryManage/addDelivery_section/addDelivery_section.js');


    var $aside = $('#section_container');
    $aside.load(window.baseUrl+'/components/login_section/login_section.html',function(html){
        App.run();
    });

});