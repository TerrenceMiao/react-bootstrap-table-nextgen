/* eslint react/prop-types: 0 */
import React from "react";
import { Consumer } from "./context";
import createEditingCell from "./editing-cell";

export default (_: any, onStartEdit?: any) => {
  const EditingCell = createEditingCell(_, onStartEdit);
  const renderWithEditingCell = (props: any, cellEdit: any) => {
    const content = _.get(props.row, props.column.dataField);
    let editCellstyle = props.column.editCellStyle || {};
    let editCellclasses = props.column.editCellClasses;
    if (_.isFunction(props.column.editCellStyle)) {
      editCellstyle = props.column.editCellStyle(
        content,
        props.row,
        props.rowIndex,
        props.columnIndex
      );
    }
    if (_.isFunction(props.column.editCellClasses)) {
      editCellclasses = props.column.editCellClasses(
        content,
        props.row,
        props.rowIndex,
        props.columnIndex
      );
    }

    return (
      <EditingCell
        {...props}
        className={editCellclasses}
        style={editCellstyle}
        {...cellEdit}
      />
    );
  };

  return (props: any) => (
    <Consumer>{(cellEdit) => renderWithEditingCell(props, cellEdit)}</Consumer>
  );
};
