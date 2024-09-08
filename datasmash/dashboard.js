// Emission Chart using Chart.js
const ctx = document.getElementById("emissionGraph").getContext("2d");
const emissionGraph = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "CO2 Emissions (tons)",
        data: [120, 150, 170, 200, 220, 180, 190, 210, 230],
        backgroundColor: "rgba(46, 204, 113, 0.2)",
        borderColor: "rgba(46, 204, 113, 1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "CO2 Emissions (tons)",
        },
      },
    },
  },
});

// Ensure Chart.js is included in your project
const ctxDaily = document
  .getElementById("dailyEmissionsChart")
  .getContext("2d");
const ctxMonthly = document
  .getElementById("monthlyEmissionsChart")
  .getContext("2d");
const ctxYearly = document
  .getElementById("yearlyEmissionsChart")
  .getContext("2d");

// Daily Carbon Emissions Chart
const dailyEmissionsChart = new Chart(ctxDaily, {
  type: "line",
  data: {
    labels: [
      "1st",
      "2nd",
      "3rd",
      "4th",
      "5th",
      "6th",
      "7th",
      "8th",
      "9th",
      "10th",
      "11th",
      "12th",
    ],
    datasets: [
      {
        label: "Daily CO2 Emissions (tons)",
        data: [12, 14, 13, 15, 16, 17, 14, 15, 18, 19, 17, 16],
        backgroundColor: "rgba(41, 128, 185, 0.2)",
        borderColor: "rgba(41, 128, 185, 1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Day",
        },
      },
      y: {
        title: {
          display: true,
          text: "CO2 Emissions (tons)",
        },
      },
    },
  },
});

// Monthly Carbon Emissions Chart
const monthlyEmissionsChart = new Chart(ctxMonthly, {
  type: "bar",
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly CO2 Emissions (tons)",
        data: [120, 150, 170, 200, 220, 180, 190, 210, 230, 240, 260, 280],
        backgroundColor: "rgba(46, 204, 113, 0.6)",
        borderColor: "rgba(46, 204, 113, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "CO2 Emissions (tons)",
        },
      },
    },
  },
});

// Yearly Carbon Emissions Chart
const yearlyEmissionsChart = new Chart(ctxYearly, {
  type: "line",
  data: {
    labels: ["2020", "2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: "Yearly CO2 Emissions (tons)",
        data: [1500, 1600, 1700, 1800, 1900],
        backgroundColor: "rgba(52, 152, 219, 0.2)",
        borderColor: "rgba(52, 152, 219, 1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "CO2 Emissions (tons)",
        },
      },
    },
  },
});
