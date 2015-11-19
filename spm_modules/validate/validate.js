define(function (require,exports,module) {

    var $=require('jquery');
    var systemMessage=require('system-message');

    function validateForm($form){
        var canSubmit=true;
        var $requireItems=$form.find('select[required=required],input[required=required]');

        $requireItems.each(function(index){
            var $currItem=$(this),
                type=$currItem.attr('data-vd-type')||'input',
                msg=$currItem.attr('data-vd-msg'),
                valueType=$currItem.attr('data-vd-valueType'),
                value;

            switch (type){
                case 'select':
                    value=$currItem.find('option:selected').val();
                    if(!valueType){
                        //没有定义值类型，默认只检测是否为空
                        if(!value){
                            canSubmit=false;
                            systemMessage.alert(msg);
                            return false;
                        }
                    }
                    break;
                case 'input':
                    value=$currItem.val();
                    if(!valueType){
                        //没有定义值类型，默认只检测是否为空
                        if(!value){
                            canSubmit=false;
                            systemMessage.alert(msg);
                            return false;
                        }
                    }
                    break;
            }
        });

        return canSubmit;
    }
    exports.validateForm=validateForm;

});