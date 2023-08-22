import React from "react";
import createExpansionContext, {
  RowExpandContextValue,
} from "../contexts/row-expand-context";
import { ExpansionHeaderCellProps } from "./expand-header-cell";

interface Props extends ExpansionHeaderCellProps {
  expandRow?: RowExpandContextValue;
}

const ExpansionContext = createExpansionContext();

const withExpandContext = (Component: React.ComponentType<Props>) => () =>
  (
    <ExpansionContext.Consumer>
      {(expandRow) => <Component { ... expandRow } />}
    </ExpansionContext.Consumer>
  );

export default withExpandContext;
