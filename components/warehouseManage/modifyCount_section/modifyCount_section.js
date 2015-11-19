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

    App.page('modifyCount', function () {
        this.show=function(){
            var $currSection = $('#modifyCount_section');
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
            var $currSection = $('#modifyCount_section');
            //修改库存按钮动作
            $currSection.find('.btn-modify').on('tap',function(){
                var $itemInput=$currSection.find('.item-detail-form-input');
                var $changeReason=$currSection.find('#changeReason');
                var $this = $(this);
                if ($this.hasClass('disable')) {
                    return false;
                }
                if ($changeReason.val()) {
                    $.ajax({
                        url: apiHost + 'areaManagement/updateStock.do',
                        data: {
                            key:window.userObj.account.key,
                            repoId:getQueryString('repoId', $currSection.data('query')),
                            updateJson: JSON.stringify(cellectParamJson($itemInput)),
                            changeReason : $changeReason.val()
                        },
                        dataType: 'json',
                        success: function (data) {
                            //var data=JSON.parse(data);
                            if (data.status == 1) {
                                J.showToast('修改成功！', 'success');
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
                    J.showToast('请填写修改库存理由！', 'error');
                }
            });
            function cellectParamJson($inputs){
                var json=[];
                $inputs.each(function(){
                    var obj={};
                    var $this=$(this);
                    obj.goodsId=$this.attr('data-goodsId');
                    obj.goodsName=$this.attr('name');
                    obj.unit=$this.attr('data-unit');
                    obj.before=$this.attr('data-before');
                    obj.after=$this.attr('value');
                    json.push(obj);
                });
                return json;
            }
        }
    });

});