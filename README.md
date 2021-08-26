# profectus-schedules
A repo to track and maintain the Profectus class schedules for each location

## Adding New Schedules
To add a new schedule, simply add a new configuration file in the src/schedule directory. The build process will take
care of the rest of it!

## Modifying existing location schedule
Try to keep commits very small / atomic, so they're easily modified in the future. Also helps keep the history clean.

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
