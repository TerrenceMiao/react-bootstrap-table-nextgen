import React from "react";
import createSelectionContext, {
  SelectionContextValue,
} from "../contexts/selection-context";

interface Props extends SelectionContextValue {
  selectRow?: SelectionContextValue;
}

const SelectionContext = createSelectionContext();

const withSelectionContext = (Component: React.ComponentType<Props>) => () =>
  (
    <SelectionContext.Consumer>
      {(selectRow) => <Component {...selectRow} />}
    </SelectionContext.Consumer>
  );

export default withSelectionContext;
