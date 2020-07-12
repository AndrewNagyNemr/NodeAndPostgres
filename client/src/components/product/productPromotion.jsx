import React, { Component } from "react";
import Loading from "./../loading/loading";
import { getPromotions } from "./../../services/promotionService";
import { Link } from "react-router-dom";
import {
  getProductPromos,
  addProductPromo,
  deleteProductPromo,
} from "./../../services/productsPromotionsService";
import { toast } from "react-toastify";

class ProductPromotion extends Component {
  state = {
    promotions: [],
    productPromos: [],
    loading: true,
  };

  async componentDidMount() {
    const { id: product_id } = this.props.match.params;
    const { data: promotions } = await getPromotions();
    const { data: productPromos } = await getProductPromos(product_id);
    // console.log(this.state);
    this.setState({ promotions, productPromos, loading: false });
  }

  formatePromosArray = () => {
    const { productPromos } = this.state;
    const ppArray = [];
    productPromos.map((pp) => ppArray.push(pp.promotion_id));
    return ppArray;
  };

  render() {
    const { promotions, loading } = this.state;
    const { name } = this.props.match.params;
    if (loading) return <Loading />;
    return (
      <React.Fragment>
        <h3>Product Promotions : {name}</h3>
        {promotions.map((p) => (
          <div key={p.promotion_id} className="form-check my-2">
            <span className="mx-3">
              <input
                className="form-check-input"
                type="checkbox"
                value={p.promotion_id}
                checked={this.formatePromosArray().includes(p.promotion_id)}
                onChange={() => this.productCheck(p.promotion_id)}
              />
              <label className="form-check-label">{p.code}</label>
            </span>
          </div>
        ))}
        <Link className="btn btn-primary" to="/products">
          Back
        </Link>
      </React.Fragment>
    );
  }

  productCheck = async (promotion_id) => {
    const { id: product_id } = this.props.match.params;
    const { productPromos } = this.state;
    const originalPP = [...productPromos];

    if (!this.formatePromosArray().includes(promotion_id)) {
      try {
        const newPP = [...productPromos, { promotion_id }];
        this.setState({ productPromos: newPP });
        await addProductPromo(product_id, promotion_id);
        return toast.success("promotion added successfully");
      } catch (error) {
        this.setState({ productPromos: originalPP });
        return toast.error(error.response.data);
      }
    } else {
      try {
        const newPP = productPromos.filter(
          (pp) => pp.promotion_id !== promotion_id
        );
        this.setState({ productPromos: newPP });
        await deleteProductPromo(product_id, promotion_id);
        return toast.success("promotion deleted successfully");
      } catch (error) {
        this.setState({ productPromos: originalPP });
        return toast.error(error.response.data);
      }
    }
  };
}

export default ProductPromotion;
