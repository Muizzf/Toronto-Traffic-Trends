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

                backgroundColor: "#e08207",
                borderColor: "#e08207",
                borderWidth: 1,

                fill: false,
                tension: 0.3
            }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
    });
}

//kpi's
fetch(`${BASE_URL}/total-accidents`)
  .then(res => res.json())
  .then(data => {
      document.getElementById("accidentsCard").innerText =
        `${data}`;
  });

fetch(`${BASE_URL}/total-fatalities`)
  .then(res => res.json())
  .then(data => {
      document.getElementById("fatalitiesCard").innerText =
        `${data}`;
  });

fetch(`${BASE_URL}/peak-hour`)
  .then(res => res.json())
  .then(data => {
      document.getElementById("peakHourCard").innerText =
        `${data}:00`;
  });

fetch(`${BASE_URL}/injury-rate`)
  .then(res => res.json())
  .then(data => {
      document.getElementById("injuryRateCard").innerText =
        `${(data * 100).toFixed(2)}%`;
  });

fetch(`${BASE_URL}/daily-accidents`)
  .then(res => res.json())
  .then(data => {
      document.getElementById("dailyAccidentsCard").innerText =
        `${data.toFixed(2)}`;
  });

fetch(`${BASE_URL}/most-dangerous-day`)
  .then(res => res.json())
  .then(data => {
      document.getElementById("mostDangerousDayCard").innerText =
        `${data}`;
  });



//charts


// fetch(`${BASE_URL}/accidents-monthly`)
//   .then(res => res.json())
//   .then(data => {

//       const labels = data.map(d => `${d.Month} ${d.Year}`);
//       const values = data.map(d => d.count);

//       new Chart(document.getElementById("accidentsChart"), {
//           type: "line",
//           data: {
//               labels: labels,
//               datasets: [{
//                   label: "Accidents Over Time",
//                   data: values,
//                   borderColor: "rgba(54, 162, 235, 1)",
//                   fill: false,
//                   tension: 0.3
//               }]
//           }
//       });

//   });


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

fetch(`${BASE_URL}/year`)
  .then(res => res.json())
  .then(data => {
      createChart("yearChart", "Accidents by Year", data , "line");
  });

fetch(`${BASE_URL}/fatalities`)
  .then(res => res.json())
  .then(data => {
      createChart("fatalChart", "Fatalities by Year", data, "line");
  });