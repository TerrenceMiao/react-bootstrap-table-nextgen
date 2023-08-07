/* eslint react/require-default-props: 0 */
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component } from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';
import Const from '../const';
import { BootstrapContext } from '../contexts/bootstrap';
import _ from '../utils';

export const CheckBox = ({
  className,
  checked,
  indeterminate
}: any) => (
  // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
  <input
    type="checkbox"
    checked={ checked }
    className={ className }
    ref={ (input: any) => {
      if (input) input.indeterminate = indeterminate; // eslint-disable-line no-param-reassign
    } }
    onChange={ () => {} }
  />
);

CheckBox.propTypes = {
  checked: PropTypes.bool.isRequired,
  indeterminate: PropTypes.bool.isRequired,
  className: PropTypes.string
};

export default class SelectionHeaderCell extends Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    checkedStatus: PropTypes.string,
    onAllRowsSelect: PropTypes.func,
    hideSelectAll: PropTypes.bool,
    selectionHeaderRenderer: PropTypes.func,
    headerColumnStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
  };

  props: any;

  constructor() {
    super();
    this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
  }

  /**
   * avoid updating if button is
   * 1. radio
   * 2. status was not changed.
   */
  shouldComponentUpdate(nextProps: any) {
    const { ROW_SELECT_SINGLE } = Const;
    const { mode, checkedStatus } = this.props;

    if (mode === ROW_SELECT_SINGLE) return false;

    return nextProps.checkedStatus !== checkedStatus;
  }

  handleCheckBoxClick(e: any) {
    const { onAllRowsSelect, checkedStatus } = this.props;
    const isUnSelect =
      checkedStatus === Const.CHECKBOX_STATUS_CHECKED ||
      checkedStatus === Const.CHECKBOX_STATUS_INDETERMINATE;

    onAllRowsSelect(e, isUnSelect);
  }

  render() {
    const {
      CHECKBOX_STATUS_CHECKED, CHECKBOX_STATUS_INDETERMINATE, ROW_SELECT_MULTIPLE
    } = Const;

    const {
      mode,
      checkedStatus,
      selectionHeaderRenderer,
      hideSelectAll,
      headerColumnStyle
    } = this.props;
    if (hideSelectAll) {
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      return <th data-row-selection />;
    }

    const checked = checkedStatus === CHECKBOX_STATUS_CHECKED;

    const indeterminate = checkedStatus === CHECKBOX_STATUS_INDETERMINATE;

    const attrs = {};
    let content: any;
    if (selectionHeaderRenderer || mode === ROW_SELECT_MULTIPLE) {
      // @ts-expect-error TS(2339): Property 'onClick' does not exist on type '{}'.
      attrs.onClick = this.handleCheckBoxClick;
    }

    // @ts-expect-error TS(2339): Property 'style' does not exist on type '{}'.
    attrs.style = _.isFunction(headerColumnStyle) ?
      headerColumnStyle(checkedStatus) :
      headerColumnStyle;

    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <BootstrapContext.Consumer>
        {
          ({
            bootstrap4
          }: any) => {
            if (selectionHeaderRenderer) {
              content = selectionHeaderRenderer({
                mode,
                checked,
                indeterminate
              });
            } else if (mode === ROW_SELECT_MULTIPLE) {
              content = (
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <CheckBox
                  { ...this.props }
                  checked={ checked }
                  className={ bootstrap4 ? 'selection-input-4' : '' }
                  indeterminate={ indeterminate }
                />
              );
            }
            return (
              // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
              <th className="selection-cell-header" data-row-selection { ...attrs }>{ content }</th>
            );
          }
        }
      </BootstrapContext.Consumer>
    );
  }
}
