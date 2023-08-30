import PropTypes from "prop-types";
import React from "react";

const SizePerPageOption = ({
  text,
  page,
  onSizePerPageChange,
  bootstrap4,
}: any) =>
  bootstrap4 ? (
    <a
      href="#"
      tabIndex={-1}
      role="menuitem"
      className="dropdown-item"
      data-page={page}
      onMouseDown={(e) => {
        e.preventDefault();
        onSizePerPageChange(page);
      }}
    >
      {text}
    </a>
  ) : (
    <li key={text} role="presentation" className="dropdown-item">
      <a
        href="#"
        tabIndex={-1}
        role="menuitem"
        data-page={page}
        onMouseDown={(e) => {
          e.preventDefault();
          onSizePerPageChange(page);
        }}
      >
        {text}
      </a>
    </li>
  );

SizePerPageOption.propTypes = {
  text: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  onSizePerPageChange: PropTypes.func.isRequired,
  bootstrap4: PropTypes.bool,
};

SizePerPageOption.defaultProps = {
  bootstrap4: false,
};

export default SizePerPageOption;
