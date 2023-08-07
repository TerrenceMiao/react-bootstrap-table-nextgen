// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';

const RowSection = ({
  content,
  colSpan
}: any) => (
  // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
  <tr>
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <td
      data-toggle="collapse"
      colSpan={ colSpan }
      className="react-bs-table-no-data"
    >
      { content }
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    </td>
  // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
  </tr>
);

RowSection.propTypes = {
  content: PropTypes.any,
  colSpan: PropTypes.number
};

RowSection.defaultProps = {
  content: null,
  colSpan: 1
};

export default RowSection;
