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
    loading: true,
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const { data: departments } = await getDepartments();
    this.setState({ departments });
    if (id !== "new") {
      try {
        const { data } = await getProduct(id);
        this.setState({
          data: { name: data.name, price: data.price, dep_id: data.dep_id },
        });
      } catch (error) {
        this.props.history.replace("new");
      }
    }
    this.setState({ loading: false });
  }

  schema = {
    name: Joi.string().min(3).max(50).required().label("Name"),
    price: Joi.number().positive().required().label("Price"),
    dep_id: Joi.number().positive().required(),
  };

  doSubmit = async () => {
    const { id } = this.props.match.params;
    const { data } = this.state;
    if (id !== "new") {
      try {
        await updateProduct(id, data);
        return toast.success("product updated successfully");
      } catch (error) {
        return toast.error(error.response.data);
      }
    } else {
      try {
        await addProduct(this.state.data);
        toast.success("successfully added product");
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          toast.error(ex.response.data);
        }
      }
      this.setState({ data: { name: "", price: "", dep_id: "" } });
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
