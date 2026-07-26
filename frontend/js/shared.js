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
