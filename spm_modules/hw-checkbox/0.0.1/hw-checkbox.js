define(function (require,exports,module) {
    var $ = require('jquery');

    module.exports = function (str_className, str_selectedClassName, callback, int_maxNum) {
        /*
         * @位置：  常用界面交互方法；
         * @名字：  checkBox；
         * @翻译：  多选框（ 要模拟checkbox选项的类名，已选后的类名，限制个数, 回调 ）；
         * @参数：  checkBox( str_className,str_selectedClassName,int_maxNum )
         *         className（字符串）：【必填】要模拟checkbox选项的类名
         *         selectedClassName（字符串）：【必填】已选后的类名
         *         maxNum（数字）：【可选】限制选项个数，默认不限;
         * @功能：  模拟checkBox的行为，可以限制多选个数，选项里可以有input；
         * @返回：  无；
         * @实例：  /test-html/3.2/UIInteractive/questionnaire.html；
         * @需要：  无；
         * @备注：  结构比如<a class="multi" href="javascript:;">15岁以下</a>；
         */
        var $checkBox =typeof str_className == 'String'?$('.' + str_className):str_className,
            maxNum = int_maxNum || 'noLimit';

        $checkBox.click(function () {
            var $this = $(this),
                $otherAnswers = $this.siblings();

            if (maxNum != 'noLimit' && $otherAnswers.filter('[data-selected=selected]').length >= maxNum) {
                return false;
            } else {
                if (!$this.hasClass(str_selectedClassName)) {
                    $this.addClass(str_selectedClassName);
                    $this.attr('data-selected', 'selected');
                } else {
                    $this.removeClass(str_selectedClassName);
                    $this.attr('data-selected', 'undefind');
                }
            }
            
            if($.isFunction(callback)) {
                callback($(this));
            }
            return false;
        });
        if ($checkBox.find('input').length > 0) {
            $checkBox.find('input').click(function () {
                var $thisAnswer = $(this).parent(),
                    $thisOtherAnswers = $thisAnswer.siblings();

                if (maxNum != 'noLimit' && $thisOtherAnswers.filter('[data-selected=selected]').length >= maxNum) {
                    return false;
                } else {
                    $thisAnswer.addClass(str_selectedClassName);
                    $thisAnswer.attr('data-selected', 'selected');
                }

                return false;
            });
        }
        return false;
    };
});