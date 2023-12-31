import { Component } from "react";

export default (ExtendBase: any) =>
  class ColumnResolver extends Component<typeof ExtendBase> {
    visibleColumnSize(includeSelectColumn = true) {
      let columnLen;
      if (this.props.columnToggle && this.props.columnToggle.toggles) {
        const columns = this.props.columnToggle.toggles;
        columnLen = Object.keys(columns).filter((name) => columns[name]).length;
      } else {
        columnLen = this.props.columns.filter((c: any) => !c.hidden).length;
      }
      if (!includeSelectColumn) return columnLen;
      if (this.props.selectRow && !this.props.selectRow.hideSelectColumn) {
        columnLen += 1;
      }
      if (this.props.expandRow && this.props.expandRow.showExpandColumn) {
        columnLen += 1;
      }
      return columnLen;
    }
  };
