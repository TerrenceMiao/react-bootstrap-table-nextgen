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

interface RowExpandManagementProps {
  products: any[];
  columns: any[];
}

interface RowExpandManagementState {
  expanded: number[];
}

class RowExpandManagement extends React.Component<RowExpandManagementProps, RowExpandManagementState> {
  constructor(props: RowExpandManagementProps) {
    super(props);
    this.state = { expanded: [0, 1] };
  }

  handleBtnClick = () => {
    if (!this.state.expanded.includes(2)) {
      this.setState(() => ({
        expanded: [...this.state.expanded, 2],
      }));
    } else {
      this.setState(() => ({
        expanded: this.state.expanded.filter((x) => x !== 2),
      }));
    }
  }

  handleOnExpand = (row: any, isExpand: boolean, rowIndex: number, e: React.MouseEvent) => {
    if (isExpand) {
      this.setState(() => ({
        expanded: [...this.state.expanded, row.id],
      }));
    } else {
      this.setState(() => ({
        expanded: this.state.expanded.filter((x) => x !== row.id),
      }));
    }
  }

  render() {
    const { products, columns } = this.props;

    const expandRow = {
      renderer: (row: any) => (
        <div>
          <p>{`This Expand row is belong to rowKey ${row.id}`}</p>
          <p>You can render anything here, also you can add additional data on every row object</p>
          <p>expandRow.renderer callback will pass the origin row object to you</p>
        </div>
      ),
      expanded: this.state.expanded,
      onExpand: this.handleOnExpand,
    };

    const sourceCode = `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price'
    }];

    class RowExpandManagment extends React.Component {
      constructor(props) {
        super(props);
        this.state = { expanded: [0, 1] };
      }

      handleBtnClick = () => {
        if (!this.state.expanded.includes(2)) {
          this.setState(() => ({
            expanded: [...this.state.expanded, 2]
          }));
        } else {
          this.setState(() => ({
            expanded: this.state.expanded.filter(x => x !== 2)
          }));
        }
      }

      handleOnExpand = (row, isExpand, rowIndex, e) => {
        if (isExpand) {
          this.setState(() => ({
            expanded: [...this.state.expanded, row.id]
          }));
        } else {
          this.setState(() => ({
            expanded: this.state.expanded.filter(x => x !== row.id)
          }));
        }
      }

      render() {
        const expandRow = {
          renderer: row => (
            <div>
              <p>{ \`This Expand row is belong to rowKey $\{row.id}\` }</p>
              <p>You can render anything here, also you can add additional data on every row object</p>
              <p>expandRow.renderer callback will pass the origin row object to you</p>
            </div>
          ),
          expanded: this.state.expanded,
          onExpand: this.handleOnExpand
        };
        return (
          <div>
            <button className="btn btn-success" onClick={ this.handleBtnClick }>Expand/Collapse 3rd row</button>
            <BootstrapTable keyField="id" data={ products } columns={ columns } expandRow={ expandRow } />
            <Code>{ sourceCode }</Code>
          </div>
        );
      }
    }
    `;

    return (
      <div>
        <button className="btn btn-success" onClick={this.handleBtnClick}>Expand/Collapse 3rd row</button>
        <BootstrapTable keyField="id" data={products} columns={columns} expandRow={expandRow} />
        <Code>{sourceCode}</Code>
      </div>
    );
  }
}

export default ({
  mode,
  header,
  data,
  columns,
  sourceCode,
  sourceCode1,
  sourceCode2,
  expandRow,
  expandRow1,
  expandRow2,
}) => {
  switch (mode) {
    case "management":
      return (
        <RowExpandManagement
          products={data}
          columns={columns}
        />
      );
    case "style":
      return (
        <div>
          <BootstrapTable
            keyField="id"
            data={data}
            columns={columns}
            expandRow={expandRow1}
          />
          <Code>{sourceCode1}</Code>
          <BootstrapTable
            keyField="id"
            data={data}
            columns={columns}
            expandRow={expandRow2}
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
            expandRow={expandRow}
          />
          <Code>{sourceCode}</Code>
        </div>
      );
  }
};
