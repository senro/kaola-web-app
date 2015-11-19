/**
 * Created with PhpStorm.
 * User: 002643
 * Date: 2015/6/17
 * Time: 16:43
 * To change this template use File | Settings | File Templates.
 */
define(function (require,exports,module) {
    var $=require('jquery');
    var preTitle = '好屋中国 - 物业管理后台 - ';

    function register(obj){
        if(obj.hasOwnProperty('title')){
            //$('title').html('sdfsdf');
            $(document).attr('title',preTitle+obj.title);//必须这样去改变title，不然用上面的方式，ie8会报错
        }
        if(obj.hasOwnProperty('keywords')){
            $('meta[name="keywords"]').attr('content',obj.keywords);
        }
        if(obj.hasOwnProperty('description')){
            $('meta[name="description"]').attr('content',obj.description);
        }
    }
    exports.register=register;
});