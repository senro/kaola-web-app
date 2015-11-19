/**
 * Created with PhpStorm.
 * User: Administrator
 * Date: 2015/9/10
 * Time: 19:39
 * To change this template use File | Settings | File Templates.
 */
define(function (require, exports, module) {
    module.exports=[
        "navigator.contacts.pickContact(function(contact){",
            "$('#iframe')[0].contentWindow.postMessage('pickContact|:|'+JSON.stringify(contact),'*');",
        "},function(err){",
            "console.log('Error: ' + err);",
        "});"
    ].join("\n");

});