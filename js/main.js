
var csInterface = new CSInterface();
var appId = csInterface.getApplicationID();
var extId = csInterface.getExtensionID();
var selectEventId = 0;

function syncTheme() {
    var skinInfo = csInterface.getHostEnvironment().appSkinInfo;
    var bgColor = skinInfo.panelBackgroundColor.color;
    var body = document.getElementById('body');
    body.style.backgroundColor = `rgb(${bgColor.red}, ${bgColor.green}, ${bgColor.blue})`;
}

function syncTheme2() {
    var theme = getTheme();
    var link = document.getElementById('theme-link');
    link.href=`./css/topcoat/topcoat-desktop-${theme}.min.css`;
}

function getTheme() {
    var hostEnv = csInterface.getHostEnvironment();
    var bgColor = hostEnv.appSkinInfo.appBarBackgroundColor;
    var red = Math.round(bgColor.color.red);
    var green = Math.round(bgColor.color.green);
    var blue = Math.round(bgColor.color.blue);
    var theme;
    if (red < 60) {
        theme = 'darkest';
    } else if (60 <= red && red < 127) {
        theme = 'dark';
    } else if (127 <= red && red < 200) {
        theme = 'gray';
    } else {
        theme = 'white';
    }
    return theme;
}

function helloThere() {
    console.log('on click 111');
    csInterface.evalScript(`alert("hell there")`);
}

function getActiveLayerName() {
    var params = {a:100, b:200};
    csInterface.evalScript(`getActiveLayerName(${JSON.stringify(params)})`, (result) => {
        console.log(result);
    });
}

function jsxToJs() {
    csInterface.evalScript(`jsxToJs()`);
}

function registerEvent(stringId) {
    csInterface.evalScript(`app.stringIDToTypeID('${stringId}')`, function (data) {
        selectEventId = data;
        var csEvent = new CSEvent();
        csEvent.type = 'com.adobe.PhotoshopRegisterEvent';
        csEvent.scope = 'APPLICATION';
        csEvent.appId = appId;
        csEvent.extensionId = extId;
        csEvent.data = data;
        csInterface.dispatchEvent(csEvent);
    });
}

registerEvent('select');

window.addEventListener('load', () => {
    //syncTheme();
    syncTheme2();

    csInterface.addEventListener('com.adobe.csxs.events.ThemeColorChanged', () => {
        syncTheme2();
    });


    csInterface.addEventListener('my_custom_event_type', (result) => {
        console.log(result);
    });

    csInterface.addEventListener('com.adobe.PhotoshopJSONCallback' + extId, function(result) {
        //console.log(result);
        var data = result.data.replace(/ver1,/, '');
        var obj = JSON.parse(data);
        if (parseInt(obj.eventID) === parseInt(selectEventId)) {
            csInterface.evalScript('activeDocument.activeLayer.name', (name) => {
                document.getElementById('selected-layer').innerHTML = name;
            });
        }
    });

    /*
    var helloThereBtn = document.getElementById('hello-there');
    helloThereBtn.addEventListener('click', () => {
        console.log('on click');
        csInterface.evalScript(`alert("hell there")`);
    });
    */
});