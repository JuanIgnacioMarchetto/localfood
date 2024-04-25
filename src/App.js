import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://api.foursquare.com/v2/venues/explore?near=${city}&section=food&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&v=20220101`
      );
      const data = await response.json();
      const venues = data.response.groups[0].items.map((item) => item.venue);
      setRestaurants(venues);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <h1>Platillos Locales</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ingresa el nombre de la ciudad"
          value={city}
          onChange={handleChange}
        />
        <button type="submit">Buscar</button>
      </form>
      <div className="results">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant">
            <h2>{restaurant.name}</h2>
            <p>Platillos populares:</p>
            <ul>
              {restaurant.menu && restaurant.menu.items.map((item, index) => (
                <li key={index}>{item.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
