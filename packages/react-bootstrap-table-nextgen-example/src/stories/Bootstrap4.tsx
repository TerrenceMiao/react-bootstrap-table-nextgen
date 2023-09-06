/* eslint-disable import/no-anonymous-default-export */
import React from "react";

import Code from "../components/common/code-block";
import BootstrapTable from "../../../react-bootstrap-table-nextgen";

import "./stylesheet/storybook.scss";
import "./stylesheet/tomorrow.min.css";
import "../../../react-bootstrap-table-nextgen-filter/style/react-bootstrap-table-nextgen-filter.scss";
import "../../../react-bootstrap-table-nextgen-paginator/style/react-bootstrap-table-nextgen-paginator.scss";
import "../../../react-bootstrap-table-nextgen-toolkit/style/react-bootstrap-table-nextgen-toolkit.scss";
import "../../../react-bootstrap-table-nextgen/style/react-bootstrap-table-nextgen.scss";

export default ({ mode, data, columns, sourceCode, defaultSorted }) => {
  switch (mode) {
    default:
      return (
        <div>
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={data}
            columns={columns}
            defaultSorted={defaultSorted}
          />
          <Code>{sourceCode}</Code>
        </div>
      );
  }
};
