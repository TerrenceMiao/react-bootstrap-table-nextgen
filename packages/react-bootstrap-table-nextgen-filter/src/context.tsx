/* eslint react/prop-types: 0 */
/* eslint react/require-default-props: 0 */
/* eslint camelcase: 0 */
import PropTypes from "prop-types";
import React from "react";

import { EQ, FILTER_TYPES, LIKE } from "..";
import { filters } from "./filter";

export interface FilterProviderProps {
  data: any[];
  columns: any[];
  dataChangeListener?: any;
  filter: any;
  children: any;
}

export default (
  _: any,
  isRemoteFiltering: () => boolean,
  handleFilterChange: (filters: any) => void
) => {
  const FilterContext = React.createContext<any>({});

  class FilterProvider extends React.Component<FilterProviderProps> {
    static propTypes = {
      data: PropTypes.array.isRequired,
      columns: PropTypes.array.isRequired,
      dataChangeListener: PropTypes.object,
    };

    currFilters: { [key: string]: any };
    clearFilters: { [key: string]: any };
    data: any[];
    isEmitDataChange: boolean;

    constructor(props: FilterProviderProps) {
      super(props);
      this.currFilters = {};
      this.clearFilters = {};
      this.onFilter = this.onFilter.bind(this);
      this.doFilter = this.doFilter.bind(this);
      this.onExternalFilter = this.onExternalFilter.bind(this);
      this.data = props.data;
      this.isEmitDataChange = false;
    }

    componentDidMount() {
      if (isRemoteFiltering() && Object.keys(this.currFilters).length > 0) {
        handleFilterChange(this.currFilters);
      }
    }

    onFilter(column: any, filterType: any, initialize = false) {
      return (filterVal: any) => {
        // watch out here if migration to context API, #334
        const currFilters = Object.assign({}, this.currFilters);
        this.clearFilters = {};
        const { dataField, filter } = column;

        const needClearFilters =
          !_.isDefined(filterVal) || filterVal === "" || filterVal.length === 0;

        if (needClearFilters) {
          delete currFilters[dataField];
          this.clearFilters = { [dataField]: { clear: true, filterVal } };
        } else {
          // select default comparator is EQ, others are LIKE
          const {
            comparator = filterType === FILTER_TYPES.SELECT ? EQ : LIKE,
            caseSensitive = false,
          } = filter.props;
          currFilters[dataField] = {
            filterVal,
            filterType,
            comparator,
            caseSensitive,
          };
        }

        this.currFilters = currFilters;

        if (isRemoteFiltering()) {
          if (!initialize) {
            handleFilterChange(this.currFilters);
          }
          return;
        }
        this.doFilter(this.props);
      };
    }

    onExternalFilter(column: any, filterType: any) {
      return (value: any) => {
        this.onFilter(column, filterType)(value);
      };
    }

    getFiltered() {
      return this.data;
    }

    shouldComponentUpdate(
      nextProps: Readonly<FilterProviderProps>,
      nextState: Readonly<{}>,
      nextContext: any
    ): boolean {
      if (!isRemoteFiltering() && !_.isEqual(nextProps.data, this.data)) {
        this.doFilter(nextProps, this.isEmitDataChange);
      } else {
        this.data = nextProps.data;
      }
      return true;
    }

    doFilter(props: FilterProviderProps, ignoreEmitDataChange = false) {
      const { dataChangeListener, data, columns, filter } = props;
      const result = filters(
        data,
        columns,
        _
      )(this.currFilters, this.clearFilters);
      if (filter.afterFilter) {
        filter.afterFilter(result, this.currFilters);
      }
      this.data = result;
      if (dataChangeListener && !ignoreEmitDataChange) {
        this.isEmitDataChange = true;
        dataChangeListener.emit("filterChanged", result.length);
      } else {
        this.isEmitDataChange = false;
        this.forceUpdate();
      }
    }

    render() {
      return (
        <FilterContext.Provider
          value={{
            data: this.data,
            onFilter: this.onFilter,
            onExternalFilter: this.onExternalFilter,
            currFilters: this.currFilters,
          }}
        >
          {this.props.children}
        </FilterContext.Provider>
      );
    }
  }

  return {
    Provider: FilterProvider,
    Consumer: FilterContext.Consumer,
  };
};
