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
    template.helper('decodeURIComponent', decodeURIComponent);

    var startPage = 0,
        pageSize = 10,
        totalPage;

    App.page('areaList', function () {
        var up_refresh_article_scroll;
        this.show=function(){
            var areaOrderListParams='key='+window.userObj.account.key;
            var $currSection = $('#areaList_section');
            //reset
            startPage = 0;
            $currSection.find('.input-search').val('');
            $currSection.find('.title').html(window.userObj.account.repoAreaName);

            //加载分仓列表
            var repoAreaListTpl=__inline('warehouse-list-item-tpl.html');
            $.ajax({
                url: apiHost + 'areaManagement/queryBranchWarehousePage.do',
                dataType: 'json',
                data:{
                    key:window.userObj.account.key,
                    repoId:1,
                    page:0,
                    size:100
                },
                success: function (data) {
                    if (data.status == 1) {
                        if(data.data.content&&data.data.content.length>0){
                            var render=template.compile(repoAreaListTpl);
                            $('.warehouse-list').html(render(data.data));
                        }else{
                            $('.warehouse-list').html('<li>没有相关信息</li>');
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
            //加载派送员列表
            var delivery_list_item_tpl=__inline('delivery-list-item-tpl.html');
            $.ajax({
                url: apiHost + 'areaManagement/queryDelivererPage.do',
                dataType: 'json',
                data:{
                    key:window.userObj.account.key,
                    page:0,
                    size:100
                },
                success: function (data) {
                    if (data.status == 1) {
                        if(data.data.content&&data.data.content.length>0){
                            var render=template.compile(delivery_list_item_tpl);
                            $('.delivery-list').html(render(data.data));
                        }else{
                            $('.delivery-list').html('<li><p>没有相关信息</p></li>');
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
            //加载片区订单列表
            $('.areaOrder-list').html('');
            getAreaOrderList(areaOrderListParams+'&page=' + startPage + '&size=' + pageSize,null,function(){
                up_refresh_article_scroll.scroller.refresh();
            });
        };
        this.init = function () {
            var areaOrderListParams='key='+window.userObj.account.key;
            var $currSection = $('#areaList_section');

            //上下拉
            up_refresh_article_scroll = J.Refresh('#areaOrder_list', 'pullUp', function (refreshEl) {
                //refreshEl.show();
                var scroll = this;

                startPage++;
                if (totalPage > startPage) {
                    var searchInputVal = $currSection.find('#areaOrder_list').find('.input-search').val(),
                        mobileParam = '';

                    if (searchInputVal && /1[0-9]{10}/g.test(searchInputVal)) {
                        mobileParam = '&phone=' + searchInputVal;
                    }
                    getAreaOrderList(areaOrderListParams+'&page=' + startPage + '&size=' + pageSize+ mobileParam, null, function () {
                        scroll.refresh();
                        J.showToast('加载成功', 'success');
                        refreshEl.hide();
                    });
                } else {
                    scroll.refresh();
                    J.showToast('没有更多了', 'success');
                    refreshEl.hide();
                }
            },true,function(forceRefreshEl){
                //下拉
                var scroll = this;
                startPage = 0;
                $('.orderListItems').html('');

                var searchInputVal = $('.input-search').val(),
                    mobileParam = '';

                if (searchInputVal && /1[0-9]{10}/g.test(searchInputVal)) {
                    mobileParam = '&phone=' + searchInputVal;
                }
                getAreaOrderList(areaOrderListParams+'&page=' + startPage + '&size=' + pageSize + mobileParam, null,function () {
                    scroll.refresh();
                    J.showToast('刷新成功', 'success');
                    forceRefreshEl.hide();
                }, function () {
                    //搜索有结果的开始
                }, function () {
                    //搜索没有结果
                    J.showToast('没有订单！', 'error');
                    forceRefreshEl.hide();
                });
            });
            //搜索
            $('.btn-search').tap(function () {
                var $this = $(this);
                var searchInputVal = $currSection.find('.input-search').val();

                if ($this.hasClass('disable')) {
                    return false;
                }
                if (searchInputVal) {
                    if (/1[0-9]{10}/g.test(searchInputVal)) {
                        startPage = 0;
                        getAreaOrderList(areaOrderListParams+'&page=0&size=' + pageSize + '&phone=' + searchInputVal, null, function () {
                            up_refresh_article_scroll.scroller.refresh();
                            //J.showToast('加载成功','success');
                        }, function () {
                            //搜索有结果
                            startPage = 0;
                            $('.areaOrder-list').html('');
                        }, function () {
                            //搜索没有结果
                            J.showToast('未搜索到任何结果！', 'error');
                        });
                    } else {
                        J.showToast('请输入正确的手机号！', 'error');
                    }
                } else {
                    startPage = 0;
                    $('.areaOrder-list').html('');
                    getAreaOrderList(areaOrderListParams+'&page=' + startPage + '&size=' + pageSize, null,function () {
                        up_refresh_article_scroll.scroller.refresh();
                        //J.showToast('加载成功','success');
                    }, function () {
                        //搜索有结果
                        //startPage = 0;
                        //$('.orderListItems').html('');
                    }, function () {
                        //搜索没有结果
                        J.showToast('未搜索到任何结果！', 'error');
                    });
                }

            });
            // 分仓管理，不显示‘新增派送员’
            $('.areaList-tabBtn').tap(function () {
                var $this = $(this),
                    url=$this.attr('href');
                if(url!='#warehouse_list'){
                    $currSection.find('.btn-addDelivery').show();
                }else{
                    $currSection.find('.btn-addDelivery').hide();
                }
            });
            //确认送达
            $('body').on('tap','.btn-confirm-delivery',function () {
                var $this = $(this),
                    $thisItem=$this.parents('.areaList-item');
                var id = $this.attr('data-deliveryOrderId');

                if ($this.hasClass('disable')) {
                    return false;
                }
                if (id) {
                    $.ajax({
                        url: apiHost + 'areaManagement/confirmDelivery.do',
                        dataType: 'json',
                        data:{
                            key:window.userObj.account.key,
                            deliveryOrderId:id
                        },
                        success: function (data) {
                            if (data.status == 1) {
                                J.showToast('确认送达成功！', 'success');
                                $thisItem.remove();
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
                } else {
                    J.showToast('派送单id为空！', 'error');
                }

            });
        };
        function getAreaOrderList(params,beforeCallback, completeCallback, usefullCallback, uselessCallback) {
            var areaOrder_list_item_tpl=__inline('areaOrder-list-item-tpl.html');
            var phone=getQueryString('phone', params);

            $.ajax({
                url: apiHost + 'areaManagement/'+(phone?'queryAreaOrderPageByPhone.do':'queryAreaOrderPage.do'),
                dataType: 'json',
                data:params,
                success: function (data) {
                    if (data.status == 1) {
                        if(data.data.content&&data.data.content.length>0){
                            usefullCallback && usefullCallback(data);

                            var render=template.compile(areaOrder_list_item_tpl);
                            $('.areaOrder-list').append(render(data.data));

                            totalPage = data.data.totalPages;
                            startPage = data.data.number;
                        }else {
                            uselessCallback && uselessCallback();
                            $('.areaOrder-list').html('');
                            $('.areaOrder-list').append(
                                '<li class="orderListItem clearfix" data-selected="selected"><p class="textCenter">没有相关订单</p></li>'
                            );
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
                    beforeCallback && beforeCallback();
                },
                complete: function () {
                    completeCallback && completeCallback();
                }
            });

        }
    });

});