import React, { Component } from "react";
class SearchBox extends Component {
  state = {};
  render() {
    const { value, onChange } = this.props;
    return (
      <input
        type="text"
        name="query"
        className="form-control"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    );
  }
}

export default SearchBox;
