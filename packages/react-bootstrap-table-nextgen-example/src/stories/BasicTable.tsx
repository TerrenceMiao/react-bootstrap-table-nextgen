/* eslint-disable import/no-anonymous-default-export */
import React from "react";

import Code from "../components/common/code-block";
import BootstrapTable from "../../../react-bootstrap-table-nextgen";
import filterFactory from "../../../react-bootstrap-table-nextgen-filter";
import paginationFactory from "../../../react-bootstrap-table-nextgen-paginator";

import "./stylesheet/storybook.scss";
import "./stylesheet/tomorrow.min.css";
import "../../../react-bootstrap-table-nextgen-filter/style/react-bootstrap-table-nextgen-filter.scss";
import "../../../react-bootstrap-table-nextgen-paginator/style/react-bootstrap-table-nextgen-paginator.scss";
import "../../../react-bootstrap-table-nextgen-toolkit/style/react-bootstrap-table-nextgen-toolkit.scss";
import "../../../react-bootstrap-table-nextgen/style/react-bootstrap-table-nextgen.scss";

export default ({
  mode,
  id,
  classes,
  headerWrapperClasses,
  bodyClasses,
  wrapperClasses,
  data,
  caption,
  columns,
  selectRow,
  expandRow,
  sourceCode,
  striped,
  hover,
  condensed,
  bordered,
  noDataIndication,
  tabIndexCell,
}) => {
  switch (mode) {
    case "idAndClass":
      return (
        <div>
          <h4> Customized table ID </h4>
          <BootstrapTable id={id} keyField="id" data={data} columns={columns} />

          <h4> Customized table className </h4>
          <BootstrapTable
            classes={classes}
            keyField="id"
            data={data}
            columns={columns}
          />

          <h4> Customized thead className </h4>
          <BootstrapTable
            headerWrapperClasses={headerWrapperClasses}
            keyField="id"
            data={data}
            columns={columns}
          />

          <h4> Customized tbody className </h4>
          <BootstrapTable
            bodyClasses={bodyClasses}
            keyField="id"
            data={data}
            columns={columns}
          />

          <h4> Customized wrapper className </h4>
          <BootstrapTable
            wrapperClasses={wrapperClasses}
            keyField="id"
            data={data}
            columns={columns}
          />
          <Code>{sourceCode}</Code>
        </div>
      );
    case "caption":
      const Caption = () => (
        <h3
          style={{
            borderRadius: "0.25em",
            textAlign: "center",
            color: "purple",
            border: "1px solid purple",
            padding: "0.5em",
          }}
        >
          Component as Header
        </h3>
      );
      return (
        <div>
          <BootstrapTable
            keyField="id"
            data={data}
            caption="Plain text header"
            columns={columns}
          />
          <BootstrapTable
            keyField="id"
            data={data}
            caption={<Caption />}
            columns={columns}
          />
          <Code>{sourceCode}</Code>
        </div>
      );
    case "exposedAPI":
      const handleGetCurrentData = () => {
        // console.log(this.node.table.props.data);
      };

      const handleGetSelectedData = () => {
        // console.log(this.node.selectionContext.selected);
      };

      const handleGetExpandedData = () => {
        // console.log(this.node.rowExpandContext.state.expanded);
      };

      const handleGetCurrentPage = () => {
        // console.log(this.node.paginationContext.currPage);
      };

      const handleGetCurrentSizePerPage = () => {
        // console.log(this.node.paginationContext.currSizePerPage);
      };

      const handleGetCurrentSortColumn = () => {
        // console.log(this.node.sortContext.state.sortColumn);
      };

      const handleGetCurrentSortOrder = () => {
        // console.log(this.node.sortContext.state.sortOrder);
      };

      const handleGetCurrentFilter = () => {
        // console.log(this.node.filterContext.currFilters);
      };

      return (
        <div>
          <button className="btn btn-default" onClick={handleGetCurrentData}>
            Get Current Display Rows
          </button>
          <button className="btn btn-default" onClick={handleGetSelectedData}>
            Get Current Selected Rows
          </button>
          <button className="btn btn-default" onClick={handleGetExpandedData}>
            Get Current Expanded Rows
          </button>
          <button className="btn btn-default" onClick={handleGetCurrentPage}>
            Get Current Page
          </button>
          <button
            className="btn btn-default"
            onClick={handleGetCurrentSizePerPage}
          >
            Get Current Size Per Page
          </button>
          <button
            className="btn btn-default"
            onClick={handleGetCurrentSortColumn}
          >
            Get Current Sort Column
          </button>
          <button
            className="btn btn-default"
            onClick={handleGetCurrentSortOrder}
          >
            Get Current Sort Order
          </button>
          <button className="btn btn-default" onClick={handleGetCurrentFilter}>
            Get Current Filter Information
          </button>
          <BootstrapTable
            // ref={(n) => (this.node = n)}
            keyField="id"
            data={data}
            caption="Plain text header"
            columns={columns}
            filter={filterFactory()}
            pagination={paginationFactory()}
            selectRow={selectRow}
            expandRow={expandRow}
          />
          <Code>{sourceCode}</Code>
        </div>
      );
    default:
      return (
        <div>
          <BootstrapTable
            id={id}
            classes={classes}
            headerWrapperClasses={headerWrapperClasses}
            bodyClasses={bodyClasses}
            wrapperClasses={wrapperClasses}
            keyField="id"
            data={data}
            caption={caption}
            columns={columns}
            selectRow={selectRow}
            expandRow={expandRow}
            striped={striped}
            hover={hover}
            condensed={condensed}
            bordered={bordered}
            noDataIndication={noDataIndication}
            tabIndexCell={tabIndexCell}
          />
          <Code>{sourceCode}</Code>
        </div>
      );
  }
};
