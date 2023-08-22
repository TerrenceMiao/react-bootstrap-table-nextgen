import React, { Component, MouseEvent } from "react";

interface ExpandCellProps {
  rowKey: any;
  expanded: boolean;
  expandable: boolean;
  onRowExpand: (
    rowKey: any,
    expanded: boolean,
    rowIndex: number | undefined,
    e: MouseEvent
  ) => void;
  expandColumnRenderer?: (params: {
    expandable: boolean;
    expanded: boolean;
    rowKey: any;
  }) => React.ReactNode;
  rowIndex?: number;
  tabIndex?: number;
}

export default class ExpandCell extends Component<ExpandCellProps> {
  handleClick = (e: MouseEvent<HTMLTableDataCellElement>) => {
    const { rowKey, expanded, onRowExpand, rowIndex } = this.props;
    e.stopPropagation();
    onRowExpand(rowKey, !expanded, rowIndex, e);
  };

  shouldComponentUpdate(nextProps: ExpandCellProps) {
    const shouldUpdate =
      this.props.rowIndex !== nextProps.rowIndex ||
      this.props.expanded !== nextProps.expanded ||
      this.props.rowKey !== nextProps.rowKey ||
      this.props.tabIndex !== nextProps.tabIndex;

    return shouldUpdate;
  }

  render() {
    const { expanded, expandable, expandColumnRenderer, tabIndex, rowKey } =
      this.props;
    const attrs: { tabIndex?: number } = {};
    if (tabIndex !== undefined && tabIndex !== -1) attrs.tabIndex = tabIndex;

    return (
      <td className="expand-cell" onClick={ this.handleClick } { ...attrs }>
        {expandColumnRenderer
          ? expandColumnRenderer({
            expandable,
            expanded,
            rowKey
          })
          : expandable
            ? expanded
              ? "(-)"
              : "(+)"
            : ""}
      </td>
    );
  }
}
