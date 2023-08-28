import PropTypes from "prop-types";
import React from "react";

const ClearButton = ({ onClear, text, className }: any) => (
  <button className={`btn btn-default ${className}`} onClick={onClear}>
    {text}
  </button>
);

ClearButton.propTypes = {
  onClear: PropTypes.func.isRequired,
  className: PropTypes.string,
  text: PropTypes.string,
};

ClearButton.defaultProps = {
  text: "Clear",
  className: "",
};

export default ClearButton;
