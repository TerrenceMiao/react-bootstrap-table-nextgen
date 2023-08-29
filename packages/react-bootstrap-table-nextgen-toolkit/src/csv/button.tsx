import PropTypes from "prop-types";
import React from "react";

import { ExportCSVButtonProps } from "../..";

const ExportCSVButton = (
  props: ExportCSVButtonProps
): React.ReactElement | null => {
  const { onExport, children, className, ...rest } = props;

  return (
    <button
      type="button"
      className={`react-bs-table-csv-btn btn btn-default ${className}`}
      onClick={() => onExport()}
      {...rest}
    >
      {children}
    </button>
  );
};

ExportCSVButton.propTypes = {
  children: PropTypes.node.isRequired,
  onExport: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};
ExportCSVButton.defaultProps = {
  className: "",
  style: {},
};

export default ExportCSVButton;
