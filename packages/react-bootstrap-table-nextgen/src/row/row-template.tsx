import React from "react";

import Const from "../const";

export interface SelectRow {
  hideSelectColumn: boolean;
  selectColumnPosition: string;
}

export interface ExpandRow {
  showExpandColumn: boolean;
  expandColumnPosition: string;
}

interface RowTemplateProps {
  renderContent: () => any;
  cellEl: string;
  selectRow?: SelectRow;
  expandRow?: ExpandRow;
  [key: string]: any; // For any other props you might have
}

const RowTemplate: React.FC<RowTemplateProps> = (props) => {
  const { renderContent, selectRow, expandRow, cellEl, ...rest } = props;

  const isRenderFunctionColumnInLeft = (
    position: string = Const.INDICATOR_POSITION_LEFT
  ): boolean => position === Const.INDICATOR_POSITION_LEFT;

  const childrens = renderContent() || [];

  if (selectRow && selectRow.hideSelectColumn !== true) {
    if (isRenderFunctionColumnInLeft(selectRow.selectColumnPosition)) {
      childrens.unshift(React.createElement(cellEl, { key: "selection" }));
    } else {
      childrens.push(React.createElement(cellEl, { key: "selection" }));
    }
  }

  if (expandRow && expandRow.showExpandColumn) {
    if (isRenderFunctionColumnInLeft(expandRow.expandColumnPosition)) {
      childrens.unshift(React.createElement(cellEl, { key: "expansion" }));
    } else {
      childrens.push(React.createElement(cellEl, { key: "expansion" }));
    }
  }

  return <tr { ...rest }>{childrens}</tr>;
};

// RowTemplate.propTypes = {
//   renderContent: PropTypes.func.isRequired,
//   cellEl: PropTypes.string.isRequired,
//   selectRow: PropTypes.object,
//   expandRow: PropTypes.object
// };

export default RowTemplate;
