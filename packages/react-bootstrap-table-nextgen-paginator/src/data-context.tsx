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
      nextProps.onDataSizeChange({ dataSize: this.props.data.length });
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
    const options = this.props.pagination!.options!;
    const currSizePerPage = options.sizePerPage ?? this.currSizePerPage;
    const pageStartIndex =
      typeof options.pageStartIndex === "undefined"
        ? Const.PAGE_START_INDEX
        : options.pageStartIndex;

    // workaround an issue with currPage is not 1, but data size is less than currSizePerPage
    // when SearchBar input changed, componentDidUpdate in the SAME Toolkit updated (searching the data)
    // secondly after componentDidUpdate (calculating currPage) in this package triggered at first
    let { data } = this.props;
    let currPage = options.page ?? this.currPage;

    if (!this.isRemotePagination() && data.length <= (currPage - 1) * currSizePerPage) {
      const totalPages = Math.floor(data.length / currSizePerPage) + 1;
      currPage = currPage > totalPages ? totalPages : currPage;
      this.currPage = currPage;
    }

    if (this.isRemotePagination()) {
      this.currPage = currPage;
    }

    data = this.isRemotePagination()
      ? data
      : getByCurrPage(data, currPage, currSizePerPage, pageStartIndex);

    return (
      <PaginationDataContext.Provider
        value={{ data, setRemoteEmitter: this.remoteEmitter }}
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
