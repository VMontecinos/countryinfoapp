// src/components/CountryList.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CountryList = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/countryinfo/countries"
        );
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching country list:", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="country-list flex flex-col">
      <h1 className="font-bold mb-4 flex justify-center w-[98vw]">
        Country List
      </h1>
      <div className="flex">
        <ul className="flex flex-wrap">
          {countries &&
            countries.map((country) => (
              <li key={country.countryCode} className="mx-5 mb-5 text-xl">
                <Link
                  to={`/country/${country.countryCode}`}
                  className="text-blue-600 hover:underline"
                >
                  {country.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CountryList;
