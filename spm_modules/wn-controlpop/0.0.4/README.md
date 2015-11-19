# wn-controlpop
控制弹窗
## 翻译：
控制弹窗（ 类型，弹框主体，关闭按钮，遮罩层, 缓动时间，点击遮罩是否关闭 ）
## 参数：
controlPop(type,pop,close,mask,speed，maskClose)【支持对象传参，以下是属性】</br>
{ </br>
type（字符串）：【必填】‘show’，显示，‘hide’，隐藏 </br>
pop（$）：【必填】jquery选中的弹框主体 </br>
close（$）：【可选】jquery选中的关闭按钮 </br>
mask（$）：【可选】jquery选中的自定义遮罩层，默认是黑色，透明度0.6 </br>
speed（数字）：【可选】显示缓动时间,默认为0，也可传”fast“，”slow“ </br>
maskClose（布尔）：【可选】默认false点击遮罩不关闭弹窗，true，点击遮罩关闭弹窗 </br>
}
## 返回： 
无
## 功能： 
显示或隐藏弹窗，自带遮罩，根据窗口大小自动居中 
## 用法
var controlPop=require('wn-controlpop@0.0.1'); </br>
var $=require('jquery@1.9.1'); </br>

//controlPop('show',$('.pop'),$('.close'),null,'fast'); </br>
controlPop({ </br>
    type:'show', </br>
    pop: $('.pop'), </br>
    close: $('.close'), </br>
    speed: 'fast' </br>
    //mask:$('.mask') </br>
});