const BASE_URL = "http://127.0.0.1:5000/api";

// if flask sent { "0": 15, "1": 8, "2": 3 }
// then Object.keys → ["0","1","2"]
// Object.values → [15,8,3]
function createChart(canvasId, label, dataObj, type = "bar") {
    const ctx = document.getElementById(canvasId);

    const labels = dataObj.labels || Object.keys(dataObj);
    const values = dataObj.values || Object.values(dataObj);

    new Chart(ctx, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: values,

                backgroundColor: "#e08207",
                borderColor: "#e08207",
                borderWidth: 2,

                // makes lines smoother
                tension: 0.4,

                // better visuals for line charts
                pointRadius: 4.5,
                pointHoverRadius: 7,
                pointBackgroundColor: "#fff",
                pointBorderColor: "#e08207",
            }]
        },

        options: {
            interaction: {
                mode: "index",
                intersect: false
            },
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: "#ccc",
                        font: {
                            family: "Inter",
                            size: 15
                        }
                    }
                },

                tooltip: {
                    backgroundColor: "#111",
                    titleColor: "#fff",
                    bodyColor: "#ddd",
                    borderColor: "#e08207",
                    borderWidth: 1
                }
            },

            scales: {
                x: {
                    grid: {
                        display: false,   // removes ugly vertical lines
                    },
                    ticks: {
                        color: "#aaa",
                        font: { size: 12 }
                    }
                },

                y: {
                    grid: {
                        color: "#e0820718" // subtle grid #ffffff0d
                    },
                    ticks: {
                        color: "#aaa",
                        font: { size: 12 }
                    }
                }
            }
        }
    });
}

// helper function to fetch data from the API
async function getData(endpoint) {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    return response.json();
}




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
getData("hour")     // calls flask
    .then(data => { //json -> js object
        createChart("hourChart", "Accidents by Hour", data, "line");
    });

getData("day")
    .then(data => {
        createChart("dayChart", "Accidents by Day", data, "line");
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