import React, { Component } from "react";
import { getDepartments } from "../../services/departmentService";
import Loading from "../loading/loading";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteDepartment } from "./../../services/departmentService";
class Departments extends Component {
  state = {
    loading: true,
    departments: [],
  };
  async componentDidMount() {
    const { data } = await getDepartments();
    this.setState({ loading: false, departments: data });
  }
  render() {
    const { loading, departments } = this.state;
    if (loading) return <Loading />;
    if (departments.length === 0)
      return (
        <React.Fragment>
          <h1>No Departments Available!</h1>
          <Link to="./departments/new" className="btn btn-primary my-2">
            Add
          </Link>
        </React.Fragment>
      );
    return (
      <React.Fragment>
        <Link to="./departments/new" className="btn btn-primary my-2">
          Add
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {departments.map((d) => (
              <tr key={d.department_id}>
                <td>{d.department_id}</td>
                <td>{d.name}</td>
                <td>
                  <Link
                    to={`/departments/${d.department_id}`}
                    className="btn btn-secondary"
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(d.department_id)}
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
    const originalDepartments = [...this.state.departments];
    try {
      this.setState({
        departments: originalDepartments.filter((d) => d.department_id !== id),
      });
      await deleteDepartment(id);
      toast.success("Successfuly deleted department");
    } catch (error) {
      toast.error(error.response.data);
      this.setState({ departments: originalDepartments });
    }
  };
}

export default Departments;
