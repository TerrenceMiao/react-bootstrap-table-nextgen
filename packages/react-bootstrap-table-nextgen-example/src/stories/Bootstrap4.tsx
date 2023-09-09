/* eslint-disable import/no-anonymous-default-export */
import React from "react";

import BootstrapTable from "../../../react-bootstrap-table-nextgen";
import ToolkitProvider, {
  CSVExport,
  ColumnToggle,
  Search,
} from "../../../react-bootstrap-table-nextgen-toolkit";
import Code from "../components/common/code-block";

import "../../../react-bootstrap-table-nextgen-filter/style/react-bootstrap-table-nextgen-filter.scss";
import "../../../react-bootstrap-table-nextgen-paginator/style/react-bootstrap-table-nextgen-paginator.scss";
import "../../../react-bootstrap-table-nextgen-toolkit/style/react-bootstrap-table-nextgen-toolkit.scss";
import "../../../react-bootstrap-table-nextgen/style/react-bootstrap-table-nextgen.scss";
import "./stylesheet/storybook.scss";
import "./stylesheet/tomorrow.min.css";

export default ({
  mode,
  data,
  columns,
  sourceCode,
  defaultSorted,
  selectRow,
  pagination,
}) => {
  switch (mode) {
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
            bootstrap4
            keyField="id"
            data={data}
            caption="Plain text header"
            columns={columns}
          />
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={data}
            caption={<Caption />}
            columns={columns}
          />
          <Code>{sourceCode}</Code>
        </div>
      );
    case "toggle":
      const { ToggleList } = ColumnToggle;
      return (
        <div>
          <ToolkitProvider
            keyField="id"
            data={data}
            columns={columns}
            columnToggle
          >
            {(props) => (
              <div>
                <ToggleList {...props.columnToggleProps} />
                <hr />
                <BootstrapTable {...props.baseProps} />
              </div>
            )}
          </ToolkitProvider>
          <Code>{sourceCode}</Code>
        </div>
      );
    case "toolkits":
      const { SearchBar, ClearSearchButton } = Search;
      const { ExportCSVButton } = CSVExport;
      return (
        <div>
          <ToolkitProvider keyField="id" data={data} columns={columns} search>
            {(props) => (
              <div>
                <h3>Input something at below input field:</h3>
                <SearchBar {...props.searchProps} />
                <ClearSearchButton {...props.searchProps} />
                <hr />
                <BootstrapTable {...props.baseProps} />
                <ExportCSVButton {...props.csvProps}>
                  Export CSV!!
                </ExportCSVButton>
              </div>
            )}
          </ToolkitProvider>
          <Code>{sourceCode}</Code>
        </div>
      );
    default:
      return (
        <div>
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={data}
            columns={columns}
            defaultSorted={defaultSorted}
            selectRow={selectRow}
            pagination={pagination}
          />
          <Code>{sourceCode}</Code>
        </div>
      );
  }
};
