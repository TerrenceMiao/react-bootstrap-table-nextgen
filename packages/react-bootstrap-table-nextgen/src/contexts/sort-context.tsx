/* eslint camelcase: 0 */
/* eslint react/require-default-props: 0 */
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';
import Const from '../const';

export default (
  dataOperator: any,
  isRemoteSort: any,
  handleSortChange: any
) => {
  const SortContext = React.createContext();

  class SortProvider extends React.Component {
    static propTypes = {
      data: PropTypes.array.isRequired,
      columns: PropTypes.array.isRequired,
      children: PropTypes.node.isRequired,
      defaultSorted: PropTypes.arrayOf(PropTypes.shape({
        dataField: PropTypes.string.isRequired,
        order: PropTypes.oneOf([Const.SORT_DESC, Const.SORT_ASC]).isRequired
      })),
      sort: PropTypes.shape({
        dataField: PropTypes.string,
        order: PropTypes.oneOf([Const.SORT_DESC, Const.SORT_ASC]),
        sortFunc: PropTypes.func
      }),
      defaultSortDirection: PropTypes.oneOf([Const.SORT_DESC, Const.SORT_ASC])
    }

    props: any;
    setState: any;
    state: any;

    constructor(props: any) {
      super(props);
      let sortOrder;
      let sortColumn;
      const { defaultSorted, defaultSortDirection, sort } = props;

      if (defaultSorted && defaultSorted.length > 0) {
        sortOrder = defaultSorted[0].order || defaultSortDirection;
        sortColumn = this.initSort(defaultSorted[0].dataField, sortOrder);
      } else if (sort && sort.dataField && sort.order) {
        sortOrder = sort.order;
        sortColumn = this.initSort(sort.dataField, sortOrder);
      }
      this.state = { sortOrder, sortColumn };
    }

    componentDidMount() {
      const { sortOrder, sortColumn } = this.state;
      if (isRemoteSort() && sortOrder && sortColumn) {
        handleSortChange(sortColumn.dataField, sortOrder);
      }
    }

    UNSAFE_componentWillReceiveProps(nextProps: any) {
      const { sort, columns } = nextProps;
      if (sort && sort.dataField && sort.order) {
        this.setState({
          sortOrder: sort.order,
          sortColumn: columns.find((col: any) => col.dataField === sort.dataField)
        });
      }
    }

    initSort(sortField: any, sortOrder: any) {
      let sortColumn;
      const { columns } = this.props;
      const sortColumns = columns.filter((col: any) => col.dataField === sortField);
      if (sortColumns.length > 0) {
        sortColumn = sortColumns[0];

        if (sortColumn.onSort) {
          sortColumn.onSort(sortField, sortOrder);
        }
      }
      return sortColumn;
    }

    handleSort = (column: any) => {
      const sortOrder = dataOperator.nextOrder(column, this.state, this.props.defaultSortDirection);

      if (column.onSort) {
        column.onSort(column.dataField, sortOrder);
      }

      if (isRemoteSort()) {
        handleSortChange(column.dataField, sortOrder);
      }
      this.setState(() => ({
        sortOrder,
        sortColumn: column
      }));
    }

    render() {
      let { data } = this.props;
      const { sort } = this.props;
      const { sortOrder, sortColumn } = this.state;
      if (!isRemoteSort() && sortColumn) {
        const sortFunc = sortColumn.sortFunc ? sortColumn.sortFunc : (sort && sort.sortFunc);
        data = dataOperator.sort(data, sortOrder, { ...sortColumn, sortFunc });
      }

      return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <SortContext.Provider
          value={ {
            data,
            sortOrder,
            onSort: this.handleSort,
            sortField: sortColumn ? sortColumn.dataField : null
          } }
        >
          { this.props.children }
        </SortContext.Provider>
      );
    }
  }
  return {
    Provider: SortProvider,
    Consumer: SortContext.Consumer
  };
};
