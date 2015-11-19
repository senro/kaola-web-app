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

    App.page('checkPerformance', function () {
        this.show=function(){
            var $currSection = $('#checkPerformance_section');
            var staffId =getQueryString('staffId', $currSection.data('query'));
            var staffName=getQueryString('staffName', $currSection.data('query'));

            $currSection.find('.title .name').html(staffName);

            //加载绩效
            var item_detail_table_item_tpl=__inline('item_detail_table_item_tpl.html');
            $.ajax({
                url: apiHost + 'areaManagement/queryDelivererAchievements.do',
                dataType: 'json',
                data:{
                    key:window.userObj.account.key,
                    staffId :getQueryString('staffId', $currSection.data('query'))
                },
                success: function (data) {
                    if (data.status == 1) {
                        if(data.data){
                            var render=template.compile(item_detail_table_item_tpl);
                            $currSection.find('.scrollWrapper').html(render(data));
                            //计算已用时间
                            var $tags=$currSection.find('.time');
                            $tags.each(function(){
                                var $this=$(this),
                                    time=$this.attr('data-time'),
                                    timeObj=dateExtend.parseTime(time,'s');
                                $this.html((timeObj.day!=0?(timeObj.day+'天'):'')+(timeObj.hour!=0?(timeObj.hour+'时'):'')+timeObj.min+'分');
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