import PropTypes from "prop-types";
import React from "react";
import { ClearSearchButtonProps } from "../..";

const ClearButton = ({
  onClear,
  text,
  className,
}: ClearSearchButtonProps): React.ReactElement | null => (
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
