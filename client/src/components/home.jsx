import React, { Component } from "react";
import Loading from "./loading/loading";
import { getProducts } from "./../services/productService";
import { getDepartments } from "./../services/departmentService";
import { filterProducts } from "./../services/filter";
import Pagination from "./../common/pagination";
import { paginate } from "./../utils/paginate";
import SearchBox from "./searchBox";

class Home extends Component {
  state = {
    products: [],
    departments: [],
    loading: true,
    selectedDepartment: "All",
    pageSize: 3,
    currentPage: 1,
    searchQuery: "",
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
      searchQuery,
    } = this.state;

    let filteredProducts = filterProducts(
      products,
      departments,
      selectedDepartment
    );

    if (searchQuery)
      filteredProducts = filteredProducts.filter((p) =>
        p.name.toLowerCase().startsWith(searchQuery.toLowerCase())
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
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
    this.setState({
      selectedDepartment: department,
      currentPage: 1,
      searchQuery: "",
    });
  };

  handleActiveDepartment = (department) => {
    let cls = "list-group-item list-group-item-action ";
    department === this.state.selectedDepartment && (cls += "active");
    return cls;
  };

  handlePageChange = (currentPage) => {
    this.setState({ currentPage });
  };

  handleSearch = (searchQuery) => {
    this.setState({ searchQuery, currentPage: 1, selectedDepartment: "All" });
  };
}

export default Home;
