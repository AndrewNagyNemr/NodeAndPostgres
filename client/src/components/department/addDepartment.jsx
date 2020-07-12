import React from "react";
import Form from "../../common/form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  addDepartment,
  getDepartment,
  updateDepartment,
} from "../../services/departmentService";

class AddDepartment extends Form {
  state = {
    data: { name: "" },
    errors: {},
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    if (id === "new") return;
    try {
      const { data } = await getDepartment(id);
      this.setState({ data: { name: data.name } });
    } catch (error) {
      return this.props.history.replace("new");
    }
  }

  schema = {
    name: Joi.string().min(3).max(50).required().label("Name"),
  };

  doSubmit = async () => {
    const { id } = this.props.match.params;
    const { data } = this.state;
    if (id !== "new") {
      try {
        await updateDepartment(id, data);
        return toast.success("updated successfully");
      } catch (error) {
        return toast.error(error.response.data);
      }
    } else {
      try {
        await addDepartment(this.state.data);
        this.setState({ data: { name: "" } });
        toast.success("successfully added department");
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          toast.error(ex.response.data);
          this.setState({ data: { name: "" } });
        }
      }
    }
  };

  render() {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <h3 className="main_head my-3">Add Department</h3>
        <div className="form_admin">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Name")}
            {id === "new"
              ? this.renderButton("Add")
              : this.renderButton("Edit")}
            <Link to="/departments" className="btn btn-primary mx-2">
              Preview All
            </Link>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default AddDepartment;
