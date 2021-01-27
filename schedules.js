var STYLE_URL = 'https://raw.githubusercontent.com/adamtaylor13/profectus-schedules/main/global_styles.css';
var SCHEDULE_URL = 'https://raw.githubusercontent.com/adamtaylor13/profectus-schedules/main/src/columbia_schedule.html';
var currentScript = document.currentScript;
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = onScheduleCall;
xhr.open('GET', SCHEDULE_URL);
xhr.send();

function onScheduleCall(xhrResponse) {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        var targetScheduleContainer = document.createElement('div');
        targetScheduleContainer.innerHTML = xhrResponse.target.responseText;
        currentScript.insertAdjacentElement('afterend', targetScheduleContainer);

        // Load in styles
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = onStyleCall;
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
