import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import "./PokemonDashboard.css";

export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch first 151 Pokémon initially
  useEffect(() => {
    if (searchQuery.trim() === "") {
      fetchInitialPokemon();
    }
  }, [searchQuery]);

  const fetchInitialPokemon = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151",
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon list");
      }

      const listData = await response.json();

      const detailPromises = listData.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);

        if (!res.ok) {
          throw new Error(`Failed to fetch ${pokemon.name}`);
        }

        return res.json();
      });

      const detailedResults = await Promise.all(detailPromises);

      setPokemonList(detailedResults);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Pokémon by search
  const searchPokemon = async (query) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`,
      );

      if (!response.ok) {
        setPokemonList([]);
        return;
      }

      const data = await response.json();

      setPokemonList([data]);
    } catch (err) {
      setError(err.message);
      setPokemonList([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        searchPokemon(searchQuery);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="list-status-container">
        <div className="loading-spinner"></div>
        <p>Catching 'em all... Please wait!</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="list-status-container error">
        <p>Error: {error}</p>

        <button className="clear-btn" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="pokemon-list-container">
      <div className="search-container">
        <input
          type="text"
          className="list-search-bar"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {searchQuery && (
          <p className="search-results-count">
            Found {pokemonList.length} matching Pokémon
          </p>
        )}
      </div>

      {pokemonList.length > 0 ? (
        <div className="pokemon-grid">
          {pokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemonData={pokemon} />
          ))}
        </div>
      ) : (
        !loading && (
          <div className="no-results">
            <p>No Pokémon found matching "{searchQuery}"</p>

            <button className="clear-btn" onClick={() => setSearchQuery("")}>
              Clear Search
            </button>
          </div>
        )
      )}
    </div>
  );
}
