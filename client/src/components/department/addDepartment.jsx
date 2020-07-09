import React from "react";
import Form from "../../common/form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { addDepartment, getDepartment, updateDepartment } from "../../services/departmentService";

class AddDepartment extends Form {
  state = {
    data: { name: "" },
    errors: {},
    oldDepartment: {},
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    if (id === "new") return;
    const { data } = await getDepartment(id);
    if (!data) return this.props.history.replace("new");
    this.setState({ data: { name: data.name }, oldDepartment: data });
  }

  schema = {
    oldDepartment: Joi,
    name: Joi.string().required().label("Name"),
    id: Joi.string(),
  };

  doSubmit = async () => {
    const id = this.props.match.params.id;
    const { oldDepartment, data } = this.state;
    if (id !== "new") {
      try {
        await updateDepartment(id, data);
        return toast.success("department name updated successfully");
      } catch (error) {
        this.setState({ data: { name: oldDepartment.name }, oldDepartment });
        return toast.error("Error while updating department");
      }
    } else {
      try {
        await addDepartment(this.state.data);
        this.setState({ data: { name: "" } });
        toast.success("successfully added department");
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          const errors = ex.response.data;
          this.setState({ errors });
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
