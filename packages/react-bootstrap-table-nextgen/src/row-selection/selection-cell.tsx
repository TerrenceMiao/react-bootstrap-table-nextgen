/* eslint
  react/require-default-props: 0
  jsx-a11y/no-noninteractive-element-interactions: 0
*/
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component } from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';
import Const from '../const';
import _ from '../utils';
import { BootstrapContext } from '../contexts/bootstrap';

export default class SelectionCell extends Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    rowKey: PropTypes.any,
    selected: PropTypes.bool,
    onRowSelect: PropTypes.func,
    disabled: PropTypes.bool,
    rowIndex: PropTypes.number,
    tabIndex: PropTypes.number,
    clickToSelect: PropTypes.bool,
    selectionRenderer: PropTypes.func,
    selectColumnStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
  }

  props: any;

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps: any) {
    const shouldUpdate =
      this.props.rowIndex !== nextProps.rowIndex ||
      this.props.selected !== nextProps.selected ||
      this.props.disabled !== nextProps.disabled ||
      this.props.rowKey !== nextProps.rowKey ||
      this.props.tabIndex !== nextProps.tabIndex ||
      this.props.selectColumnStyle !== nextProps.selectColumnStyle;

    return shouldUpdate;
  }

  handleClick(e: any) {
    const {
      mode: inputType,
      rowKey,
      selected,
      onRowSelect,
      disabled,
      rowIndex
    } = this.props;
    e.stopPropagation();
    if (disabled) return;

    const checked = inputType === Const.ROW_SELECT_SINGLE
      ? true
      : !selected;

    onRowSelect(rowKey, checked, rowIndex, e);
  }

  render() {
    const {
      rowKey,
      mode: inputType,
      selected,
      disabled,
      tabIndex,
      rowIndex,
      selectionRenderer,
      selectColumnStyle
    } = this.props;

    const attrs = {};
    // @ts-expect-error TS(2339): Property 'tabIndex' does not exist on type '{}'.
    if (tabIndex !== -1) attrs.tabIndex = tabIndex;

    // @ts-expect-error TS(2339): Property 'style' does not exist on type '{}'.
    attrs.style = _.isFunction(selectColumnStyle) ?
      selectColumnStyle({
        checked: selected,
        disabled,
        rowIndex,
        rowKey
      }) :
      selectColumnStyle;

    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <BootstrapContext.Consumer>
        {
          ({
            bootstrap4
          }: any) => (
            // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
            <td className="selection-cell" onClick={ this.handleClick } { ...attrs }>
              {
                selectionRenderer ? selectionRenderer({
                  mode: inputType,
                  checked: selected,
                  disabled,
                  rowIndex,
                  rowKey
                }) : (
                  // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
                  <input
                    type={ inputType }
                    checked={ selected }
                    disabled={ disabled }
                    className={ bootstrap4 ? 'selection-input-4' : '' }
                    onChange={ () => {} }
                  />
                )
              }
            // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
            </td>
          )
        }
      </BootstrapContext.Consumer>
    );
  }
}
