
var csInterface = new CSInterface();

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


window.addEventListener('load', () => {
    //syncTheme();
    syncTheme2();

    csInterface.addEventListener('com.adobe.csxs.events.ThemeColorChanged', () => {
        syncTheme2();
    });
});