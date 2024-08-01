const chartData = {
  height: 230,
  type: "line",
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
      curve: "smooth",
    },
    legend: {
      position: "top",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2024-02-13T23:00:00",
        "2024-03-13T21:00:00",
        "2024-04-13T20:00:00",
        "2024-05-13T23:30:00",
        "2024-06-13T23:00:00",
        "2024-06-13T19:00:00",
      ],
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          color: "#ccc",
        },
      },
    },
    yaxis: {
      show: true,
      min: 20,
      max: 100,
      labels: {
        style: {
          color: "#ccc",
        },
      },
    },
    colors: ["#73b4ff", "#59e0c5"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        gradientToColors: ["#4099ff", "#2ed8b6"],
        shadeIntensity: 0.5,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    markers: {
      size: 5,
      colors: ["#4099ff", "#2ed8b6"],
      opacity: 0.9,
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    grid: {
      borderColor: "#cccccc3b",
    },
  },
  series: [
    {
      name: "Arts",
      data: [
        ["2024-02-13T23:00:00", 60],
        ["2024-03-13T21:00:00", 30],
        ["2024-04-13T20:00:00", 65],
        ["2024-05-13T23:30:00", 45],
        ["2024-06-13T23:00:00", 67],
        ["2024-06-13T19:00:00", 35],
      ],
    },
    {
      name: "Commerce",
      data: [
        ["2024-01-13T23:00:00", 30],
        ["2024-01-13T21:00:00", 60],
        ["2024-02-13T20:00:00", 35],
        ["2024-02-13T23:30:00", 55],
        ["2024-07-13T23:00:00", 33],
        ["2024-08-13T19:00:00", 65],
      ],
    },
  ],
};
export default chartData;
