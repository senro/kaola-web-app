define(function(require,exports,module) {
    var jQuery = require('jquery');
    var $ = require('jquery');

    var core = function () {
        jQuery.extend({
            visibleHidden: function (e) {
                e.css({
                    visibility: "hidden"
                });
                return false;
            },
            visibleShow: function (e) {
                e.css({
                    visibility: "visible"
                });
                return false;
            }
        });
    };
    core.prototype = {
        constructor: core,
        //核心公用方法
//        checkRequire:function(type,fun_action){
//            /*
//             * @位置：  核心公用方法；
//             * @名字：  checkRequire；
//             * @翻译：  检测依赖（ 检测类型 ，回调）；
//             * @参数：  checkRequire( type, fun_action )
//             *         type（字符串）：【必填】'video','swf','login','iePng','drag','mouseWheel','MSClass'，'animateColors','cssSandpaper','tweenMax','testHtml5','preload'
//             *         fun_action（函数）： 【必填】自定义；
//             * @功能：  根据所传的依赖类型自动获取，所需依赖文件。并保证当该方法被多次调用时，引用文件只被加载一次。；
//             * @返回：  无；
//             * @实例：  /test-html/2.8/core/checkRequire.html；
//             * @需要：  无；
//             * @备注：  暂无；
//             */
//            var state=false;
//            //判断type类型是否初始化
//            for(var i=0;i<arr_requireJs.length;i++){
//                if(arr_requireJs[i]==type){
//                    state=true;
//                    break;
//                }
//            }
//            if(state){
//                if(!senro[type].state){
//                    senro[type].action.add(fun_action);
//                }else{
//                    fun_action();
//                    //保证方法异步执行，也会执行回调
//                    for(var j=0;j<senro[type].callbacks.length;j++){
//                        senro[type].callbacks[j]&&senro[type].callbacks[j](senro[type].objects[j]);
//                    }
//                }
//            }else{
//                alert(senro.errMsg[type]);
//            }
//
//            return false;
//        }//checkRequire end
// ,

        console: function (str) {
            /*
             * @位置：  核心公用方法；
             * @名字：  console；
             * @翻译：  输出（ 值 ）；
             * @参数：  console( str )
             *         str任意值【必填】；
             * @功能：  针对ie不支持console做兼容，保证ie使用console不报错；
             * @返回：  无；
             * @实例：  /test-html/3.2/core/console.html；
             * @需要：  无；
             * @备注：  暂无；
             */
            (function () {
                var method;
                var noop = function () {
                };
                var methods = [
                    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
                    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
                    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
                    'timeStamp', 'trace', 'warn'
                ];
                var length = methods.length;
                var console = (window.console = window.console || {});

                while (length--) {
                    method = methods[length];

                    // Only stub undefined methods.
                    if (!console[method]) {
                        console[method] = noop;
                    }
                }
            }());

            console && console.log(str);
        }//console end
        ,
        len: function (s) {
            /*
             * @位置：  核心公用方法；
             * @名字：  len；
             * @翻译：  字符串长度（ 字符串 ）；
             * @参数：  len( s )
             *         s任意字符串【必填】；
             * @功能：  英文字符算一个，中文字符算两个长度；
             * @返回：  长度（int）；
             * @实例：  /test-html/3.2/core/len.html；
             * @需要：  无；
             * @备注：  暂无；
             */
            var s = s || '';
            var l = 0;
            var a = s.split("");
            for (var i = 0; i < a.length; i++) {
                if (a[i].charCodeAt(0) < 299) {
                    l++;
                } else {
                    l += 2;
                }
            }
            return l;
        }//len end
        ,
        random: function (min, max) {
            /*
             * @位置：  核心公用方法；
             * @名字：  random；
             * @翻译：  随机区间（ 开始数，结束数 ）；
             * @参数：  random( min, max )
             *         min，max为数字【必填】；
             * @功能：  返回在min到max区间的随机数，返回值包括min，不包括max；
             * @返回：  随机数（int）；
             * @实例：  /test-html/3.2/core/random.html；
             * @需要：  无；
             * @备注：  暂无；
             */
            return Math.floor(min + Math.random() * (max - min));
        }//random end
        ,
        isIE6: function () {
            /*
             * @位置：  核心公用方法；
             * @名字：  isIE6；
             * @翻译：  是否是ie6（ ）；
             * @参数：  isIE6()；
             * @功能：  检测是否是ie6；
             * @返回：  true或false（boolean）；
             * @实例：  /test-html/3.2/core/isIE6.html；
             * @需要：  无；
             * @备注：  暂无；
             */
            var ie6 = 'undefined' == typeof(document.body.style.maxHeight);
            if (ie6) {
                return true;
            } else {
                return false;
            }
        }//isIE6 end
        ,
        addScript: function (cus_attrs, $domPos) {
            /*
             * @位置：  核心公用方法；
             * @名字：  addScript；
             * @翻译：  加script标签（ 自定义属性对象，要插入的dom位置 ）；
             * @参数：  addScript( cus_attrs, $domPos )
             *         cus_attrs(对象)：【必填】标签包含的属性对象，例如{src:'',gameId:''}
             *         $domPos（$）: 【可选】用jquery选中的父节点，默认head里；
             * @功能：  向指定父元素插入带定义属性的script标签；
             * @返回：  无；
             * @实例：  /test-html/3.2/core/addScript.html；
             * @需要：  无；
             * @备注：  暂无 todo；
             */
            var tmpScript = document.createElement('script'),
                $doucumentHead = $domPos || $("head"),
                timesTmp = '?v=' + new Date().getTime();

            for (var i in cus_attrs) {
                tmpScript[i] = cus_attrs[i];
            }
            tmpScript.src = cus_attrs.src + timesTmp;
            /*附带时间参数，防止缓存*/
            $doucumentHead.after(tmpScript);
            return false;
        }//addScript end
        ,
        getItems: function ($itemWrap) {
            /*
             * @位置：  核心公用方法；
             * @名字：  getItems；
             * @翻译：  获取要滚动的元素（ 滚动元素父层 ）；
             * @参数：  getItems( $itemWrap )
             *         $itemWrap($)：【必填】jquery选中要获取的滚动元素的父层；
             * @功能：  分析传入层的子元素的层级关系，按优先顺序返回同级元素，优先顺序是：div>li>a>img；
             * @返回：  无；
             * @实例：  /test-html/3.2/core/getItems.html；
             * @需要：  无；
             * @备注：  暂无 todo；
             */
            var $items;
            if ($itemWrap.find('div').length > 0) {
                if ($itemWrap.find('div').length == 1) {
                    $items = $itemWrap.find('div');
                } else {
                    $items = $itemWrap.find('div').siblings();
                }
            } else if ($itemWrap.find('li').length > 0) {
                if ($itemWrap.find('li').length == 1) {
                    $items = $itemWrap.find('li');
                } else {
                    $items = $itemWrap.find('li').siblings();
                }
            } else if ($itemWrap.find('a').length > 0) {
                if ($itemWrap.find('a').length == 1) {
                    $items = $itemWrap.find('a');
                } else {
                    $items = $itemWrap.find('a').siblings();
                }
            } else if ($itemWrap.find('img').length > 0) {
                if ($itemWrap.find('img').length == 1) {
                    $items = $itemWrap.find('img');
                } else {
                    $items = $itemWrap.find('img').siblings();
                }
            } else {
                return null;
            }

            return $items;
        }//getItems end
        ,
        parseArgus: function (arguments, attr) {
            /*
             * @位置：  核心公用方法；
             * @名字：  parseArgus；
             * @翻译：  解析参数（ 函数参数数组，属性对象 ）；
             * @参数：  parseArgus( arguments,attr )
             *         arguments(数组)：【必填】参数数组
             *         attr(对象)：【必填】属性对象；
             * @功能：  解析参数赋值给对应对象属性；
             * @返回：  无；
             * @实例：  /test-html/3.2/core/parseArgus.html；
             * @需要：  无；
             * @备注：  暂无 todo；
             */
            var j = 0;
            for (var i in attr) {
                attr[i] = objectType(arguments[0]) == 'object' ? arguments[0][i] ? arguments[0][i] : attr[i] : arguments[j] ? arguments[j] : attr[i];
                j++;
            }
            function objectType(obj) {
                if (obj instanceof jQuery) {
                    return '$';
                } else if (typeof obj == 'object') {
                    return 'object';
                }
                return false;
            }

        }//parseArgus end
    };
    module.exports = core;
});