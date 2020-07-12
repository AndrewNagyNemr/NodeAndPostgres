import React from "react";
import Form from "../../common/form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  addPromotion,
  getPromotion,
  updatePromotion,
} from "../../services/promotionService";

class AddPromotion extends Form {
  state = {
    data: { code: "", active: false, discount: "" },
    errors: {},
    loading: true,
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    if (id !== "new") {
      try {
        const { data } = await getPromotion(id);
        this.setState({
          data: {
            code: data.code,
            active: data.active,
            discount: data.discount,
          },
        });
      } catch (error) {
        this.props.history.replace("new");
      }
    }
    this.setState({ loading: false });
  }

  schema = {
    code: Joi.string().min(3).max(50).required().label("Code"),
    discount: Joi.number().min(1).max(99).required().label("Discount"),
    active: Joi.label("Active"),
  };

  doSubmit = async () => {
    const { id } = this.props.match.params;
    const { data } = this.state;
    if (id !== "new") {
      try {
        await updatePromotion(id, data);
        return toast.success("promption updated successfully");
      } catch (error) {
        return toast.error(error.response.data);
      }
    } else {
      try {
        await addPromotion(this.state.data);
        toast.success("successfully added promotion");
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          toast.error(ex.response.data);
        }
      }
      this.setState({ data: { code: "", active: false, discount: "" } });
    }
  };

  handleActive = () => {
    const { data } = this.state;
    data.active = !data.active;
    this.setState({ data });
  };

  render() {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <h3 className="main_head my-3">Add Promotion</h3>
        <div className="form_admin">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("code", "Code")}
            {this.renderInput("discount", "Discount")}
            <div className="form-check my-2">
              <input
                name="active"
                id="active"
                type="checkbox"
                className="form-check-input"
                checked={this.state.data.active}
                onChange={this.handleActive}
              />
              <label className="form-check-label" htmlFor="defaultCheck1">
                Active
              </label>
            </div>{" "}
            {id === "new"
              ? this.renderButton("Add")
              : this.renderButton("Edit")}
            <Link to="/promotions" className="btn btn-primary mx-2">
              Preview All
            </Link>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default AddPromotion;
