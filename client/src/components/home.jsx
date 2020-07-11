import React, { Component } from "react";
import Loading from "./loading/loading";
import { getProducts } from "./../services/productService";
import { getDepartments } from "./../services/departmentService";
import { filterProducts } from "./../services/filter";
import Pagination from "./../common/pagination";
import { paginate } from "./../utils/paginate";
import SearchBox from "./searchBox";
import DropDown from "./dropDown";
import { getProductsPromos } from "./../services/productsPromotionsService";

class Home extends Component {
  state = {
    products: [],
    departments: [],
    productsPromos: [],
    loading: true,
    selectedDepartment: "All",
    pageSize: 3,
    currentPage: 1,
    searchQuery: "",
    promoFilter: "",
  };

  async componentDidMount() {
    const { data: products } = await getProducts();
    const { data: departments } = await getDepartments();
    const { data: productsPromos } = await getProductsPromos();
    console.log(productsPromos);
    this.setState({ loading: false, products, departments, productsPromos });
  }

  render() {
    const {
      products,
      productsPromos,
      departments,
      loading,
      selectedDepartment,
      pageSize,
      currentPage,
      searchQuery,
      promoFilter,
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
    else if (promoFilter)
      filteredProducts = productsPromos.filter((p) =>
        p.code === promoFilter
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
          <SearchBox
            value={searchQuery}
            onChange={this.handleSearch}
            placeholder="Search.."
          />
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Department</th>
                <th>Promotions</th>
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
                  <td>
                    <DropDown
                      productsPromos={productsPromos.filter(
                        (pp) => pp.product_id === p.product_id && pp.active
                      )}
                      price={p.price}
                    />
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
          <div className="my-3">
            <SearchBox
              value={promoFilter}
              onChange={this.handlePromoFitler}
              placeholder="Enter promocode"
            />
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
    this.setState({
      searchQuery,
      currentPage: 1,
      selectedDepartment: "All",
      promoFilter: "",
    });
  };

  handlePromoFitler = (promoFilter) => {
    this.setState({
      promoFilter,
      currentPage: 1,
      selectedDepartment: "All",
      searchQuery: "",
    });
  };
}

export default Home;
