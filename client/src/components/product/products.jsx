import React, { Component } from "react";
import { getProducts } from "../../services/productService";
import Loading from "../loading/loading";
import { Link } from "react-router-dom";

class Products extends Component {
  state = {
    loading: true,
    products: [],
  };
  async componentDidMount() {
    const { data } = await getProducts();
    this.setState({ loading: false, products: data });
  }
  render() {
    const { loading, products } = this.state;
    if (loading) return <Loading />;
    if (products.length === 0)
    return (
      <React.Fragment>
        <h1>No products Available!</h1>
        <Link to="./products/new" className="btn btn-primary my-2">
          Add
        </Link>
      </React.Fragment>
    );
    return (
      <React.Fragment>
        <button className="btn btn-primary my-2">Add</button>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Department</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.product_id}>
                <td>{p.product_id}</td>
                <td>{p.name}</td>
                <td>
                  <button className="btn btn-secondary">Edit</button>
                </td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Products;
