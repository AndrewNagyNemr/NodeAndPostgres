import React, { Component } from "react";
import Loading from "../loading/loading";
import { getPromotions } from "../../services/promotionService";
import { Link } from "react-router-dom";

class Promotions extends Component {
  state = {
    loading: true,
    promotions: [],
  };
  async componentDidMount() {
    const { data } = await getPromotions();
    this.setState({ loading: false, promotions: data });
    console.log(data);
  }
  render() {
    const { loading, promotions } = this.state;
    if (loading) return <Loading />;
    if (promotions.length === 0)
    return (
      <React.Fragment>
        <h1>No promotions Available!</h1>
        <Link to="./promotions/new" className="btn btn-primary my-2">
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
              <th>Code</th>
              <th>Active</th>
              <th>Discount</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {promotions.map((d) => (
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

export default Promotions;
