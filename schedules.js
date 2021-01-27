var STYLE_URL = 'https://raw.githubusercontent.com/adamtaylor13/profectus-schedules/main/global_styles.css';
var SCHEDULE_URL = 'https://raw.githubusercontent.com/adamtaylor13/profectus-schedules/main/src/brentwood_schedule.html';
var IMAGE_URL = 'https://raw.githubusercontent.com/adamtaylor13/profectus-schedules/main/dist/img/brentwood_schedule.png';
var currentScript = document.currentScript;
var xhr = new XMLHttpRequest();

var screenTooSmall = window.outerWidth <= 1000;
if (screenTooSmall) {
    loadScheduleImage();
} else {
    xhr.onreadystatechange = onScheduleCall;
    xhr.overrideMimeType('application/javascript');
    xhr.open('GET', SCHEDULE_URL);
    xhr.send();
}

function loadScheduleImage() {
    var targetScheduleContainer = document.createElement('img');
    targetScheduleContainer.src = IMAGE_URL;
    targetScheduleContainer.style = 'width:100vw';
    currentScript.insertAdjacentElement('afterend', targetScheduleContainer);
}

function onScheduleCall(xhrResponse) {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        var targetScheduleContainer = document.createElement('div');
        targetScheduleContainer.innerHTML = xhrResponse.target.responseText;
        currentScript.insertAdjacentElement('afterend', targetScheduleContainer);

        // Load in styles
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = onStyleCall;
        xhr.overrideMimeType('text/css');
        xhr.open('GET', STYLE_URL);
        xhr.send();
    }
}

function onStyleCall(xhrResponse) {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        var style = document.createElement('style');
        style.innerHTML = xhrResponse.target.responseText;
        var headContent = document.getElementsByTagName('head')[0];
        headContent.appendChild(style);
    }
}
