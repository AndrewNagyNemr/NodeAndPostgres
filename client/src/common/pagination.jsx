import React, { Component } from "react";
import _ from "lodash";

class Pagination extends Component {
  state = {};
  render() {
    const { itemsCount, pageSize, onPageChange, currentPage } = this.props;
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {_.range(1, pagesCount + 1).map((page) => (
            <li key={page} className={this.renderPageClass(page, currentPage)}>
              <button onClick={() => onPageChange(page)} className="page-link">
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  renderPageClass = (page, currentPage) => {
    let cls = "page-item ";
    page === currentPage && (cls += "active");
    return cls;
  };
}

export default Pagination;
