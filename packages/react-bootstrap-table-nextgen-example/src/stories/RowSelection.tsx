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
  header,
  data,
  columns,
  sourceCode,
  sourceCode1,
  sourceCode2,
  selectRow,
  selectRow1,
  selectRow2,
  expandRow,
  cellEdit,
  noDataIndication,
}) => {
  switch (mode) {
    case "style":
      return (
        <div>
          <BootstrapTable
            keyField="id"
            data={data}
            columns={columns}
            selectRow={selectRow1}
          />
          <Code>{sourceCode1}</Code>
          <BootstrapTable
            keyField="id"
            data={data}
            columns={columns}
            selectRow={selectRow2}
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
            selectRow={selectRow}
            expandRow={expandRow}
            cellEdit={cellEdit}
            noDataIndication={noDataIndication}
          />
          <Code>{sourceCode}</Code>
        </div>
      );
  }
};
