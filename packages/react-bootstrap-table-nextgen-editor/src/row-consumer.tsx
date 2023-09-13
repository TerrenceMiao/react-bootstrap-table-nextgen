/* eslint react/prop-types: 0 */
import React from "react";
import {
  CLICK_TO_CELL_EDIT,
  DBCLICK_TO_CELL_EDIT,
  DELAY_FOR_DBCLICK,
} from "..";
import { Consumer } from "./context";

export default (Component: any, selectRowEnabled: any) => {
  const renderWithCellEdit = (props: any, cellEdit: any) => {
    const key = props.value;
    const editableRow = !(
      cellEdit.nonEditableRows.length > 0 &&
      cellEdit.nonEditableRows.indexOf(key) > -1
    );

    const attrs: { DELAY_FOR_DBCLICK?: number | string } = {};

    if (selectRowEnabled && cellEdit.mode === DBCLICK_TO_CELL_EDIT) {
      attrs.DELAY_FOR_DBCLICK = DELAY_FOR_DBCLICK;
    }

    return (
      <Component
        {...props}
        {...attrs}
        editingRowIdx={cellEdit.ridx}
        editingColIdx={cellEdit.cidx}
        isEditable={editableRow}
        atstart={cellEdit.atstart}
        clickToEdit={cellEdit.mode === CLICK_TO_CELL_EDIT}
        dbclickToEdit={cellEdit.mode === DBCLICK_TO_CELL_EDIT}
      />
    );
  };
  function withConsumer(props: any) {
    return (
      <Consumer>{(cellEdit) => renderWithCellEdit(props, cellEdit)}</Consumer>
    );
  }

  withConsumer.displayName = "WithCellEditingRowConsumer";
  return withConsumer;
};
