/* eslint-disable import/no-anonymous-default-export */
import React from "react";

import BootstrapTable from "../../../react-bootstrap-table-nextgen";
import filterFactory from "../../../react-bootstrap-table-nextgen-filter";
import ToolkitProvider, {
  ColumnToggle,
} from "../../../react-bootstrap-table-nextgen-toolkit";
import Code from "../components/common/code-block";

import "../../../react-bootstrap-table-nextgen-filter/style/react-bootstrap-table-nextgen-filter.scss";
import "../../../react-bootstrap-table-nextgen-paginator/style/react-bootstrap-table-nextgen-paginator.scss";
import "../../../react-bootstrap-table-nextgen-toolkit/style/react-bootstrap-table-nextgen-toolkit.scss";
import "../../../react-bootstrap-table-nextgen/style/react-bootstrap-table-nextgen.scss";
import "./stylesheet/storybook.scss";
import "./stylesheet/tomorrow.min.css";

const { ToggleList } = ColumnToggle;

export default ({ mode, data, columns, sourceCode }) => {
  switch (mode) {
    case "filter":
      return (
        <div>
          <h3>Table will keep the filter/sort state when column toggle</h3>
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
                <BootstrapTable {...props.baseProps} filter={filterFactory()} />
              </div>
            )}
          </ToolkitProvider>
          <Code>{sourceCode}</Code>
        </div>
      );
    case "custom":
      const CustomToggleList = ({ columns, onColumnToggle, toggles }) => (
        <div
          className="btn-group btn-group-toggle btn-group-vertical"
          data-toggle="buttons"
        >
          {columns
            .map((column: any) => ({
              ...column,
              toggle: toggles[column.dataField],
            }))
            .map((column) => (
              <button
                type="button"
                key={column.dataField}
                className={`btn btn-warning ${column.toggle ? "active" : ""}`}
                data-toggle="button"
                aria-pressed={column.toggle ? "true" : "false"}
                onClick={() => onColumnToggle(column.dataField)}
              >
                {column.text}
              </button>
            ))}
        </div>
      );
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
                <CustomToggleList {...props.columnToggleProps} />
                <hr />
                <BootstrapTable {...props.baseProps} />
              </div>
            )}
          </ToolkitProvider>
          <Code>{sourceCode}</Code>
        </div>
      );
    case "styling":
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
                <ToggleList
                  contextual="success"
                  className="list-custom-class"
                  btnClassName="list-btn-custom-class"
                  {...props.columnToggleProps}
                />
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
  }
};
