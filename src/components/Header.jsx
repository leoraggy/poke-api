import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="brand">
          <div className="pokeball-icon">
            <div className="pokeball-button"></div>
          </div>
          <h1 className="app-title">
            Poké<span className="title-bold">Dex</span>
          </h1>
        </div>
      </div>
    </header>
  );
}
