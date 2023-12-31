import PropTypes from "prop-types";
import React from "react";
import { ColumnDescription } from "react-bootstrap-table-nextgen";
import { ToggleListProps } from "../..";

const ToggleList = ({
  columns,
  onColumnToggle,
  toggles,
  contextual,
  className,
  btnClassName,
}: ToggleListProps): React.ReactElement | null => (
  <div
    className={`btn-group btn-group-toggle ${className}`}
    data-toggle="buttons"
  >
    {columns
      .map((column: ColumnDescription) => ({
        ...column,
        toggle: toggles[column.dataField],
      }))
      .map((column: ColumnDescription) => (
        <button
          type="button"
          key={column.dataField}
          className={`${btnClassName} btn btn-${contextual} ${
            column.toggle ? "active" : ""
          }`}
          data-toggle="button"
          aria-pressed={column.toggle ? "true" : "false"}
          onClick={() => onColumnToggle(column.dataField)}
        >
          {column.text}
        </button>
      ))}
  </div>
);

ToggleList.propTypes = {
  columns: PropTypes.array.isRequired,
  toggles: PropTypes.object.isRequired,
  onColumnToggle: PropTypes.func.isRequired,
  btnClassName: PropTypes.string,
  className: PropTypes.string,
  contextual: PropTypes.string,
};

ToggleList.defaultProps = {
  btnClassName: "",
  className: "",
  contextual: "primary",
};

export default ToggleList;
