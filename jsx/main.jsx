
try {
    var xLib = new ExternalObject("lib:\PlugPlugExternalObject");
} catch (e) {
    alert(e.toString());
}

// 获取当前选中图层的名称
function getActiveLayerName(params) {
    alert(params);
    var doc = app.activeDocument;
    return doc.activeLayer.name;
}

function jsxToJs() {
    dispatch('message from jsx');
}

// 事件派发函数
function dispatch(message) {
    var eventObj = new CSXSEvent();
    eventObj.type = "my_custom_event_type";
    eventObj.data = '[CSXSEvent] ' + message + '';
    eventObj.dispatch()
}

var console = {
    log: function(message) {
        var eventObj = new CSXSEvent();
        eventObj.type = "console_log_event";
        eventObj.data = '[JSXLog] ' + message + '';
        eventObj.dispatch();
    }
};