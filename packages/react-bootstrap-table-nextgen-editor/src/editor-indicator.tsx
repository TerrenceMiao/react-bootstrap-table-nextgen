/* eslint no-return-assign: 0 */
import PropTypes from "prop-types";
import React from "react";

const EditorIndicator = ({ invalidMessage }: any) => (
  <div className="alert alert-danger in" role="alert">
    <strong>{invalidMessage}</strong>
  </div>
);

EditorIndicator.propTypes = {
  invalidMessage: PropTypes.string,
};

EditorIndicator.defaultProps = {
  invalidMessage: null,
};

export default EditorIndicator;
