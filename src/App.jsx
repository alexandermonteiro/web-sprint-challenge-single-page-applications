import React from "react";
import { Link, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <>
      <header>
        <Link to="/">Home</Link>
        <Link to="/Pizza">Order Your Pizza</Link>
      </header>
      <h1>Lambda Eats</h1>
      <p>You can remove this code and create your own header</p>
      <main>
        <Switch>
          <Route exact path="/">
            <h2>Welcome</h2>
          </Route>
          <Route exact path="/pizza">
            <h2>Here comes the form</h2>
          </Route>
        </Switch>
      </main>

      <footer>
        <p>&copy; Copyright 2022 Lambda Eats</p>
      </footer>
    </>
  );
};
export default App;
