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
    var radio=require('radio');
    var getQueryString=require('get-query-string');

    var template=require('template');
    template.helper('$',$);
    template.helper('Number',Number);
    template.helper('Math',Math);
    template.helper('decodeURIComponent', decodeURIComponent);

    App.page('applyReplenishment', function () {
        this.show=function(){
            var $currSection = $('#applyReplenishment_section');
            var title = getQueryString('title', $currSection.data('query'));
            var repoId=getQueryString('repoId', $currSection.data('query'));
            $currSection.find('.item-detail-tit').html(title);

            //reset
            $currSection.find('.item-detail-form')[0].reset();

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
                            utilFunctions.calculateInput($currSection.find('.item-detail-form-input'),$currSection.find('.total .num'),$currSection.find('.minus'));
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
        };
        this.init = function () {
            var $currSection = $('#applyReplenishment_section');

            radio($currSection.find('.radio'),'active');
            //申请补货按钮动作
            $currSection.find('.btn-confirm').on('tap',function(){
                var $itemInput=$currSection.find('.item-detail-form-input');
                var $radio=$currSection.find('.radio.active');
                var $this = $(this);
                if ($this.hasClass('disable')) {
                    return false;
                }
                J.confirm('','确认申请'+($radio.data('id')=='1'?'加急':'')+'补货？',function(){
                    $.ajax({
                        url: apiHost + 'areaManagement/replenishmentApply.do',
                        data: {
                            key:window.userObj.account.key,
                            repoId:getQueryString('repoId', $currSection.data('query')),
                            applyJson: JSON.stringify(cellectParamJson($itemInput)),
                            isEmergency: $radio.data('id')
                        },
                        dataType: 'json',
                        success: function (data) {
                            //var data=JSON.parse(data);
                            if (data.status == 1) {
                                J.showToast('申请成功！', 'success');
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
                },function(){

                });
                return false;
            });
            function cellectParamJson($inputs){
                var json=[];
                $inputs.each(function(){
                    var obj={};
                    var $this=$(this);
                    obj.goodsId=$this.attr('data-goodsId');
                    obj.goodsName=$this.attr('name');
                    obj.unit=$this.attr('data-unit');
                    //obj.before=$this.attr('data-before');
                    obj.supplement=$this.attr('value');
                    if(!$this.attr('readonly')&&obj.supplement>0){
                        json.push(obj);
                    }

                });
                return json;
            }
        };

    });

});