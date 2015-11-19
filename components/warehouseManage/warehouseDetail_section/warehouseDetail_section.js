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

    App.page('warehouseDetail', function () {
        this.show=function() {
            var $currSection = $('#warehouseDetail_section');
            var title = getQueryString('title', $currSection.data('query'));
            var repoId=getQueryString('repoId', $currSection.data('query'));
            $currSection.find('.title').html(title);

            //加载分仓详情
            var item_detail_table_item_tpl=__inline('item_detail_table_item_tpl.html');
            $.ajax({
                url: apiHost + 'areaManagement/queryBranchWarehouseDetails.do',
                dataType: 'json',
                data:{
                    key:window.userObj.account.key,
                    repoId:repoId,
                    page:0,
                    size:100
                },
                success: function (data) {
                    if (data.status == 1) {
                        if(data.data){
                            var render=template.compile(item_detail_table_item_tpl);
                            $currSection.find('.item-detail-table').html(render(data.data));
                            if(data.data.supplyCount>0){
                                $currSection.find('.right').show();
                                $currSection.find('.right').find('a').attr('href','#warehouseDetailReplenishment_section?repoId='+getQueryString('repoId', $currSection.data('query'))+'&title='+title);
                                $currSection.find('.right').find('a span').html(data.data.supplyCount);
                            }
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

                }
            });
            //加载分仓接头人信息
            var areaInfo_table_tpl=__inline('areaInfo_table_tpl.html');
            $.ajax({
                url: apiHost + 'areaManagement/queryConsignee.do',
                dataType: 'json',
                data:{
                    key:window.userObj.account.key,
                    repoId:repoId
                },
                success: function (data) {
                    if (data.status == 1) {
                        if(data.data){
                            var render=template.compile(areaInfo_table_tpl);
                            $currSection.find('.areaInfo-table').html(render(data.data));
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

                }
            });
            //初始化下面按钮链接
            $('.warehouseDetail-footer-btn.btn-modify').attr('href','#modifyCount_section?repoId='+repoId+'&title='+title);
            $('.warehouseDetail-footer-btn.btn-apply').attr('href','#applyReplenishment_section?repoId='+repoId+'&title='+title);
        };
        this.init = function () {


        }
    });

});