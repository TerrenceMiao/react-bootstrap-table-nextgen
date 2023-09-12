/* eslint-disable import/no-anonymous-default-export */
import React from "react";

import BootstrapTable from "../../../react-bootstrap-table-nextgen";
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
  columns1,
  columns2,
  columns3,
  sourceCode,
  sourceCode1,
  sourceCode2,
  filter,
  expandRow,
  selectRow,
  header,
}) => {
  switch (mode) {
    case "options":
      return (
        <div>
          <h2>Options as an object</h2>
          <BootstrapTable
            keyField="id"
            data={data}
            columns={columns1}
            filter={filter}
          />
          <h2>Options as an array</h2>
          <BootstrapTable
            keyField="id"
            data={data}
            columns={columns2}
            filter={filter}
          />
          <h2>Options as a function which return an array</h2>
          <BootstrapTable
            keyField="id"
            data={data}
            columns={columns3}
            filter={filter}
          />
          <Code>{sourceCode}</Code>
        </div>
      );
    case "position":
      return (
        <div>
          <BootstrapTable
            keyField="id"
            data={data}
            columns={columns}
            filter={filter}
            filterPosition="top"
            expandRow={expandRow}
            selectRow={selectRow}
          />
          <Code>{sourceCode1}</Code>
          <BootstrapTable
            keyField="id"
            data={data}
            columns={columns}
            filter={filter}
            filterPosition="bottom"
            expandRow={expandRow}
            selectRow={selectRow}
          />
          <Code>{sourceCode2}</Code>
        </div>
      );
    default:
      return (
        <div>
          {header}
          <BootstrapTable
            keyField="id"
            data={data}
            columns={columns}
            filter={filter}
            selectRow={selectRow}
          />
          <Code>{sourceCode}</Code>
        </div>
      );
  }
};
