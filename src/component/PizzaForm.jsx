import axios from "axios";
import React, { useState, useEffect } from "react";
import * as yup from "yup";

const initialState = {
  person: "",
  size: "",
  sauce: "",
  pepperoni: "",
  sausage: "",
  canadianBacon: "",
  spicyItalianSausage: "",
  grilledChicken: "",
  substitute: "",
  instructions: "",
};

const PizzaForm = (props) => {
  const formSchema = yup.object().shape({
    person: yup.string().min(2, "name must be at least 2 characters"),
    size: yup
      .string()
      .oneOf(["small", "medium", "large"], "please select a size"),
    sauce: yup
      .string()
      .oneOf(["red", "garlic", "bbq", "alfredo"], "please select a sauce"),
    pepperoni: yup.boolean(),
    sausage: yup.boolean(),
    canadianBacon: yup.boolean(),
    spicyItalianSausage: yup.boolean(),
    grilledChicken: yup.boolean(),
    substitute: yup.boolean(),
    instructions: yup.string().trim(),
  });

  const [form, setForm] = useState(initialState);
  const [disabled, setDisabled] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState({
    person: "",
    size: "",
    sauce: "",
    pepperoni: "",
    sausage: "",
    canadianBacon: "",
    spicyItalianSausage: "",
    grilledChicken: "",
    substitute: "",
    instructions: "",
  });

  const validateChange = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => {
        setError({ ...error, [name]: "" });
      })
      .catch((err) => {
        setError({ ...error, [name]: err.errors[0] });
      });
  };
  const changes = (e) => {
    const { name, type, checked, value } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    validateChange(name, value);
    setForm({ ...form, [name]: newValue });
  };

  const postNewOrder = (newOrder) => {
    axios
      .post("https://reqres.in/api/orders", newOrder)
      .then((response) => {
        // Post the new order to the list of orders
        setOrders([response.data, ...orders]);
        // Wipe the inputs clean on submit
        setForm(initialState);
      })
      .catch((error) => {
        // If the order cannot be submitted, log the error
        console.error("[postNewOrder() CATCH]", error);
        // Wipe the inputs clean on submit
        setForm(initialState);
      });
  };

  const submitForm = () => {
    const newOrder = {
      person: form["person"].trim(),
      size: form["size"],
      sauce: form["sauce"],
      pepperoni: form["pepperoni"],
      sausage: form["sausage"],
      canadianBacon: form["canadianBacon"],
      spicyItalianSausage: form["spicyItalianSausage"],
      grilledChicken: form["grilledChicken"],
      substitute: form["substitute"],
      instructions: form["instructions"],
    };
    postNewOrder(newOrder);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    submitForm();
  };

  useEffect(() => {
    formSchema.isValid(form).then((valid) => {
      setDisabled(!valid);
    });
  }, [form]);

  return (
    <form id="pizza-form" onSubmit={onSubmit}>
      <h2>Build Your Own Pizza</h2>
      <label>
        Enter your name:
        <span>{`${error.person}`}</span>
        <input
          type="text"
          id="name-input"
          name="person"
          value={form.person}
          onChange={changes}
        />
      </label>
      <label>
        Choice of Size
        <select onChange={changes} name="size" id="size-dropdown">
          <option value="">Pizza Size</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </label>
      <div>
        <h2>Choice of Sauce</h2>
        <p>Required</p>
      </div>
      <label>
        Original Red
        <input
          onChange={changes}
          type="radio"
          id="sauce-option"
          name="sauce"
          value="red"
        />
      </label>
      <label>
        Garlic Ranch
        <input
          onChange={changes}
          type="radio"
          value="garlic"
          id="sauce-option"
          name="sauce"
        />
      </label>
      <label>
        BBQ Sauce
        <input
          onChange={changes}
          type="radio"
          id="sauce-option"
          value="bbq"
          name="sauce"
        />
      </label>
      <label>
        Spinach Alfredo
        <input
          onChange={changes}
          type="radio"
          id="sauce-option"
          value="alfredo"
          name="sauce"
        />
      </label>
      <div>
        <h2>Add Toppings</h2>
        <p>Choose Up to 5</p>
      </div>
      <label>
        Pepperoni
        <input
          onChange={changes}
          type="checkbox"
          id="toppings-checkbox"
          name="pepperoni"
          checked={form.pepperoni}
        />
      </label>
      <label>
        Sausage
        <input
          onChange={changes}
          type="checkbox"
          id="toppings-checkbox"
          name="sausage"
          checked={form.sausage}
        />
      </label>
      <label>
        Canadian Bacon
        <input
          onChange={changes}
          type="checkbox"
          id="toppings-checkbox"
          name="canadianBacon"
          checked={form.canadianBacon}
        />
      </label>
      <label>
        Spicy Italian Sausage
        <input
          onChange={changes}
          type="checkbox"
          id="toppings-checkbox"
          name="spicyItalianSausage"
          checked={form.spicyItalianSausage}
        />
      </label>
      <label>
        Grilled Chicken
        <input
          onChange={changes}
          type="checkbox"
          id="toppings-checkbox"
          name="grilledChicken"
          checked={form.grilledChicken}
        />
      </label>
      <div>
        <h2>Choice of Substitute</h2>
        <p>Choose up to 1</p>
      </div>
      <label>
        <input type="checkbox" name="substitute" onChange={changes} />
        Gluten-Free Crust
      </label>
      <div>
        <h2>Special instructions</h2>
      </div>
      <label>
        Anything Else?
        <input
          className="additionalInfo"
          type="text"
          name="instructions"
          placeholder="Write any additonal information, here."
          id="special-text"
          onChange={changes}
        />
      </label>
      <button id="order-button" disabled={disabled}>
        Place Order
      </button>
    </form>
  );
};

export default PizzaForm;
