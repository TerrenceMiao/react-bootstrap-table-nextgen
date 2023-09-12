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
  sourceCode,
  sourceCode1,
  sourceCode2,
  rowStyle1,
  rowStyle2,
  rowClasses1,
  rowClasses2,
  hiddenRows,
  rowEvents,
}) => {
  switch (mode) {
    case "customize":
      return (
        <div>
          <BootstrapTable
            keyField="id"
            data={data}
            columns={columns}
            rowStyle={rowStyle1}
            rowClasses={rowClasses1}
          />
          <Code>{sourceCode1}</Code>
          <BootstrapTable
            keyField="id"
            data={data}
            columns={columns}
            rowStyle={rowStyle2}
            rowClasses={rowClasses2}
          />
          <Code>{sourceCode2}</Code>
        </div>
      );
    default:
      return (
        <div>
          <BootstrapTable
            keyField="id"
            data={data}
            columns={columns}
            hiddenRows={hiddenRows}
            rowEvents={rowEvents}
          />
          <Code>{sourceCode}</Code>
        </div>
      );
  }
};
