/* eslint react/prop-types: 0 */
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
import cs from 'classnames';
import _ from '../utils';
// @ts-expect-error TS(6142): Module '../contexts/selection-context' was resolve... Remove this comment to see the full error message
import SelectionContext from '../contexts/selection-context';

export default (Component: any) => {
  const renderWithSelection = (props: any, selectRow: any) => {
    const key = props.value;
    const selected = _.contains(selectRow.selected, key);
    const selectable = !selectRow.nonSelectable || !_.contains(selectRow.nonSelectable, key);
    const notSelectable = _.contains(selectRow.nonSelectable, key);

    let {
      style,
      className
    } = props;

    if (selected) {
      const selectedStyle = _.isFunction(selectRow.style)
        ? selectRow.style(props.row, props.rowIndex)
        : selectRow.style;

      const selectedClasses = _.isFunction(selectRow.classes)
        ? selectRow.classes(props.row, props.rowIndex)
        : selectRow.classes;

      style = {
        ...style,
        ...selectedStyle
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
        ...notSelectableStyle
      };
      className = cs(className, notSelectableClasses) || undefined;
    }

    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Component
        { ...props }
        style={ style }
        className={ className }
        selectRow={ selectRow }
        selected={ selected }
        selectable={ selectable }
      />
    );
  };

  function withConsumer(props: any) {
    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <SelectionContext.Consumer>
        { (selectRow: any) => renderWithSelection(props, selectRow) }
      </SelectionContext.Consumer>
    );
  }

  withConsumer.displayName = 'WithSelectionRowConsumer';
  return withConsumer;
};
