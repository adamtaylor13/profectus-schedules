/**
 * This script is meant to be loaded in Squarespace and run in order to fetch the latest SHA hash
 * for the profectus-schedules repo. This let's us utilize the hash to fetch the most recent schedules.
 */

var currentScript = document.currentScript;
var scheduleLocation = currentScript.attributes['data-schedule-location'].nodeValue;
var GITHUB_MOST_RECENT_HASH = 'https://api.github.com/repos/adamtaylor13/profectus-schedules/commits?per_page=1';
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = onMostRecentCommit;
xhr.overrideMimeType('application/javascript');
xhr.open('GET', GITHUB_MOST_RECENT_HASH);
xhr.send();

function onMostRecentCommit(xhrResponse) {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        var SHA_HASH = JSON.parse(xhrResponse.target.responseText)[0].sha;

        var script = document.createElement('script');
        script.setAttribute('crossorigin', 'https://cdn.jsdelivr.net');
        script.setAttribute('type', 'application/javascript');
        script.setAttribute('src', `https://cdn.jsdelivr.net/gh/adamtaylor13/profectus-schedules@${SHA_HASH}/schedules.js`);
        script.setAttribute('data-schedule-location', scheduleLocation);

        currentScript.insertAdjacentElement('afterend', script);
    }
}
