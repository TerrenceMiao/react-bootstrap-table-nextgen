/* eslint react/require-default-props: 0 */
/* eslint arrow-body-style: 0 */
import cs from "classnames";
import React, { Component } from "react";
import Const from "./const";
import pageResolver from "./page-resolver";
import paginationHandler from "./pagination-handler";
import { PaginationListWithAdapter } from "./pagination-list-adapter";
import { PaginationTotalWithAdapter } from "./pagination-total-adapter";
import { SizePerPageDropdownWithAdapter } from "./size-per-page-dropdown-adapter";

class Pagination extends pageResolver(Component) {
  render() {
    const {
      tableId,
      currPage,
      pageStartIndex = Const.PAGE_START_INDEX,
      showTotal = Const.SHOW_TOTAL,
      dataSize,
      pageListRenderer = null,
      pageButtonRenderer = null,
      paginationTotalRenderer = Const.PAGINATION_TOTAL,
      hidePageListOnlyOnePage = Const.HIDE_PAGE_LIST_ONLY_ONE_PAGE,
      totalPages,
      lastPage,
      onPageChange,
      sizePerPageList = Const.SIZE_PER_PAGE_LIST,
      currSizePerPage,
      hideSizePerPage = Const.HIDE_SIZE_PER_PAGE,
      sizePerPageRenderer = null,
      sizePerPageOptionRenderer = null,
      onSizePerPageChange,
      bootstrap4 = false,
      disablePageTitle = false,
      paginationSize = Const.PAGINATION_SIZE,
      withFirstAndLast = Const.With_FIRST_AND_LAST,
      alwaysShowAllBtns = Const.SHOW_ALL_PAGE_BTNS,
      firstPageText = Const.FIRST_PAGE_TEXT,
      prePageText = Const.PRE_PAGE_TEXT,
      nextPageText = Const.NEXT_PAGE_TEXT,
      lastPageText = Const.LAST_PAGE_TEXT,
      nextPageTitle = Const.NEXT_PAGE_TITLE,
      prePageTitle = Const.PRE_PAGE_TITLE,
      firstPageTitle = Const.FIRST_PAGE_TITLE,
      lastPageTitle = Const.LAST_PAGE_TITLE,
      ...rest
    } = this.props;

    const pages = this.calculatePageStatus(
      this.calculatePages(totalPages, lastPage),
      lastPage
    );
    const pageListClass = cs(
      "react-bootstrap-table-pagination-list",
      "col-md-6 col-xs-6 col-sm-6 col-lg-6",
      {
        "react-bootstrap-table-pagination-list-hidden":
          hidePageListOnlyOnePage && totalPages === 1,
      }
    );
    return (
      <div className="row react-bootstrap-table-pagination">
        <div className="col-md-6 col-xs-6 col-sm-6 col-lg-6">
          <SizePerPageDropdownWithAdapter
            bootstrap4={bootstrap4}
            tableId={tableId}
            sizePerPageList={sizePerPageList}
            currSizePerPage={currSizePerPage}
            hideSizePerPage={hideSizePerPage}
            sizePerPageRenderer={sizePerPageRenderer}
            sizePerPageOptionRenderer={sizePerPageOptionRenderer}
            onSizePerPageChange={onSizePerPageChange}
          />
          {showTotal ? (
            <PaginationTotalWithAdapter
              currPage={currPage}
              currSizePerPage={currSizePerPage}
              pageStartIndex={pageStartIndex}
              dataSize={dataSize}
              paginationTotalRenderer={paginationTotalRenderer}
            />
          ) : null}
        </div>
        {pageListRenderer ? (
          pageListRenderer({
            pages,
            onPageChange,
          })
        ) : (
          <div className={pageListClass}>
            <PaginationListWithAdapter
              {...rest}
              currPage={currPage}
              currSizePerPage={currSizePerPage}
              pageStartIndex={pageStartIndex}
              lastPage={lastPage}
              totalPages={totalPages}
              pageButtonRenderer={pageButtonRenderer}
              onPageChange={onPageChange}
              paginationSize={paginationSize}
              withFirstAndLast={withFirstAndLast}
              firstPageText={firstPageText}
              prePageText={prePageText}
              nextPageText={nextPageText}
              lastPageText={lastPageText}
              alwaysShowAllBtns={alwaysShowAllBtns}
            />
          </div>
        )}
      </div>
    );
  }
}

// Pagination.propTypes = {
//   dataSize: PropTypes.number.isRequired,
//   sizePerPageList: PropTypes.array.isRequired,
//   currPage: PropTypes.number.isRequired,
//   currSizePerPage: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
//   onSizePerPageChange: PropTypes.func.isRequired,
//   disablePageTitle: PropTypes.bool,
//   pageStartIndex: PropTypes.number,
//   paginationSize: PropTypes.number,
//   showTotal: PropTypes.bool,
//   pageListRenderer: PropTypes.func,
//   pageButtonRenderer: PropTypes.func,
//   sizePerPageRenderer: PropTypes.func,
//   paginationTotalRenderer: PropTypes.func,
//   sizePerPageOptionRenderer: PropTypes.func,
//   firstPageText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
//   prePageText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
//   nextPageText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
//   lastPageText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
//   nextPageTitle: PropTypes.string,
//   prePageTitle: PropTypes.string,
//   firstPageTitle: PropTypes.string,
//   lastPageTitle: PropTypes.string,
//   withFirstAndLast: PropTypes.bool,
//   alwaysShowAllBtns: PropTypes.bool,
//   hideSizePerPage: PropTypes.bool,
//   hidePageListOnlyOnePage: PropTypes.bool,
//   bootstrap4: PropTypes.bool,
// };

// Pagination.defaultProps = {
//   disablePageTitle: false,
//   bootstrap4: false,
//   pageStartIndex: Const.PAGE_START_INDEX,
//   paginationSize: Const.PAGINATION_SIZE,
//   withFirstAndLast: Const.With_FIRST_AND_LAST,
//   alwaysShowAllBtns: Const.SHOW_ALL_PAGE_BTNS,
//   showTotal: Const.SHOW_TOTAL,
//   pageListRenderer: null,
//   pageButtonRenderer: null,
//   sizePerPageRenderer: null,
//   paginationTotalRenderer: Const.PAGINATION_TOTAL,
//   sizePerPageOptionRenderer: null,
//   firstPageText: Const.FIRST_PAGE_TEXT,
//   prePageText: Const.PRE_PAGE_TEXT,
//   nextPageText: Const.NEXT_PAGE_TEXT,
//   lastPageText: Const.LAST_PAGE_TEXT,
//   sizePerPageList: Const.SIZE_PER_PAGE_LIST,
//   nextPageTitle: Const.NEXT_PAGE_TITLE,
//   prePageTitle: Const.PRE_PAGE_TITLE,
//   firstPageTitle: Const.FIRST_PAGE_TITLE,
//   lastPageTitle: Const.LAST_PAGE_TITLE,
//   hideSizePerPage: Const.HIDE_SIZE_PER_PAGE,
//   hidePageListOnlyOnePage: Const.HIDE_PAGE_LIST_ONLY_ONE_PAGE,
// };

export default paginationHandler(Pagination);
