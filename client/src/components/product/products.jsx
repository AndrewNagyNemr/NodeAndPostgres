import React, { Component } from "react";
import { getProducts } from "../../services/productService";
import Loading from "../loading/loading";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getDepartments } from "./../../services/departmentService";
import { deleteProduct } from "./../../services/productService";

class Products extends Component {
  state = {
    loading: true,
    products: [],
    departments: [],
  };
  async componentDidMount() {
    const { data } = await getProducts();
    const { data: departments } = await getDepartments();
    this.setState({ loading: false, products: data, departments });
  }
  render() {
    const { loading, products, departments } = this.state;
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
        <Link to="/products/new" className="btn btn-primary my-2">
          Add
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Department</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.product_id}>
                <td>{p.product_id}</td>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>
                  {departments.find((d) => d.department_id === p.dep_id).name}
                </td>
                <td>
                  <Link
                    to={`/product-promotions/${p.name}/${p.product_id}`}
                    className="btn btn-warning"
                  >
                    Promo
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/products/${p.product_id}`}
                    className="btn btn-secondary"
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(p.product_id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
  handleDelete = async (id) => {
    const originalProducts = [...this.state.products];
    try {
      this.setState({
        products: originalProducts.filter((p) => p.product_id !== id),
      });
      await deleteProduct(id);
      toast.success("Successfuly deleted product");
    } catch (error) {
      toast.error("error while deleting product");
      this.setState({ deparments: originalProducts });
    }
  };
}

export default Products;
