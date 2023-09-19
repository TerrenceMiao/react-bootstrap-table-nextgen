/* eslint-disable import/no-anonymous-default-export */
import React from "react";

import BootstrapTable from "../../../react-bootstrap-table-nextgen";
import filterFactory from "../../../react-bootstrap-table-nextgen-filter";
import paginationFactory from "../../../react-bootstrap-table-nextgen-paginator";
import ToolkitProvider, {
  CSVExport,
  Search,
} from "../../../react-bootstrap-table-nextgen-toolkit";
import Code from "../components/common/code-block";

import "../../../react-bootstrap-table-nextgen-filter/style/react-bootstrap-table-nextgen-filter.scss";
import "../../../react-bootstrap-table-nextgen-paginator/style/react-bootstrap-table-nextgen-paginator.scss";
import "../../../react-bootstrap-table-nextgen-toolkit/style/react-bootstrap-table-nextgen-toolkit.scss";
import "../../../react-bootstrap-table-nextgen/style/react-bootstrap-table-nextgen.scss";
import { productsGenerator } from "../utils/common";
import "./stylesheet/storybook.scss";
import "./stylesheet/tomorrow.min.css";

const { ExportCSVButton } = CSVExport;
const { SearchBar } = Search;

export default ({ mode, data, data1, data2, columns, sourceCode }) => {
  switch (mode) {
    case "button":
      const MyExportCSVButton = (props: any) => {
        const handleClick = () => {
          props.onExport();
        };
        return (
          <div>
            <button className="btn btn-success" onClick={handleClick}>
              Export to CSV
            </button>
          </div>
        );
      };
      return (
        <div>
          <ToolkitProvider
            keyField="id"
            data={data}
            columns={columns}
            exportCSV
          >
            {(props) => (
              <div>
                <BootstrapTable {...props.baseProps} />
                <hr />
                <MyExportCSVButton {...props.csvProps} />
              </div>
            )}
          </ToolkitProvider>
          <Code>{sourceCode}</Code>
        </div>
      );
    case "custom":
      const products = productsGenerator();
      const MyExportCSVData = (props: any) => {
        const handleClick = () => {
          // passing my custom data
          props.onExport(products.filter((r: any) => r.id > 2));
        };
        return (
          <div>
            <button className="btn btn-success" onClick={handleClick}>
              Only export Product ID bigger than 2
            </button>
          </div>
        );
      };
      return (
        <div>
          <ToolkitProvider
            keyField="id"
            data={products}
            columns={columns}
            exportCSV
          >
            {(props) => (
              <div>
                <BootstrapTable {...props.baseProps} />
                <hr />
                <MyExportCSVData {...props.csvProps} />
              </div>
            )}
          </ToolkitProvider>
          <Code>{sourceCode}</Code>
        </div>
      );
    case "filtered":
      return (
        <div>
          <h3>Export all the filtered/searched rows</h3>
          <ToolkitProvider
            keyField="id"
            data={data}
            columns={columns}
            exportCSV={{ onlyExportFiltered: true, exportAll: false }}
            search
          >
            {(props) => (
              <div>
                <ExportCSVButton {...props.csvProps}>
                  Export CSV!!
                </ExportCSVButton>
                <hr />
                <SearchBar {...props.searchProps} />
                <BootstrapTable
                  {...props.baseProps}
                  pagination={paginationFactory()}
                  filter={filterFactory()}
                />
              </div>
            )}
          </ToolkitProvider>
          <Code>{sourceCode}</Code>
        </div>
      );
    case "csv":
      return (
        <div>
          <ToolkitProvider
            keyField="id"
            data={data}
            columns={columns}
            exportCSV={{
              fileName: "custom.csv",
              separator: "|",
              ignoreHeader: true,
              noAutoBOM: false,
              blobType: "text/csv;charset=ansi",
            }}
          >
            {(props) => (
              <div>
                <ExportCSVButton {...props.csvProps}>
                  Export CSV!!
                </ExportCSVButton>
                <hr />
                <BootstrapTable {...props.baseProps} />
              </div>
            )}
          </ToolkitProvider>
          <Code>{sourceCode}</Code>
        </div>
      );
    case "footer":
      return (
        <div>
          <ToolkitProvider
            keyField="id"
            data={data}
            columns={columns}
            exportCSV={{
              ignoreFooter: false,
            }}
          >
            {(props) => (
              <div>
                <ExportCSVButton {...props.csvProps}>
                  Export CSV!!
                </ExportCSVButton>
                <hr />
                <BootstrapTable {...props.baseProps} />
              </div>
            )}
          </ToolkitProvider>
          <Code>{sourceCode}</Code>
        </div>
      );
    case "selected":
      const selectRow = {
        mode: "checkbox",
        clickToSelect: true,
      };
      return (
        <div>
          <h3>Export all selected row</h3>
          <ToolkitProvider
            keyField="id"
            data={data1}
            columns={columns}
            exportCSV={{ onlyExportSelection: true, exportAll: true }}
          >
            {(props) => (
              <div>
                <ExportCSVButton {...props.csvProps}>
                  Export CSV!!
                </ExportCSVButton>
                <hr />
                <BootstrapTable
                  {...props.baseProps}
                  selectRow={selectRow}
                  pagination={paginationFactory()}
                />
              </div>
            )}
          </ToolkitProvider>
          <h3>Export all selected rows in currect visible rows</h3>
          <ToolkitProvider
            keyField="id"
            data={data2}
            columns={columns}
            exportCSV={{ onlyExportSelection: true, exportAll: false }}
          >
            {(props) => (
              <div>
                <ExportCSVButton {...props.csvProps}>
                  Export CSV!!
                </ExportCSVButton>
                <hr />
                <BootstrapTable
                  {...props.baseProps}
                  selectRow={selectRow}
                  pagination={paginationFactory()}
                />
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
            exportCSV
          >
            {(props) => (
              <div>
                <ExportCSVButton {...props.csvProps}>
                  Export CSV!!
                </ExportCSVButton>
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
