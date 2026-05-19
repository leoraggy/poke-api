import React from "react";
import "./PokemonCard.css";

export default function PokemonCard({ pokemonData }) {
  if (!pokemonData) {
    return <div className="loading">No Pokémon data provided.</div>;
  }

  const { name, id, sprites, types, stats, height, weight } = pokemonData;
  const primaryType = types[0]?.type?.name || "normal";

  return (
    <div className={`poke-card ${primaryType}`}>
      {/* Header: Name, ID, and Types */}
      <div className="poke-header">
        <div>
          <h2 className="poke-name">{name}</h2>
          <div className="poke-types">
            {types.map((t) => (
              <span key={t.type.name} className={`type-badge ${t.type.name}`}>
                {t.type.name}
              </span>
            ))}
          </div>
        </div>
        <span className="poke-id">#{String(id).padStart(3, "0")}</span>
      </div>

      <div className="poke-img-container">
        <img
          src={
            sprites.other["official-artwork"].front_default ||
            sprites.front_default
          }
          alt={name}
          className="poke-image"
        />
      </div>

      <div className="poke-body">
        <div className="poke-dimensions">
          <div className="dim-group">
            <span className="dim-value">{weight / 10} kg</span>
            <span className="dim-label">Weight</span>
          </div>
          <div className="dim-group">
            <span className="dim-value">{height / 10} m</span>
            <span className="dim-label">Height</span>
          </div>
        </div>

        <div className="poke-stats">
          <h3>Base Stats</h3>
          {stats.map((s) => (
            <div key={s.stat.name} className="stat-row">
              <span className="stat-name">{s.stat.name.replace("-", " ")}</span>
              <span className="stat-value">{s.base_stat}</span>
              <div className="stat-bar-bg">
                <div
                  className="stat-bar-fill"
                  style={{
                    width: `${Math.min((s.base_stat / 150) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
