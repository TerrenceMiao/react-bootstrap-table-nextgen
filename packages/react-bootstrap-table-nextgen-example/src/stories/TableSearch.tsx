/* eslint-disable import/no-anonymous-default-export */
import React from "react";

import BootstrapTable from "../../../react-bootstrap-table-nextgen";
import ToolkitProvider, {
  Search,
} from "../../../react-bootstrap-table-nextgen-toolkit";
import Code from "../components/common/code-block";

import "../../../react-bootstrap-table-nextgen-filter/style/react-bootstrap-table-nextgen-filter.scss";
import "../../../react-bootstrap-table-nextgen-paginator/style/react-bootstrap-table-nextgen-paginator.scss";
import "../../../react-bootstrap-table-nextgen-toolkit/style/react-bootstrap-table-nextgen-toolkit.scss";
import "../../../react-bootstrap-table-nextgen/style/react-bootstrap-table-nextgen.scss";
import "./stylesheet/storybook.scss";
import "./stylesheet/tomorrow.min.css";

const { SearchBar, ClearSearchButton } = Search;

export default ({ mode, data, columns, sourceCode, header }) => {
  switch (mode) {
    case "function":
      // Implement startWith instead of contain
      function customMatchFunc({ searchText, value, column, row }) {
        if (typeof value !== "undefined") {
          return `${value}`.toLowerCase().startsWith(searchText.toLowerCase());
        }
        return false;
      }
      return (
        <div>
          <h1>
            Custom a search match function by startWith instead of contain
          </h1>
          <ToolkitProvider
            keyField="id"
            data={data}
            columns={columns}
            search={{ onColumnMatch: customMatchFunc }}
          >
            {(props) => (
              <div>
                {header}
                <SearchBar {...props.searchProps} />
                <hr />
                <BootstrapTable {...props.baseProps} />
              </div>
            )}
          </ToolkitProvider>
          <Code>{sourceCode}</Code>
        </div>
      );
    case "formatted":
      return (
        <div>
          <ToolkitProvider
            keyField="id"
            data={data}
            columns={columns}
            search={{ searchFormatted: true }}
          >
            {(props) => (
              <div>
                {header}
                <SearchBar {...props.searchProps} />
                <hr />
                <BootstrapTable {...props.baseProps} />
              </div>
            )}
          </ToolkitProvider>
          <Code>{sourceCode}</Code>
        </div>
      );
    case "fully":
      const MySearch = (props: any) => {
        let input: any;
        const handleClick = () => {
          props.onSearch(input.value);
        };
        return (
          <div>
            <input
              className="form-control"
              style={{ backgroundColor: "pink" }}
              ref={(n) => (input = n)}
              type="text"
            />
            <button className="btn btn-warning" onClick={handleClick}>
              Click to Search!!
            </button>
          </div>
        );
      };
      return (
        <div>
          <ToolkitProvider keyField="id" data={data} columns={columns} search>
            {(props) => (
              <div>
                <BootstrapTable {...props.baseProps} />
                <MySearch {...props.searchProps} />
                <br />
              </div>
            )}
          </ToolkitProvider>
          <Code>{sourceCode}</Code>
        </div>
      );
    case "hooks":
      const afterSearch = (newResult: any) => {
        console.log(newResult); // eslint-disable-line no-console
      };
      return (
        <div>
          <ToolkitProvider
            keyField="id"
            data={data}
            columns={columns}
            search={{ afterSearch }}
          >
            {(props) => (
              <div>
                {header}
                <SearchBar {...props.searchProps} />
                <hr />
                <BootstrapTable {...props.baseProps} />
              </div>
            )}
          </ToolkitProvider>
          <Code>{sourceCode}</Code>
        </div>
      );
    case "custom":
      return (
        <div>
          <ToolkitProvider keyField="id" data={data} columns={columns} search>
            {(props) => (
              <div>
                {header}
                <SearchBar
                  {...props.searchProps}
                  className="custome-search-field"
                  style={{ color: "white" }}
                  delay={1000}
                  placeholder="Search Something!!!"
                />
                <hr />
                <BootstrapTable {...props.baseProps} />
              </div>
            )}
          </ToolkitProvider>
          <Code>{sourceCode}</Code>
        </div>
      );
    case "default":
      return (
        <div>
          <ToolkitProvider
            keyField="id"
            data={data}
            columns={columns}
            search={{ defaultSearch: "2101" }}
          >
            {(props) => (
              <div>
                {header}
                <SearchBar {...props.searchProps} />
                <hr />
                <BootstrapTable {...props.baseProps} />
              </div>
            )}
          </ToolkitProvider>
          <Code>{sourceCode}</Code>
        </div>
      );
    case "clear":
      return (
        <div>
          <ToolkitProvider keyField="id" data={data} columns={columns} search>
            {(props) => (
              <div>
                {header}
                <SearchBar {...props.searchProps} />
                <ClearSearchButton {...props.searchProps} />
                <hr />
                <BootstrapTable {...props.baseProps} />
              </div>
            )}
          </ToolkitProvider>
          <Code>{sourceCode}</Code>
        </div>
      );
    default:
      return (
        <div>
          <ToolkitProvider keyField="id" data={data} columns={columns} search>
            {(props) => (
              <div>
                {header}
                <SearchBar {...props.searchProps} />
                <hr />
                <BootstrapTable {...props.baseProps} />
              </div>
            )}
          </ToolkitProvider>
          <Code>{sourceCode}</Code>
        </div>
      );
  }
};
