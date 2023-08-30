/* eslint react/prop-types: 0 */
/* eslint react/require-default-props: 0 */
/* eslint no-lonely-if: 0 */
import PropTypes from "prop-types";
import React from "react";

import { PaginationDataProviderProps } from "..";
import Const from "./const";
import { alignPage, getByCurrPage } from "./page";
import Pagination from "./pagination";
import createBaseContext from "./state-context";

const { Provider } = createBaseContext();

const PaginationDataContext = React.createContext<any>(null);

class PaginationDataProvider extends Provider {
  static propTypes = {
    data: PropTypes.array.isRequired,
    remoteEmitter: PropTypes.object.isRequired,
    isRemotePagination: PropTypes.func.isRequired,
  };

  currPage: any;
  setRemoteEmitter: any;

  // eslint-disable-next-line camelcase, react/sort-comp
  componentDidUpdate(nextProps: PaginationDataProviderProps) {
    super.componentDidUpdate(nextProps);
    const { currSizePerPage } = this;
    const { custom, onPageChange } = nextProps.pagination.options;

    const pageStartIndex =
      typeof nextProps.pagination.options.pageStartIndex !== "undefined"
        ? nextProps.pagination.options.pageStartIndex
        : Const.PAGE_START_INDEX;

    // user should align the page when the page is not fit to the data size when remote enable
    if (!this.isRemotePagination() && !custom) {
      const newPage = alignPage(
        nextProps.data.length,
        this.props.data.length,
        this.currPage,
        currSizePerPage,
        pageStartIndex
      );

      if (this.currPage !== newPage) {
        if (onPageChange) {
          onPageChange(newPage, currSizePerPage);
        }
        this.currPage = newPage;
      }
    }
    if (
      nextProps.onDataSizeChange &&
      nextProps.data.length !== this.props.data.length
    ) {
      nextProps.onDataSizeChange({ dataSize: nextProps.data.length });
    }
  }

  isRemotePagination = () => this.props.isRemotePagination();

  renderDefaultPagination = () => {
    if (!this.props.pagination!.options!.custom) {
      const {
        page: currPage,
        sizePerPage: currSizePerPage,
        dataSize,
        ...rest
      } = this.getPaginationProps();
      return (
        <Pagination
          {...rest}
          key="pagination"
          dataSize={dataSize || this.props.data.length}
          currPage={currPage}
          currSizePerPage={currSizePerPage}
        />
      );
    }
    return null;
  };

  render() {
    let { data } = this.props;
    const options = this.props.pagination!.options!;
    const { currPage, currSizePerPage } = this;
    const pageStartIndex =
      typeof options.pageStartIndex === "undefined"
        ? Const.PAGE_START_INDEX
        : options.pageStartIndex;

    data = this.isRemotePagination()
      ? data
      : getByCurrPage(data, currPage, currSizePerPage, pageStartIndex);

    return (
      <PaginationDataContext.Provider
        value={{ data, setRemoteEmitter: this.setRemoteEmitter }}
      >
        {this.props.children}
        {this.renderDefaultPagination()}
      </PaginationDataContext.Provider>
    );
  }
}

export default () => ({
  Provider: PaginationDataProvider,
  Consumer: PaginationDataContext.Consumer,
});
