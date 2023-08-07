/* eslint react/prop-types: 0 */
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
import cs from 'classnames';
// @ts-expect-error TS(6142): Module './expand-row' was resolved to '/Users/terr... Remove this comment to see the full error message
import ExpandRow from './expand-row';
import _ from '../utils';
// @ts-expect-error TS(6142): Module '../contexts/row-expand-context' was resolv... Remove this comment to see the full error message
import ExpansionContext from '../contexts/row-expand-context';

export default (Component: any) => {
  const renderWithExpansion = (props: any, expandRow: any) => {
    let parentClassName = '';
    let className = '';
    const key = props.value;

    const expanded = _.contains(expandRow.expanded, key);
    const isClosing = _.contains(expandRow.isClosing, key);
    const expandable = !expandRow.nonExpandable || !_.contains(expandRow.nonExpandable, key);
    if (expanded) {
      parentClassName = _.isFunction(expandRow.parentClassName) ?
        expandRow.parentClassName(expanded, props.row, props.rowIndex) :
        (expandRow.parentClassName || '');

      className = _.isFunction(expandRow.className) ?
        expandRow.className(expanded, props.row, props.rowIndex) :
        (expandRow.className || '');
    }

    return [
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Component
        { ...props }
        key={ key }
        expanded={ expanded }
        expandable={ expandable }
        expandRow={ { ...expandRow } }
        className={ cs(props.className, parentClassName) }
      />,
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      expanded || isClosing ? <ExpandRow
        key={ `${key}-expanding` }
        colSpan={ props.visibleColumnSize }
        expanded={ expanded }
        onClosed={ () => expandRow.onClosed(key) }
        className={ className }
      >
        { expandRow.renderer(props.row, props.rowIndex) }
      </ExpandRow> : null
    ];
  };
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return (props: any) => <ExpansionContext.Consumer>
    { (expandRow: any) => renderWithExpansion(props, expandRow) }
  </ExpansionContext.Consumer>;
};
