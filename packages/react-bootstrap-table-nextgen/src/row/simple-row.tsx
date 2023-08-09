import React, { Component } from "react";

import eventDelegater from "./event-delegater";
import RowPureContent from "./row-pure-content";
import shouldUpdater, { RowProps } from "./should-updater";

class SimpleRow extends shouldUpdater(
  eventDelegater(Component<RowProps>)
) {
  shouldUpdateRowContent = false;

  shouldComponentUpdate(nextProps: RowProps) {
    this.shouldUpdateRowContent = false;
    this.shouldUpdateRowContent = this.shouldRowContentUpdate(nextProps);
    if (this.shouldUpdateRowContent) return true;

    return this.shouldUpdatedBySelfProps(nextProps);
  }

  render() {
    const {
      className,
      style,
      attrs,
      visibleColumnSize,
      tabIndexCell,
      ...rest
    } = this.props;
    const trAttrs = this.delegate(attrs);
    const tabIndexStart = this.props.rowIndex! * visibleColumnSize! + 1;

    return (
      <tr style={style} className={className} {...trAttrs}>
        <RowPureContent
          shouldUpdate={this.shouldUpdateRowContent}
          tabIndexStart={tabIndexCell ? tabIndexStart : -1}
          {...rest}
        />
      </tr>
    );
  }
}

// SimpleRow.propTypes = {
//   row: PropTypes.object.isRequired,
//   rowIndex: PropTypes.number.isRequired,
//   columns: PropTypes.array.isRequired,
//   style: PropTypes.object,
//   className: PropTypes.string,
//   attrs: PropTypes.object,
//   visibleColumnSize: PropTypes.number.isRequired,
//   tabIndexCell: PropTypes.bool.isRequired,
//   editable: PropTypes.bool,
// };

// SimpleRow.defaultProps = {
//   editable: true,
//   style: {},
//   className: null,
//   attrs: {},
// };

export default SimpleRow;
