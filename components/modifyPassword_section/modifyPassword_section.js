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

    App.page('modifyPassword', function () {
        this.show = function () {
            var $currSection = $('#modifyPassword_section');
            $currSection.find('form')[0].reset();
        };
        this.init = function () {
            var $currSection = $('#modifyPassword_section');
            //修改按钮
            $currSection.find('.btn-modify').on('tap',function(){
                var $this = $(this),
                    oldPass=$('#oldPassword').val(),
                    password=$('#password').val(),
                    confirmPassword=$('#confirmPassword').val();

                if ($this.hasClass('disable')) {
                    return false;
                }
                if(confirmPassword==password){
                    J.confirm('','确认修改密码？',function(){
                        $.ajax({
                            url: apiHost + 'user/modifyPass.do',
                            dataType: 'json',
                            data:{
                                key:window.userObj.account.key,
                                userId:window.userObj.account.userId,
                                oldPass:oldPass,
                                newPass:password
                            },
                            success: function (data) {
                                if (data.status == 1) {
                                    J.showToast('修改成功！', 'success');
                                    J.Router.goTo('#user_section');
                                    //window.location.reload();
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
                    },function(){

                    });

                }else {
                    J.showToast('两次密码不相同！', 'error');
                }

                return false;
            });
        }
    });

});