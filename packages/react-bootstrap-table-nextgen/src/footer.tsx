import React, { ReactNode } from "react";

import { ColumnDescription, SelectRowProps } from "..";
import FooterCell from "./footer-cell";
import RowTemplate, { ExpandRow } from "./row/row-template";
import _ from "./utils";

interface FooterProps {
  data?: any[];
  className?: string;
  columns: ColumnDescription[];
  selectRow?: SelectRowProps<any> | undefined;
  expandRow?: ExpandRow;
}

const Footer: React.FC<FooterProps> = (props) => {
  const { data = [], className, columns = [], selectRow, expandRow } = props;

  function renderContent(): ReactNode {
    return columns.map((column, i) => {
      if (column.footer === undefined || column.footer === null) {
        return false;
      }

      const columnData = _.pluck(data, column.dataField);

      return (
        <FooterCell
          index={i}
          key={column.dataField}
          column={column}
          columnData={columnData}
        />
      );
    });
  }

  return (
    <tfoot>
      <RowTemplate
        renderContent={renderContent}
        selectRow={selectRow}
        expandRow={expandRow}
        className={className}
        cellEl="th"
      />
    </tfoot>
  );
};

export default Footer;
