const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = 3001;

app.use(
  cors({
    origin: "*",
    methods: "GET,POST",
    allowedHeaders: "Content-Type",
  })
);

const myProcess = process.env;

// Gets all countries info
app.get("/countryinfo/countries", async (req, res) => {
  const URL = myProcess.COUNTRIES_API;

  try {
    const { data } = await axios.get(URL);

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No countries found." });
    }

    console.log(data);

    res.status(200).json(data);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch countries. Please try again." });
  }
});

// Gets the individual country info
app.get("/countryinfo/country/:code", async (req, res) => {
  const countryCode = req.params.code.toUpperCase();

  const countryBorderURL = `https://date.nager.at/api/v3/CountryInfo/${countryCode}`;
  const countryDataURL = myProcess.COUNTRY_POPULATION;
  const countryFlagURL = myProcess.COUNTRY_FLAG;

  try {
    const countryBorderResponse = await axios.get(countryBorderURL);
    const borderCountries = countryBorderResponse.data.borders || []; // Get the borders of that country, or in case they don't have, send an empty array.

    console.log(countryBorderResponse.data.commonName);

    const countryDataResponse = await axios.post(countryDataURL, {
      country: countryBorderResponse.data.commonName,
    });
    const populationData = countryDataResponse.data.data.populationCounts;

    const countryFlagResponse = await axios.post(countryFlagURL, {
      country: countryBorderResponse.data.commonName,
    });
    const flagImage = countryFlagResponse.data.data.flag;

    const countryDetails = {
      name: countryBorderResponse.data.commonName,
      borders: borderCountries,
      populationHistory: populationData,
      flagImageUrl: flagImage,
    };

    res.status(200).json(countryDetails);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch country details. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
