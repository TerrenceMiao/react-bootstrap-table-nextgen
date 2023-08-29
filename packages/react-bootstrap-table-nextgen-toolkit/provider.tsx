import PropTypes from "prop-types";
import React from "react";

import { TableToolkitProps } from ".";
import ToolkitContext from "./context";

const Toolkitprovider = (
  props: TableToolkitProps
): React.ReactElement | null => (
  <ToolkitContext.Provider {...props}>
    <ToolkitContext.Consumer>
      {(tookKitProps) => props.children(tookKitProps)}
    </ToolkitContext.Consumer>
  </ToolkitContext.Provider>
);

Toolkitprovider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Toolkitprovider;
