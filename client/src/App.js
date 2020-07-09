import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Departments from "./components/department/departments";
import AddDepartment from "./components/department/addDepartment";
import Products from "./components/product/products";
import AddProduct from "./components/product/addProduct";
import Promotions from "./components/promotion/promotions";
import AddPromotion from "./components/promotion/addPromotion";
import NotFound from "./components/not-found";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/departments" exact component={Departments} />
          <Route path="/departments/:id" exact component={AddDepartment} />
          <Route path="/products" exact component={Products} />
          <Route path="/products/:id" exact component={AddProduct} />
          <Route path="/promotions" exact component={Promotions} />
          <Route path="/promotions/:id" exact component={AddPromotion} />
          <Route path="/not-found" exact component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
