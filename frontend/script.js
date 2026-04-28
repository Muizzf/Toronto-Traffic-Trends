const BASE_URL = "http://127.0.0.1:5000/api";

// if flask sent { "0": 15, "1": 8, "2": 3 }
// then Object.keys → ["0","1","2"]
// Object.values → [15,8,3]
function createChart(canvasId, label, dataObj, type="bar") {
    const ctx = document.getElementById(canvasId);

    new Chart(ctx, {
        type: type,
        data: {
            labels: Object.keys(dataObj),
            datasets: [{
                label: label,
                data: Object.values(dataObj),

                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 2,

                fill: false,
                tension: 0.3
            }]
        }
    });
}

//kpi's
fetch(`${BASE_URL}/total-accidents`)
  .then(res => res.json())
  .then(data => {
      document.getElementById("accidentsCard").innerText =
        `Total Accidents: ${data}`;
  });

fetch(`${BASE_URL}/total-fatalities`)
  .then(res => res.json())
  .then(data => {
      document.getElementById("fatalitiesCard").innerText =
        `Total Fatalities: ${data}`;
  });

fetch(`${BASE_URL}/peak-hour`)
  .then(res => res.json())
  .then(data => {
      document.getElementById("peakHourCard").innerText =
        `Peak Hour: ${data}:00`;
  });

fetch(`${BASE_URL}/injury-rate`)
  .then(res => res.json())
  .then(data => {
      document.getElementById("injuryRateCard").innerText =
        `Injury Rate: ${(data * 100).toFixed(2)}%`;
  });

fetch(`${BASE_URL}/daily-accidents`)
  .then(res => res.json())
  .then(data => {
      document.getElementById("dailyAccidentsCard").innerText =
        `Average Daily Accidents: ${data.toFixed(2)}`;
  });




//charts
fetch(`${BASE_URL}/hour`)     // calls flask
  .then(res => res.json())    //json -> js object
  .then(data => {
      createChart("hourChart", "Accidents by Hour", data);
  });

fetch(`${BASE_URL}/day`)
  .then(res => res.json())
  .then(data => {
      createChart("dayChart", "Accidents by Day", data);
  });

fetch(`${BASE_URL}/fatalities`)
  .then(res => res.json())
  .then(data => {
      createChart("fatalChart", "Fatalities by Year", data, "line");
  });