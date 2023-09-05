/* eslint-disable import/no-anonymous-default-export */
import React from "react";

import BootstrapTable from "react-bootstrap-table-nextgen";
import Code from "../components/common/code-block";

import "../../../react-bootstrap-table-nextgen-filter/style/react-bootstrap-table-nextgen-filter.scss";
import "../../../react-bootstrap-table-nextgen-paginator/style/react-bootstrap-table-nextgen-paginator.scss";
import "../../../react-bootstrap-table-nextgen-toolkit/style/react-bootstrap-table-nextgen-toolkit.scss";
import "../../../react-bootstrap-table-nextgen/style/react-bootstrap-table-nextgen.scss";
import "./stylesheet/storybook.scss";
import "./stylesheet/tomorrow.min.css";

export default ({
  data,
  columns,
  sourceCode,
  striped,
  hover,
  condensed,
  bordered,
  noDataIndication,
}) => (
  <div>
    <BootstrapTable
      keyField="id"
      data={data}
      columns={columns}
      striped={striped}
      hover={hover}
      condensed={condensed}
      bordered={bordered}
      noDataIndication={noDataIndication}
    />
    <Code>{sourceCode}</Code>
  </div>
);
