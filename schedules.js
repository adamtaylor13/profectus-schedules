var currentScript = document.currentScript;
var scheduleLocation = currentScript.attributes['data-schedule-location'].nodeValue;
var SCHEDULE_URL = `https://raw.githubusercontent.com/adamtaylor13/profectus-schedules/main/dist/schedule/${scheduleLocation}_schedule.html`;
var IMAGE_URL = `https://raw.githubusercontent.com/adamtaylor13/profectus-schedules/main/dist/img/${scheduleLocation}_schedule.png`;
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
    var img = document.createElement('img');
    img.src = IMAGE_URL;
    img.style = 'width:100vw';
    currentScript.insertAdjacentElement('afterend', img);
}

function onScheduleCall(xhrResponse) {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        var targetScheduleContainer = document.createElement('div');
        targetScheduleContainer.innerHTML = xhrResponse.target.responseText;
        currentScript.insertAdjacentElement('afterend', targetScheduleContainer);
    }
}
