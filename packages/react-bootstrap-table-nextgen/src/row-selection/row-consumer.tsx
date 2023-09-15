import cs from "classnames";
import React from "react";
import createSelectionContext from "../contexts/selection-context";
import _ from "../utils";

const SelectionContext = createSelectionContext();

export default function withRowSelection<T extends React.ComponentType<any>>(
  Component: T
): React.FC<React.ComponentProps<T>> {
  const renderWithSelection = (props: any, selectRow: any) => {
    const key = props.value;
    const selected = _.contains(selectRow.selected, key);
    const selectable =
      !selectRow.nonSelectable || !_.contains(selectRow.nonSelectable, key);
    const notSelectable = _.contains(selectRow.nonSelectable, key);

    let { style, className } = props;

    if (selected) {
      const selectedStyle = _.isFunction(selectRow.style)
        ? selectRow.style(props.row, props.rowIndex)
        : selectRow.style;

      const selectedClasses = _.isFunction(selectRow.classes)
        ? selectRow.classes(props.row, props.rowIndex)
        : selectRow.classes;

      style = {
        ...style,
        ...selectedStyle,
      };
      className = cs(className, selectedClasses) || undefined;

      if (selectRow.bgColor) {
        style = style || {};
        style.backgroundColor = _.isFunction(selectRow.bgColor)
          ? selectRow.bgColor(props.row, props.rowIndex)
          : selectRow.bgColor;
      }
    }

    if (notSelectable) {
      const notSelectableStyle = _.isFunction(selectRow.nonSelectableStyle)
        ? selectRow.nonSelectableStyle(props.row, props.rowIndex)
        : selectRow.nonSelectableStyle;

      const notSelectableClasses = _.isFunction(selectRow.nonSelectableClasses)
        ? selectRow.nonSelectableClasses(props.row, props.rowIndex)
        : selectRow.nonSelectableClasses;

      style = {
        ...style,
        ...notSelectableStyle,
      };
      className = cs(className, notSelectableClasses) || undefined;
    }

    return (
      <Component
        {...props}
        style={style}
        className={className}
        selectRow={selectRow}
        selected={selected}
        selectable={selectable}
      />
    );
  };

  const WithSelectionRowConsumer: React.FC<React.ComponentProps<T>> = (
    props
  ) => (
    <SelectionContext.Consumer>
      {(selectRow) => renderWithSelection(props, selectRow)}
    </SelectionContext.Consumer>
  );

  WithSelectionRowConsumer.displayName = "WithSelectionRowConsumer";
  return WithSelectionRowConsumer;
}
