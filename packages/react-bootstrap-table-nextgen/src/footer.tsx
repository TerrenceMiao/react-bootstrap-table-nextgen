/* eslint react/require-default-props: 0 */
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';

// @ts-expect-error TS(6142): Module './row/row-template' was resolved to '/User... Remove this comment to see the full error message
import RowTemplate from './row/row-template';
import FooterCell from './footer-cell';
import _ from './utils';

const Footer = (props: any) => {
  const { data, className, columns, selectRow, expandRow } = props;

  function renderContent() {
    return columns.map((column: any, i: any) => {
      if (column.footer === undefined || column.footer === null) {
        return false;
      }

      const columnData = _.pluck(data, column.dataField);

      return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <tfoot>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <RowTemplate
        renderContent={ renderContent }
        selectRow={ selectRow }
        expandRow={ expandRow }
        className={ className }
        cellEl="th"
      />
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    </tfoot>
  );
};

Footer.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
  columns: PropTypes.array,
  selectRow: PropTypes.object,
  expandRow: PropTypes.object
};

export default Footer;
