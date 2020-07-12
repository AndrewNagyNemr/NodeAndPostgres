import React, { Component } from "react";
class DropDown extends Component {
  state = {};
  render() {
    const { productsPromos, price } = this.props;
    return (
      <div className="btn-group">
        {productsPromos.length ? (
          <button
            type="button"
            className="btn btn-warning btn-sm dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          ></button>
        ) : (
          ""
        )}
        <div className="dropdown-menu">
          <table className="table table-dark mb-0">
            <tbody>
              {productsPromos.map((pp) => (
                <tr key={pp.code}>
                  <td>{pp.code.slice(0, 8)}</td>
                  <td>{pp.discount}%</td>
                  <td>{price * (100 - pp.discount) * 0.01}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default DropDown;
