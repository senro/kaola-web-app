define(function (require,exports,module) {

    var $ = require('jquery');

    var global = window,

        location = global.location,
        sessionStorage = global.localStorage,

        apiHost = global.baseUrl,
        webHost = global.baseUrl,

        loginPageUrl = webHost + '/views/account/login.html',
        logoutPageUrl = webHost + '/views/account/logout.html',
        currentPageUrl = location.href.split('?').shift(),

        sessionData = JSON.parse(sessionStorage.getItem('run_sessionData')) || {},
        userId = sessionData.userId,
        userKey = sessionData.key,
        account = sessionData.userName,
        username = sessionData.name,
        cityId = sessionData.cityId,
        cityName = sessionData.cityName,
        isAdmin = sessionData.isAdmin === '1',
        isSetPassword = sessionData.isSetPassword === '1',

        service_data = JSON.parse(sessionStorage.getItem('service_sessionData')) || {},
        accountUrl =   service_data.account,
        cutUrl = service_data.cut,
        gameUrl = service_data.game,
        versionHtml = '<option value="">选择版本</option><option value="1.2.0">1.2.0</option>' +
            '<option alue="1.2.1">1.2.1</option><option value="1.3.0">1.3.0</option>';


    currentPageUrl = currentPageUrl.split('#').shift();

    // 未登录，回登录页
    if (!account &&
        currentPageUrl != loginPageUrl) {
        //sessionStorage.clear();
        //location.href = loginPageUrl;//todo 调试默认跳到首页
        //location.href = router();
    }

    // 在登录页，已登录
    // 根据已登录的角色转走
    if (account &&
        currentPageUrl === loginPageUrl) {
        //location.href = router();
    }

    /**
     * 路由
     * 返回一个菜单中第一个出现的URL地址。
     * 没有获到到URL时，提示：没有对应的权限，并返回登录页。
     * @returns {String}
     */
    function router() {
        sessionData = JSON.parse(sessionStorage.getItem('run_sessionData')) || {};
        userId = sessionData.userId;
        userKey = sessionData.key;
        account = sessionData.name;
        username = sessionData.userName;
        cityId = sessionData.cityId;
        cityName = sessionData.cityName;
        isAdmin = sessionData.isAdmin === '1';
        isSetPassword = sessionData.isSetPassword === '1';

        var url = '/views/examine-list/examine-list.html';

        //if (!isSetPassword) {
        //    url = '/views/account/reset-password.html';
        //} else if (isAdmin) {
        //    url = '/views/system-setting/administrator-setting.html';
        //}

        return webHost + url;
    }


    //var Spinner = require('spin'),
    //    spinner = new Spinner({
    //        length: 18,
    //        width: 5,
    //        radius: 8,
    //        color: '#666'
    //    }),
    //    $spinnerBg = $('<div id="spinner"></div>');
    //
    //var $body = $('body'),
    //    $container = $('#container');
    //
    //$body.append($spinnerBg);
    //$( document ).ajaxStart(function() {
    //    var $input = $('input:focus'),
    //        $select = $('select:focus');
    //
    //    if (window.disableSpinner ||
    //        currentPageUrl === loginPageUrl ||
    //        currentPageUrl === logoutPageUrl ||
    //        $input.length ||
    //        $select.length) {
    //        return;
    //    }
    //
    //    $spinnerBg.show();
    //    spinner.spin(
    //        $container.get(0) ||
    //        $body.get(0)
    //    );
    //});
    //$( document ).ajaxStop(function() {
    //    $spinnerBg.hide();
    //    spinner.stop();
    //});
    //
    //$( window ).on('error', function (e){
    //    $spinnerBg.hide();
    //    spinner.stop();
    //});


    return {
        global: global,

        location: location,
        sessionStorage: sessionStorage,

        apiHost: apiHost,
        webHost: webHost,

        loginPageUrl: loginPageUrl,
        currentPageUrl: currentPageUrl,

        userId: userId,
        userKey: userKey,
        account: account,
        cityId: cityId,
        cityName: cityName,
        username: username,
        isAdmin: isAdmin,
        accountUrl: accountUrl,
        cutUrl: cutUrl,
        gameUrl: gameUrl,
        versionHtml: versionHtml,

        router: router
    };
});