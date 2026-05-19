import React from "react";
import "./Footer.css";
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <p className="footer-logo">
            Poké<span className="logo-bold">Dex</span>
          </p>
          <p className="footer-tagline">Gotta catch 'em all data points.</p>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} PokéDex App. Built using the PokeAPI.
          </p>
          <p className="disclaimer">
            This is a fan-made project. Pokémon and Pokémon character names are
            trademarks of Nintendo.
          </p>
        </div>
      </div>
    </footer>
  );
}
