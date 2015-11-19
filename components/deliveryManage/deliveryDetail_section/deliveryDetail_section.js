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
    var dateExtend=require('date-extend');

    var template=require('template');
    template.helper('$',$);
    template.helper('Number',Number);
    template.helper('decodeURIComponent', decodeURIComponent);

    var startPage = 0,
        pageSize = 10,
        totalPage;

    App.page('deliveryDetail', function () {
        this.show=function(){
            var $currSection = $('#deliveryDetail_section');
            var title = getQueryString('title', $currSection.data('query'));
            var repoId=getQueryString('repoId', $currSection.data('query'));
            var repoName=getQueryString('repoName', $currSection.data('query'));
            var staffMobile=getQueryString('staffMobile', $currSection.data('query'));
            var staffId =getQueryString('staffId', $currSection.data('query'));
            var staffName=title;
            $currSection.find('.title').html(title);
            $currSection.find('.staffName').html(staffName);
            $currSection.find('.repoName').html(repoName);
            $currSection.find('.staffMobile').html(staffMobile);
            //初始化查看绩效按钮链接
            $currSection.find('.right a').attr('href','#checkPerformance_section?staffId='+staffId+'&staffName='+staffName);
            //加载片区订单列表
            var list_item_tpl=__inline('list-item-tpl.html');
            $.ajax({
                url: apiHost + 'areaManagement/queryDelivererDetailsPage.do',
                dataType: 'json',
                data:{
                    key:window.userObj.account.key,
                    repoId:getQueryString('repoId', $currSection.data('query')),
                    staffId :getQueryString('staffId', $currSection.data('query')),
                    page:0,
                    size:100
                },
                success: function (data) {
                    if (data.status == 1) {
                        if(data.data.delivererDetailsPage.content){
                            var render=template.compile(list_item_tpl);
                            $currSection.find('.notDelivery-order-list').html(render(data.data.delivererDetailsPage));
                            $currSection.find('.totalOrders').html(data.data.delivererDetailsPage.content.length);
                            //计算已用时间
                            var $tags=$currSection.find('.notDelivery-order-list-item').find('.tag');
                            $tags.each(function(){
                                var $this=$(this),
                                    currentTime=$this.attr('data-currentTime'),
                                    receiveTime=$this.attr('data-receiveTime'),
                                    time=currentTime-receiveTime,
                                    timeObj=dateExtend.parseTime(time);
                                $this.find('.time').html((timeObj.day!=0?(timeObj.day+'天'):'')+(timeObj.hour!=0?(timeObj.hour+'时'):'')+timeObj.min+'分');
                            });
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

        }
    });

});