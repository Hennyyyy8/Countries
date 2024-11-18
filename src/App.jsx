import React, { useEffect, useState } from "react";
import Countries from "./Countries";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [continentFilter, setContinentFilter] = useState("");
  const [subregionFilter, setSubregionFilter] = useState("");
  const [sortOption, setSortOption] = useState("");


  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


  useEffect(() => {
    let filtered = [...countries];

    if (continentFilter) {
      filtered = filtered.filter((country) => country.continents.includes(continentFilter));
    } else if (subregionFilter) {
      filtered = filtered.filter((country) => country.subregion === subregionFilter);
    }

    if (sortOption === "alphabetical") {
      filtered.sort((a, b) => a.name.common.localeCompare(b.name.common));
    } else if (sortOption === "population") {
      filtered.sort((a, b) => b.population - a.population);
    } else if (sortOption === "area") {
      filtered.sort((a, b) => b.area - a.area);
    }

    setFilteredCountries(filtered.slice(0, 10));
  }, [continentFilter, subregionFilter, sortOption, countries]);

  return (
    <div>
      <h1>Countries of the World</h1>

      <div>
        <label>
          Continent:
          <select
            value={continentFilter}
            onChange={(e) => {
              setContinentFilter(e.target.value);
              setSubregionFilter(""); 
            }}
          >
            <option value="">All</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
            <option value="Americas">Americas</option>
          </select>
        </label>

        <label>
          Subregion:
          <select
            value={subregionFilter}
            onChange={(e) => {
              setSubregionFilter(e.target.value);
              setContinentFilter(""); 
            }}
          >
            <option value="">All</option>
            <option value="Northern America">Northern America</option>
            <option value="Southern Europe">Southern Europe</option>
            <option value="Eastern Asia">Eastern Asia</option>

          </select>
        </label>

        <label>
          Sort:
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">None</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="population">Top 10 by Population</option>
            <option value="area">Top 10 by Area</option>
          </select>
        </label>
      </div>

      <Countries countries={filteredCountries} />
    </div>
  );
};

export default App;
