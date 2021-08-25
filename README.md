# profectus-schedules
A repo to track and maintain the profectus schedules

## Adding New Schedules
When adding new schedules, make sure to include:
1. `bodyWidth` property: This indicates the pixel-width of the body which is used when generating photos.
2. ~Drop the CSS_STYLES pattern into the new schedule as seen below:~
```
...
<style>
    <%- CSS_STYLES %>
</style>
....
```
~This is used to inject the global css styles into the schedules.~
This isn't required anymore since we're dynamically building the HTML now.

## Modifying existing location schedule
Try to keep commits very small / atomic, so they're easily modified in the future. Also helps keep the history clean.

Make changes to the `src` version of the schedule files, and then don't forget to `npm run build`!

## Before pushing commits
Always run `npm run build` which ensures tests are run!


## Usage on Squarespace
Use the script within the Profectus website like so:
```
<script data-schedule-location="<location>" crossorigin="https://cdn.jsdelivr.net" type="application/javascript" src="https://cdn.jsdelivr.net/gh/adamtaylor13/profectus-schedules/schedules.js"></script>
```

Replace `<location>` with the actual location you're injecting. Can be one of:
* brentwood
* columbia
* lebanon
* fairview

All of the `crossorigin`, and `type` attributes are necessary due to strict MIME-checking.

### Notes:
* Using [JSDelivr](https://www.jsdelivr.com/features) for live-script loading
* Using Prettier to format the built HTML files
