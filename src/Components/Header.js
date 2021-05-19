import React from "react";
import Meme from "./meme.png";
import "../styles.css";

function Header() {
  return (
    <header>
      <img className="logo" src={Meme} alt="Meme Logo" />
      <h1 className="title">Meme Generator</h1>
    </header>
  );
}

export default Header;
