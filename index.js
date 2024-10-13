import React, { StrictMode, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import { Line } from "react-chartjs-2";
import { useInView } from "react-intersection-observer";
import io from "socket.io-client";
// import React, { useState, useEffect } from "react";
// import reportWebVitals from "./reportWebVitals";
// import App from "./App";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

const socket = io("https://data.gdscnsut.com");

const RealTimeComponent = () => {
  const [data, setData] = useState(null);
  setData((dat) => {
    data = dat;
    return;
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    socket.on("data", (newData) => {
      setData(newData);
      data1.insert({ time: 0, data: newData });
    });

    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  });

  return (
    <div>
      <h1>Real-time Data:</h1>
      {data ? <p>{data}</p> : <p>Waiting for data...</p>}
    </div>
  );
};

// export default RealTimeComponent;
// Register components required for the chart
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function NavBar() {
  const { ref, inView } = useInView({
    root: null,
    threshold: 0,

    // rootMargin: "-20% 0px",
  });
  // Track the visibility status
  const [isVisible, setIsVisible] = useState(inView);

  // Trigger re-render when `inView` changes
  useEffect(() => {
    setIsVisible(inView);
  }, [inView]);

  {
    console.log(inView);
  }
  return (
    <div ref={ref}>
      <div className={`${inView ? "navBar" : "navBarActive"} `}>
        <button class="navBarButton">
          <img src="#" />
        </button>
        <div class="buttonContainernav">
          <LinkNavBar />
          <LinkNavBar />
          <LinkNavBar />
        </div>
      </div>
    </div>
  );
}
function LinkNavBar() {
  return <a href="#">HOME</a>;
}
function Temp() {
  return <div className="aayush">sfdljaslkfjslafjlsk</div>;
}
const data1 = [
  { time: 1, data: 4 },
  { time: 2, data: 1 },
  { time: 3, data: 7 },
  { time: 4, data: 9 },
  { time: 5, data: 3 },
  { time: 6, data: 6 },
  { time: 7, data: 0 },
  { time: 8, data: 10 },
];

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Monthly Sales Data",
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
        text: "Sales (in USD)",
      },
      beginAtZero: true,
    },
  },
};

function ChartDisplayArea() {
  const [data, updateData] = useState([]);
  const [tim, updateTime] = useState(0);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    socket.on("data", (newData) => {
      console.log("heelloo", newData);
      updateData = () => [...data, { time: tim, data: newData }];

      updateTime = () => (tim = tim + 1);

      updateData();

      updateTime();
    });

    // Clean up on component unmount
    return () => {
      socket.off("data");
    };
  }, [tim]);
  console.log(data1);
  const data2 = {
    // labels: data.map((row) => row.time),
    // datasets: [
    //   {
    //     label: "Acquisitions by year",
    //     data: data.map((row) => row.data),
    //   },
    // ],
  };

  {
    console.log("fklad", data);
  }

  return (
    <div className="chartDisplay">
      <Line data={data1} options={options} />
    </div>
  );
}
function ChartButton(props) {
  return (
    <div class="buttonContainer">
      <div
        className={`chartButtons chartButton${props.value} chartButton${
          props.isActive ? `Active` : ""
        }`}
      >
        dps
      </div>
    </div>
  );
}
function ChartComponents() {
  return (
    <div className="chartDashboard">
      <ChartDisplayArea />
      {/* <div class="chartButtons chartButtonActive  chartButton1">dps</div>
      <div class="chartButtons chartButton2">dps</div>
      <div class="chartButtons chartButton3">dps</div> */}
      <ChartButton value={1} isActive={true} />
      <ChartButton value={2} isActive={false} />
      <ChartButton value={3} isActive={false} />
    </div>
  );
}

function App() {
  return (
    <div class="containerMain">
      {/* <Temp /> */}
      <NavBar />
      <ChartComponents />
      <p>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </p>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
