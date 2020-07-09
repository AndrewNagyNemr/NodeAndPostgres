import React, { Component } from "react";
import { getDepartments } from "./../services/departmentService";
import Loading from "./loading/loading";
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
    return (
      <React.Fragment>
        <h1>Departments</h1>
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

export default Departments;
