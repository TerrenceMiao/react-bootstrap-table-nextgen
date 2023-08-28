import PropTypes from "prop-types";
import React from "react";

import ToolkitContext from "./context";
import { TableToolkitProps } from ".";

const Toolkitprovider = (props: TableToolkitProps) => (
  <ToolkitContext.Provider { ...props }>
    <ToolkitContext.Consumer>
      {(tookKitProps) => props.children(tookKitProps)}
    </ToolkitContext.Consumer>
  </ToolkitContext.Provider>
);

Toolkitprovider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Toolkitprovider;
