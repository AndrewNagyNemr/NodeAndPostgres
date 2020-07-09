import React, { Component } from "react";
import Loading from "./loading/loading";
import { getProducts } from "./../services/productService";
import { getDepartments } from "./../services/departmentService";
import { filterProducts } from "./../services/filter";
import Pagination from "./../common/pagination";
import { paginate } from "./../utils/paginate";

class Home extends Component {
  state = {
    products: [],
    departments: [],
    loading: true,
    selectedDepartment: "All",
    pageSize: 3,
    currentPage: 1,
  };

  async componentDidMount() {
    const { data: products } = await getProducts();
    const { data: departments } = await getDepartments();
    this.setState({ loading: false, products, departments });
  }

  render() {
    const {
      products,
      departments,
      loading,
      selectedDepartment,
      pageSize,
      currentPage,
    } = this.state;

    const filteredProducts = filterProducts(
      products,
      departments,
      selectedDepartment
    );

    const paginatedFilteredProducts = paginate(
      filteredProducts,
      currentPage,
      pageSize
    );

    if (loading) return <Loading />;
    if (!products.length || !departments.length)
      return <h1>No Products Yet</h1>;
    return (
      <div className="row">
        <div className="col-9">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {paginatedFilteredProducts.map((p) => (
                <tr key={p.product_id}>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>
                    {departments.find((d) => d.department_id === p.dep_id).name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsCount={filteredProducts.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
        <div className="col-3">
          <div className="list-group">
            <button
              onClick={() => this.handleDepartment("All")}
              className={this.handleActiveDepartment("All")}
            >
              All
            </button>
            {departments.map((d) => (
              <button
                key={d.department_id}
                onClick={() => this.handleDepartment(d.name)}
                className={this.handleActiveDepartment(d.name)}
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  handleDepartment = (department) => {
    this.setState({ selectedDepartment: department, currentPage: 1 });
  };

  handleActiveDepartment = (department) => {
    let cls = "list-group-item list-group-item-action ";
    department === this.state.selectedDepartment && (cls += "active");
    return cls;
  };

  handlePageChange = (currentPage) => {
    this.setState({ currentPage });
  };
}

export default Home;
