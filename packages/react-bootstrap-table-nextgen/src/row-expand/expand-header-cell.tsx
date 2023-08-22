import React, { Component, ReactNode } from "react";

export interface ExpansionHeaderCellProps {
  isAnyExpands?: boolean;
  onAllRowExpand?: (
    e: React.MouseEvent<HTMLTableHeaderCellElement>,
    expandAll: boolean
  ) => void;
  expandHeaderColumnRenderer?: (args: { isAnyExpands: boolean }) => ReactNode;
}

export default class ExpansionHeaderCell extends Component<ExpansionHeaderCellProps> {
  constructor(props: ExpansionHeaderCellProps) {
    super(props);
    this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
  }

  handleCheckBoxClick(e: React.MouseEvent<HTMLTableHeaderCellElement>) {
    const { isAnyExpands, onAllRowExpand } = this.props;
    onAllRowExpand!(e, !isAnyExpands);
  }

  render() {
    const { isAnyExpands, expandHeaderColumnRenderer } = this.props;
    const attrs = {
      onClick: this.handleCheckBoxClick,
    };

    return (
      <th className="expand-cell-header" data-row-selection {...attrs}>
        {expandHeaderColumnRenderer
          ? expandHeaderColumnRenderer({ isAnyExpands: isAnyExpands ?? false })
          : isAnyExpands
          ? "(-)"
          : "(+)"}
      </th>
    );
  }
}
