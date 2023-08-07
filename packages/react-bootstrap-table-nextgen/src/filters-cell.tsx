// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';
import _ from './utils';

const FiltersCell = (props: any) => {
  const {
    index, column, onExternalFilter,
    currFilters, onFilter
  } = props;
  const { filterRenderer, filter } = column;
  let filterElm;
  const cellAttrs = {};
  const cellStyle = {};
  // @ts-expect-error TS(2339): Property 'style' does not exist on type '{}'.
  cellAttrs.style = cellStyle;
  if (column.headerAlign) {
    // @ts-expect-error TS(2339): Property 'textAlign' does not exist on type '{}'.
    cellStyle.textAlign = _.isFunction(column.headerAlign)
      ? column.headerAlign(column, index)
      : column.headerAlign;
  }
  if (column.filterRenderer) {
    const onCustomFilter = onExternalFilter(column, filter.props.type);
    filterElm = filterRenderer(onCustomFilter, column);
  } else if (filter) {
    filterElm = (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <filter.Filter
        { ...filter.props }
        filterState={ currFilters[column.dataField] }
        onFilter={ onFilter }
        column={ column }
      />
    );
  }
  return React.createElement('th', cellAttrs, filterElm);
};

FiltersCell.propTypes = {
  index: PropTypes.number.isRequired,
  column: PropTypes.object.isRequired,
  currFilters: PropTypes.object.isRequired,
  onFilter: PropTypes.func,
  onExternalFilter: PropTypes.func
};

FiltersCell.defaultProps = {
  onFilter: () => { },
  onExternalFilter: () => { }
};

export default FiltersCell;
