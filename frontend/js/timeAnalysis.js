// time analysis kpis
getData("peak-hour")
    .then(data => {
        document.getElementById("peakHourCard").innerText =
            `${data}:00`;
    });

getData("most-dangerous-day")
    .then(data => {
        document.getElementById("mostDangerousDayCard").innerText =
            `${data}`;
    });

getData("most-dangerous-month")
    .then(data => {
        document.getElementById("mostDangerousMonthCard").innerText =
            `${data}`;
    });

getData("rush-hour-share")
    .then(data => {
        document.getElementById("rushHourShareCard").innerText =
            `${data.rush_hour_share}%`;
    });


// time analysis charts
getData("hourly")     // calls flask
    .then(data => { //json -> js object
        createChart("hourChart", "Accidents by Hour", data, "line");
    });

getData("daily")
    .then(data => {
        createChart("dayChart", "Accidents by Day", data, "line");
    });

getData("monthly")
    .then(data => {
        createChart("monthChart", "Accidents by Month", data, "line");
    });

