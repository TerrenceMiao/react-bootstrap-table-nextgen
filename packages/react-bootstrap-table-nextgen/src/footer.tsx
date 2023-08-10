import React, { ReactNode } from "react";

import FooterCell from "./footer-cell";
import RowTemplate, { ExpandRow, SelectRow } from "./row/row-template";
import _ from "./utils";

interface ColumnDefinition {
  dataField: string;
  footer?: string | ((columnData: any[], column: any, index: number) => string);
}

interface FooterProps {
  data?: any[];
  className?: string;
  columns?: ColumnDefinition[];
  selectRow?: SelectRow;
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
          index={ i }
          key={ column.dataField }
          column={ column }
          columnData={ columnData }
        />
      );
    });
  }

  return (
    <tfoot>
      <RowTemplate
        renderContent={ renderContent }
        selectRow={ selectRow }
        expandRow={ expandRow }
        className={ className }
        cellEl="th"
      />
    </tfoot>
  );
};

// Footer.propTypes = {
//   data: PropTypes.array,
//   className: PropTypes.string,
//   columns: PropTypes.array,
//   selectRow: PropTypes.object,
//   expandRow: PropTypes.object,
// };

export default Footer;
