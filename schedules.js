/**
 * This script is meant to be loaded in Squarespace and run in order to load
 * the built schedules in the dist/ folder for the appropriate location.
 */

var currentScript = document.currentScript;
var scheduleLocation =
    currentScript.attributes["data-schedule-location"].nodeValue;
var branch = currentScript.attributes["data-branch"].nodeValue;
var SCHEDULE_URL = `https://raw.githubusercontent.com/adamtaylor13/profectus-schedules/${branch}/dist/schedule/${scheduleLocation}_schedule.html`;
var IMAGE_URL = `https://raw.githubusercontent.com/adamtaylor13/profectus-schedules/${branch}/dist/img/${scheduleLocation}_schedule.png`;
var xhr = new XMLHttpRequest();

var screenTooSmall = window.outerWidth <= 1000;
if (screenTooSmall) {
    loadScheduleImage();
} else {
    xhr.onreadystatechange = onScheduleCall;
    xhr.overrideMimeType("application/javascript");
    xhr.open("GET", SCHEDULE_URL);
    xhr.send();
}

function loadScheduleImage() {
    var img = document.createElement("img");
    img.src = IMAGE_URL;
    img.style = "width:100vw";
    // On tap, navigate to this picture
    img.addEventListener(
        "click",
        function () {
            window.location.href = IMAGE_URL;
        },
        false
    );
    currentScript.insertAdjacentElement("afterend", img);
    sendTestEvent();
}

function onScheduleCall(xhrResponse) {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        var targetScheduleContainer = document.createElement("div");
        targetScheduleContainer.innerHTML = xhrResponse.target.responseText;
        currentScript.insertAdjacentElement(
            "afterend",
            targetScheduleContainer
        );
        sendTestEvent();
    }
}
/**
 * Used to send an event so our test knows this rendered correctly
 */
function sendTestEvent() {
    var event = new CustomEvent("proceed-with-test-conditions");
    document.dispatchEvent(event);
}
