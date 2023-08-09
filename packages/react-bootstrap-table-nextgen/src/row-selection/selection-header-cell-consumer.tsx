import React from "react";
import SelectionContext, {
  SelectionContextProps,
} from "../contexts/selection-context";

interface Props extends SelectionContextProps {
  selectRow?: SelectionContextProps;
}

const withSelectionContext = (Component: React.ComponentType<Props>) => () =>
  (
    <SelectionContext.Consumer>
      {(selectRow) => <Component selectRow={selectRow} />}
    </SelectionContext.Consumer>
  );

export default withSelectionContext;
