/**
 * Created with PhpStorm.
 * User: Administrator
 * Date: 2015/9/17
 * Time: 13:24
 * To change this template use File | Settings | File Templates.
 */
define(function (require,exports,module) {
    function isNull(str) {
        //验证通过返回true，不通过返回false
        var str = $.trim(str);
        return str.length == 0;
    }

    function isChecked(str) {
        return str == 'checked';
    }

    function isEmail(str) {
        var myReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
        return myReg.test(str);
    }

    function isCellPhone(str) {
        var regu = /^[1][0-9][0-9]{9}$/;
        var re = new RegExp(regu);
        return re.test(str)
    }

    function isChinaID(str) {
        // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return reg.test(str);
    }

    function isPassword(str) {
        //验证通过返回true，不通过返回false
        var str = $.trim(str);
        return str.length > 6;
    }

    function isSame(str1, str2) {
        return str1 === str2 && isPassword(str1) && isPassword(str2);
    }

    function remote(str, name, url) {
        $.getJSON(url + '?jsoncallback=?' + name + '=' + str, function (data) {

        });
    }
});
