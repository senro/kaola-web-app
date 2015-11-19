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
    var checkbox=require('checkbox');
    var getQueryString=require('get-query-string');

    var template=require('template');
    template.helper('$',$);
    template.helper('Number',Number);
    template.helper('decodeURIComponent', decodeURIComponent);

    var startPage = 0,
        pageSize = 10,
        totalPage;

    App.page('addDelivery', function () {
        this.show=function(){
            var $currSection = $('#addDelivery_section');
            var staffId =getQueryString('staffId', $currSection.data('query'));
            var staffName=getQueryString('staffName', $currSection.data('query'));

            $currSection.find('.title .name').html(staffName);

            //加载片区选择框
            var select_item_tpl=__inline('select_item_tpl.html');
            $.ajax({
                url: apiHost + 'areaManagement/queryBranchWarehouseList.do',
                dataType: 'json',
                data:{
                    key:window.userObj.account.key,
                    staffId :getQueryString('staffId', $currSection.data('query')),
                    page:0,
                    size:100
                },
                success: function (data) {
                    if (data.status == 1) {
                        if(data.data){
                            var render=template.compile(select_item_tpl);
                            $currSection.find('.select-warehouse').html(render(data.data));
                        }
                    } else if (data.status == '-99') {
                        J.Router.goTo('#login_section');
                        //根据缓存自动填写手机号
                        if (userObj.account && userObj.account.mobile) {
                            $('.input-cellphone').val(userObj.account.mobile);
                        }
                    } else {
                        J.showToast(data.detail, 'error');
                    }

                },
                beforeSend: function () {

                },
                complete: function () {

                }
            });
        };
        this.init = function () {
            var $currSection = $('#addDelivery_section');
            checkbox($currSection.find('.input-row-authority .checkbox'),'active');
            //新增派送员动作
            $currSection.find('.btn-confirm').on('tap',function(){
                var $this = $(this);
                if ($this.hasClass('disable')) {
                    return false;
                }
                if ($currSection.find('#name').val()&&$currSection.find('#mobile').val()) {
                    $.ajax({
                        url: apiHost + 'areaManagement/addDeliverer.do',
                        data: {
                            key:window.userObj.account.key,
                            name:encodeURIComponent($.trim($currSection.find('#name').val())),
                            mobile:$currSection.find('#mobile').val(),
                            repoId: $currSection.find('#select-warehouse').find('option:selected').val(),
                            isConnector: $currSection.find('#isConnector').hasClass('active')?true:false,
                            isSelfDelivery : $currSection.find('#isSelfDelivery').hasClass('active')?true:false,
                            isSelfFetch : $currSection.find('#isSelfFetch').hasClass('active')?true:false,
                            isActivity : $currSection.find('#isActivity').hasClass('active')?true:false
                        },
                        dataType: 'json',
                        success: function (data) {
                            //var data=JSON.parse(data);
                            if (data.status == 1) {
                                J.showToast('新增成功！', 'success');
                                $currSection.find('form')[0].reset();
                                $currSection.find('.btn-back').trigger('tap');
                            } else if (data.status == '-99') {
                                J.Router.goTo('#login_section');
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
                } else {
                    J.showToast('请先完善信息！', 'error');
                }
                return false;
            });

            $('#mobile').on('input', function () {
                var $this = $(this),
                    value = $this.val(),
                    maxLength = parseInt($this.attr('maxlength'));

                maxLength = isNaN(maxLength) ? 11: maxLength;

                if (value.length > maxLength) {
                    $this.val(value.slice(0, maxLength));
                }
            });
        }
    });

});