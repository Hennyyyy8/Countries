import React from "react";

const Country = ({ country }) => {
  return (
    <div className="country-card">
      <img src={country.flags.svg} alt={`${country.name.common} flag`} />
      <h3>{country.name.common}</h3>
      <p><strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Area:</strong> {country.area.toLocaleString()} km²</p>
      <p><strong>Continent:</strong> {country.continents.join(", ")}</p>
      <p><strong>Subregion:</strong> {country.subregion || "N/A"}</p>
    </div>
  );
};

export default Country;
