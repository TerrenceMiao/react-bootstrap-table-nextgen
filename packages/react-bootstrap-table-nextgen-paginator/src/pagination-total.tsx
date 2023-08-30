import PropTypes from "prop-types";
import React from "react";

const PaginationTotal = (props: any) => {
  if (props.paginationTotalRenderer) {
    return props.paginationTotalRenderer(props.from, props.to, props.dataSize);
  }
  return (
    <span className="react-bootstrap-table-pagination-total">
      &nbsp;Showing rows {props.from} to&nbsp;{props.to} of&nbsp;
      {props.dataSize}
    </span>
  );
};

PaginationTotal.propTypes = {
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  dataSize: PropTypes.number.isRequired,
  paginationTotalRenderer: PropTypes.func,
};

PaginationTotal.defaultProps = {
  paginationTotalRenderer: undefined,
};

export default PaginationTotal;
