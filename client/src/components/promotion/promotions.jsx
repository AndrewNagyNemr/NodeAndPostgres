import React, { Component } from "react";
import Loading from "../loading/loading";
import { getPromotions } from "../../services/promotionService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deletePromotion } from "./../../services/promotionService";

class Promotions extends Component {
  state = {
    loading: true,
    promotions: [],
  };
  async componentDidMount() {
    const { data } = await getPromotions();
    this.setState({ loading: false, promotions: data });
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
        <Link to="./promotions/new" className="btn btn-primary my-2">
          Add
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Discount</th>
              <th>Active</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {promotions.map((p) => (
              <tr key={p.promotion_id}>
                <td>{p.promotion_id}</td>
                <td>{p.code}</td>
                <td>{p.discount}</td>
                <td>{p.active ? "yes" : "no"}</td>
                <td>
                  <Link
                    to={`/promotions/${p.promotion_id}`}
                    className="btn btn-secondary"
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(p.promotion_id)}
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
    const originalPromotions = [...this.state.promotions];
    try {
      this.setState({
        promotions: originalPromotions.filter((p) => p.promotion_id !== id),
      });
      await deletePromotion(id);
      toast.success("Successfuly deleted promotion");
    } catch (error) {
      toast.error("error while deleting promotion");
      this.setState({ deparments: originalPromotions });
    }
  };
}

export default Promotions;
