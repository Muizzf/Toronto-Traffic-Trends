//overview kpi's
getData("total-accidents")
    .then(data => {
        document.getElementById("accidentsCard").innerText =
            `${data}`;
    });

getData("total-fatalities")
    .then(data => {
        document.getElementById("fatalitiesCard").innerText =
            `${data}`;
    });

getData("injury-rate")
    .then(data => {
        document.getElementById("injuryRateCard").innerText =
            `${(data * 100).toFixed(2)}%`;
    });

getData("daily-accidents")
    .then(data => {
        document.getElementById("dailyAccidentsCard").innerText =
            `${data.toFixed(2)}`;
    });

//overview charts

getData("year")
    .then(data => {
        createChart("yearChart", "Accidents by Year", data, "line");
    });

getData("fatalities")
    .then(data => {
        createChart("fatalChart", "Fatalities by Year", data, "line");
    });

//charts


// getData("accidents-monthly")
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