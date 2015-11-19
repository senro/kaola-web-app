/**
 * Created with PhpStorm.
 * User: Administrator
 * Date: 2015/10/23
 * Time: 15:44
 * To change this template use File | Settings | File Templates.
 */
define(function (require, exports, module) {
    var $=require('zepto');
    var J=require('jingle');
    var cookie=require('cookie');
    var App=require('App');
    var utilFunctions=require('components/util/utilFunctions');

    App.page('user', function () {
        this.show = function () {
            var $currSection = $('#user_section');
            $currSection.find('.name').html(window.userObj.account.name);
            $currSection.find('.mobile').html(window.userObj.account.mobile);
            $currSection.find('.role').html(window.userObj.account.roleName);
        };
        this.init = function () {
            var $currSection = $('#user_section');
            //退出按钮
            $currSection.find('.btn-loginOut').on('tap',function(){
                var $this = $(this);
                //if ($this.hasClass('disable')) {
                //    return false;
                //}
                $.ajax({
                    url: apiHost + 'login/logout.do',
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.status == "-99") {
                            J.Router.goTo('#login_section');
                            window.location.reload();
                        } else {
                            J.showToast(data.detail, 'error');
                        }
                    },
                    beforeSend: function () {
                        $this.addClass('disable');
                    },
                    complete: function () {
                        $this.removeClass('disable');
                    }
                });
                return false;
            });
        }
    });

});