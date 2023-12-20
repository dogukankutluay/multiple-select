import React, { useEffect, useState } from "react";

// Style
import "./styles/app.css";

// Select
import Select from "./@select";
function App() {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h1>Rick and Morty Sevdalısı Formu</h1>
      <p>
        Merhaba Rick and Morty hayranı! Siz de bu eğlenceli ve absürd bilim
        kurgu dünyasına derin bir sevgi besliyorsanız, Rick and Morty evrenine
        olan tutkunuzu bizimle paylaşabilirsiniz.
      </p>
      <div className="form-item">
        <label htmlFor="name">İsim</label>
        <input id="name" type="text" placeholder="İsim" />
      </div>
      <div className="form-item">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" placeholder="Email" />
      </div>
      <div className="form-item">
        <label htmlFor="select-input">Sevdiğim Karakterler</label>
        <Select />
      </div>

      <button>Gönder</button>
    </form>
  );
}

export default App;
