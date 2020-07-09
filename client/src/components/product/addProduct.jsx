import React from "react";
import Form from "../../common/form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getDepartments } from "./../../services/departmentService";
import {
  addProduct,
  getProduct,
  updateProduct,
} from "../../services/productService";
import Loading from "./../loading/loading";

class AddProduct extends Form {
  state = {
    data: { name: "", price: "", dep_id: "" },
    errors: {},
    departments: [],
    oldProduct: {},
    loading: true,
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    const { data: departments } = await getDepartments();
    this.setState({ departments, loading: false });
    if (id === "new") return;
    const { data } = await getProduct(id);
    if (!data) return this.props.history.replace("new");
    this.setState({ data, oldPromotion: data });
  }

  schema = {
    oldProduct: Joi,
    name: Joi.string().required().label("Name"),
    price: Joi.number().required().label("Price"),
    dep_id: Joi,
    id: Joi.string(),
  };

  doSubmit = async () => {
    const id = this.props.match.params.id;
    const { oldProducts, data } = this.state;
    if (id !== "new") {
      try {
        await updateProduct(id, data);
        return toast.success("product updated successfully");
      } catch (error) {
        this.setState({ data, oldProducts });
        return toast.error("Error while updating product");
      }
    } else {
      try {
        await addProduct(this.state.data);
        this.setState({ data: { name: "", price: "", dep_id: "" } });
        toast.success("successfully added product");
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          const errors = ex.response.data;
          this.setState({ errors });
        }
      }
    }
  };

  selectDepartments = () => {
    const { departments } = this.state;
    const newDepartments = [];
    for (let department of departments) {
      newDepartments.push({
        id: department.department_id,
        name: department.name,
      });
    }
    return newDepartments;
  };

  render() {
    const { id } = this.props.match.params;
    const { loading } = this.state;
    if (loading) return <Loading />;
    return (
      <React.Fragment>
        <h3 className="main_head my-3">Add Product</h3>
        <div className="form_admin">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Name")}
            {this.renderInput("price", "Price")}
            {this.renderSelect(
              "dep_id",
              "Department",
              this.selectDepartments()
            )}
            {id === "new"
              ? this.renderButton("Add")
              : this.renderButton("Edit")}
            <Link to="/products" className="btn btn-primary mx-2">
              Preview All
            </Link>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default AddProduct;
