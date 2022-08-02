import React from "react";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <>
      <header>
        <Link to="/">Home</Link>
        <Link to="/Pizza">Order Your Pizza</Link>
      </header>
      <h1>Lambda Eats</h1>
      <p>You can remove this code and create your own header</p>
      <main></main>

      <footer>
        <p>&copy; Copyright 2022 Lambda Eats</p>
      </footer>
    </>
  );
};
export default App;
