/* eslint-disable react-hooks/exhaustive-deps */
import Select from "react-select";
import PropTypes from "prop-types";
import { filterOptions } from "./options";
import "./Filter.scss";

const Filter = ({ change, urlValue }) => {
  return (
    <Select
      defaultValue={filterOptions[0]}
      className="filterContainer"
      classNamePrefix="filter"
      options={filterOptions}
      value={filterOptions.find((el) => el.value === urlValue)}
      onChange={(e) => change(e.value)}
    />
  );
};

Filter.propTypes = {
  change: PropTypes.func,
  urlValue: PropTypes.string,
};
export default Filter;
