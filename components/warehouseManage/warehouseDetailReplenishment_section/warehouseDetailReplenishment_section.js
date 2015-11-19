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

    var getQueryString=require('get-query-string');
    var template=require('template');
    template.helper('$',$);
    template.helper('Number',Number);
    template.helper('decodeURIComponent', decodeURIComponent);

    var startPage = 0,
        pageSize = 10,
        totalPage;

    App.page('warehouseDetailReplenishment', function () {
        this.show=function() {
            var $currSection = $('#warehouseDetailReplenishment_section');
            var title = getQueryString('title', $currSection.data('query'));
            $currSection.find('.title').html(title);

            //加载补货列表
            var item_detail_table_item_tpl=__inline('item_detail_table_item_tpl.html');
            $.ajax({
                url: apiHost + 'areaManagement/queryReplenishmentList.do',
                dataType: 'json',
                data:{
                    key:window.userObj.account.key,
                    repoId:getQueryString('repoId', $currSection.data('query')),
                    page:0,
                    size:100
                },
                success: function (data) {
                    if (data.status == 1) {
                        if(data.data){
                            var render=template.compile(item_detail_table_item_tpl);
                            $currSection.find('.warehouseDetailReplenishment-list').html(render(data.data));
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
            var $currSection = $('#warehouseDetailReplenishment_section');
            var title = getQueryString('title', $currSection.data('query'));

            //补货列表下拉
            $currSection.on('tap','.warehouseDetailReplenishment-list-item',function(){
                var $this=$(this),
                    id=$this.data('id');
                $this.siblings().find('.item-detail').hide();
                $this.siblings().find('.icon').removeClass('arrow-down').addClass('next');
                if ( $this.find('.icon').hasClass('next') && id != '') {
                    $this.find('.item-detail').show();
                    $this.find('.icon').removeClass('next').addClass('arrow-down');
                }else {
                    $this.find('.item-detail').hide();
                    $this.find('.icon').removeClass('arrow-down').addClass('next');
                }
                return false;
            });
            //确认按钮动作
            $currSection.on('tap','.btn-confirm',function(){
                var $this=$(this),
                    id=$this.data('id');
                if ( id != '') {
                    J.confirm(
                        '',
                        '确认 '+title+' 已经收到货物?',
                        function(){
                            $.ajax({
                                url: apiHost + 'areaManagement/replenishmentConfirmation.do',
                                dataType: 'json',
                                data: {
                                    key: window.userObj.account.key,
                                    repoId: getQueryString('repoId', $currSection.data('query')),
                                    supplyRecordId:id
                                },
                                success: function (data) {
                                    if (data.status == 1) {
                                        J.showToast('确认成功！', 'success');
                                        $this.parents('.warehouseDetailReplenishment-list-item').remove();
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
                        },function(){

                        }
                    );

                } else {
                    J.showToast('补货id不能为空！', 'error', 0);
                }
                return false;
            });
        }
    });

});