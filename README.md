# profectus-schedules
A repo to track and maintain the profectus schedules

## Usage:
When adding new schedules, make sure to include:
1. `<!-- BODY-dddd -->` where `dddd` is the pixel width for the body. This is only used when photos of the schedules are generated.
2. Drop the CSS_STYLES pattern into the new schedule as seen below:
```
... 
<style>
    <%- CSS_STYLES %>
</style>
....
```
This is used to inject the global css styles into the schedules.

### Always run `npm run build` which ensures tests are run.

Use the script within the profectus website like so:
```
<script data-schedule-location="brentwood" crossorigin="https://cdn.jsdelivr.net" type="application/javascript" src="https://cdn.jsdelivr.net/gh/adamtaylor13/profectus-schedules/schedules.js"></script>
```
Obviously, replacing "brentwood" with the actual location you're injecting.
All of the `crossorigin`, and `type` attributes are necessary due to strict MIME-checking.


Notes and acknowledgements:
- Using [JSDelivr](https://www.jsdelivr.com/features) for live-script loading