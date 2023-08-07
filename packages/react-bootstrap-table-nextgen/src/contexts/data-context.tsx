/* eslint camelcase: 0 */
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component } from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';

export default () => {
  const DataContext = React.createContext();

  class DataProvider extends Component {
    static propTypes = {
      data: PropTypes.array.isRequired,
      children: PropTypes.node.isRequired
    }

    props: any;
    setState: any;

    // @ts-expect-error TS(2729): Property 'props' is used before its initialization... Remove this comment to see the full error message
    state = { data: this.props.data };

    getData = (filterProps: any, searchProps: any, sortProps: any, paginationProps: any) => {
      if (paginationProps) return paginationProps.data;
      else if (sortProps) return sortProps.data;
      else if (searchProps) return searchProps.data;
      else if (filterProps) return filterProps.data;
      return this.props.data;
    }

    UNSAFE_componentWillReceiveProps(nextProps: any) {
      this.setState(() => ({ data: nextProps.data }));
    }

    render() {
      return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <DataContext.Provider
          value={ {
            data: this.state.data,
            getData: this.getData
          } }
        >
          { this.props.children }
        </DataContext.Provider>
      );
    }
  }
  return {
    Provider: DataProvider,
    Consumer: DataContext.Consumer
  };
};
