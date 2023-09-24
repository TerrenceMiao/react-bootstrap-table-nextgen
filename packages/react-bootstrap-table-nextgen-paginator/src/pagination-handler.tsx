/* eslint react/prop-types: 0 */
/* eslint camelcase: 0 */
import React, { Component } from "react";

import pageResolver from "./page-resolver";

export default (WrappedComponent: any) =>
  class PaginationHandler extends pageResolver(Component) {
    constructor(props: any) {
      super(props);
      this.handleChangePage = this.handleChangePage.bind(this);
      this.handleChangeSizePerPage = this.handleChangeSizePerPage.bind(this);
      this.state = this.initialState();
    }

    componentDidUpdate(currProps: any) {
      const { currSizePerPage, dataSize, totalSize } = currProps;
      let totalPages = 0;

      if (
        currSizePerPage !== this.props.currSizePerPage ||
        dataSize !== this.props.dataSize ||
        totalSize !== this.props.totalSize
      ) {
        if (currSizePerPage !== this.props.currSizePerPage) {
          totalPages = this.calculateTotalPage(
            this.props.currSizePerPage,
            this.props.totalSize ?? this.props.dataSize
          );
        } else if (dataSize !== this.props.dataSize) {
          totalPages = this.calculateTotalPage(
            this.props.currSizePerPage,
            this.props.dataSize
          );
        } else if (totalSize !== this.props.totalSize) {
          totalPages = this.calculateTotalPage(
            this.props.currSizePerPage,
            this.props.totalSize
          );
        }
      } else {
        totalPages = this.calculateTotalPage(
          this.props.currSizePerPage,
          this.props.dataSize
        );
      }

      const lastPage = this.calculateLastPage(totalPages);

      // @ts-ignore
      if (totalPages !== this.state.totalPages || lastPage !== this.state.lastPage) {
        this.setState({ totalPages, lastPage });
      }
    }

    handleChangeSizePerPage(sizePerPage: any) {
      const { currSizePerPage, onSizePerPageChange } = this.props;
      const selectedSize =
        typeof sizePerPage === "string"
          ? parseInt(sizePerPage, 10)
          : sizePerPage;
      let { currPage } = this.props;
      if (selectedSize !== currSizePerPage) {
        const newTotalPages = this.calculateTotalPage(selectedSize);
        const newLastPage = this.calculateLastPage(newTotalPages);
        if (currPage > newLastPage) currPage = newLastPage;
        onSizePerPageChange(selectedSize, currPage);
      }
    }

    handleChangePage(newPage: any) {
      let page: any;
      const {
        currPage,
        pageStartIndex,
        prePageText,
        nextPageText,
        lastPageText,
        firstPageText,
        onPageChange,
      } = this.props;
      // @ts-ignore
      const { lastPage } = this.state;

      if (newPage === prePageText) {
        page = this.backToPrevPage();
      } else if (newPage === nextPageText) {
        page = currPage + 1 > lastPage ? lastPage : currPage + 1;
      } else if (newPage === lastPageText) {
        page = lastPage;
      } else if (newPage === firstPageText) {
        page = pageStartIndex;
      } else {
        page = parseInt(newPage, 10);
      }
      if (page !== currPage) {
        onPageChange(page);
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          // @ts-ignore
          lastPage={this.state.lastPage}
          // @ts-ignore
          totalPages={this.state.totalPages}
          onPageChange={this.handleChangePage}
          onSizePerPageChange={this.handleChangeSizePerPage}
        />
      );
    }
  };
