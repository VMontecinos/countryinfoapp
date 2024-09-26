import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CountryInfo = () => {
  const { code } = useParams();
  const [countryDetails, setCountryDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/countryinfo/country/${code}`
        );
        setCountryDetails(response.data);
      } catch (error) {
        console.error("Error fetching country info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryInfo();
  }, [code]);

  if (loading) {
    return <div className="flex justify-center w-[98vw]">Loading...</div>;
  }

  if (!countryDetails) {
    return (
      <div className="flex justify-center w-[98vw]">
        Country information not available
        <Link
          to={"/"}
          className="p-5 rounded-full bg-[#1a1a1a] hover:bg-blue-800 transition duration-200 fixed left-0 bottom-0 mb-5 ml-5"
        >
          🏠
        </Link>
      </div>
    );
  }

  const { name, flagImageUrl, borders, populationHistory } = countryDetails;

  // Ensure populationHistory is defined and is an array
  const populationData = Array.isArray(populationHistory)
    ? populationHistory
    : [];

  // Prepare data for the population chart
  const chartData = {
    labels: populationData.map((item) => item.year),
    datasets: [
      {
        label: "Population",
        data: populationData.map((item) => item.value),
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
    ],
  };

  const chartOptions = {
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
          text: "Population",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="country-info flex flex-col items-center justify-center min-h-screen w-[98vw]">
      <h1 className="my-5">{name}</h1>
      <img
        src={flagImageUrl}
        alt={`${name} flag`}
        width="150"
        className="rounded-md shadow shadow-hover transition-all duration-200"
      />

      <h2 className="mt-5">Border Countries:</h2>
      <ul className="flex gap-4">
        {borders.map((borderCountry) => (
          <li key={borderCountry.countryCode}>
            <Link to={`/country/${borderCountry.countryCode}`}>
              {borderCountry.commonName}
            </Link>
          </li>
        ))}
      </ul>

      <h2>Population History</h2>
      <Line data={chartData} options={chartOptions} />

      <Link
        to={"/"}
        className="p-5 rounded-full bg-[#1a1a1a] hover:bg-blue-800 transition duration-200 fixed left-0 bottom-0 mb-5 ml-5"
      >
        🏠
      </Link>
    </div>
  );
};

export default CountryInfo;
