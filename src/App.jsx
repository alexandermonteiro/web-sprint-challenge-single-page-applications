import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import PizzaForm from "./component/PizzaForm";
import "./App.css";
import pizzaImg from "./Assets/Pizza.jpg";

const App = () => {
  return (
    <>
      <header>
        <Link to="/">Home</Link>
        <Link to="/pizza">Order Your Pizza</Link>
      </header>
      <h1>Lambda Eats</h1>
      <p>You can remove this code and create your own header</p>
      <main>
        <Switch>
          <Route exact path="/">
            <h2>Welcome</h2>
            <Link to="/pizza" id="order-pizza">
              Order Pizza
            </Link>
            <img className="pizzaPhoto" src={pizzaImg} alt="pizza" />
          </Route>
          <Route exact path="/pizza">
            <h2>Here comes the form</h2>
            <PizzaForm />
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
