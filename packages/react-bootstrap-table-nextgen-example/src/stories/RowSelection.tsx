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
import { productsGenerator } from "../utils/common";

interface SelectionManagmentProps {}

interface SelectionManagmentState {
  selected: number[];
}

class SelectionManagment extends React.Component<
  SelectionManagmentProps,
  SelectionManagmentState
> {
  constructor(props: SelectionManagmentProps) {
    super(props);
    this.state = { selected: [0, 1] };
  }

  handleBtnClick = () => {
    if (!this.state.selected.includes(2)) {
      this.setState((prevState) => ({
        selected: [...prevState.selected, 2],
      }));
    } else {
      this.setState((prevState) => ({
        selected: prevState.selected.filter((x) => x !== 2),
      }));
    }
  };

  handleOnSelect = (row: { id: number }, isSelect: boolean) => {
    if (isSelect) {
      this.setState((prevState) => ({
        selected: [...prevState.selected, row.id],
      }));
    } else {
      this.setState((prevState) => ({
        selected: prevState.selected.filter((x) => x !== row.id),
      }));
    }
  };

  handleOnSelectAll = (isSelect: boolean, rows: { id: number }[]) => {
    const ids = rows.map((r) => r.id);
    if (isSelect) {
      this.setState(() => ({
        selected: ids,
      }));
    } else {
      this.setState(() => ({
        selected: [],
      }));
    }
  };

  render() {
    const products = productsGenerator();
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
    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      selected: this.state.selected,
      onSelect: this.handleOnSelect,
      onSelectAll: this.handleOnSelectAll,
    };
    const sourceCode = `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    class SelectionManagment extends React.Component {
      constructor(props) {
        super(props);
        this.state = { selected: [0, 1] };
      }

      handleBtnClick = () => {
        if (!this.state.selected.includes(2)) {
          this.setState(() => ({
            selected: [...this.state.selected, 2]
          }));
        } else {
          this.setState(() => ({
            selected: this.state.selected.filter(x => x !== 2)
          }));
        }
      }

      handleOnSelect = (row, isSelect) => {
        if (isSelect) {
          this.setState(() => ({
            selected: [...this.state.selected, row.id]
          }));
        } else {
          this.setState(() => ({
            selected: this.state.selected.filter(x => x !== row.id)
          }));
        }
      }

      handleOnSelectAll = (isSelect, rows) => {
        const ids = rows.map(r => r.id);
        if (isSelect) {
          this.setState(() => ({
            selected: ids
          }));
        } else {
          this.setState(() => ({
            selected: []
          }));
        }
      }

      render() {
        const selectRow = {
          mode: 'checkbox',
          clickToSelect: true,
          selected: this.state.selected,
          onSelect: this.handleOnSelect,
          onSelectAll: this.handleOnSelectAll
        };
        return (
          <div>
            <button className="btn btn-success" onClick={ this.handleBtnClick }>Select/UnSelect 3rd row</button>
            <BootstrapTable keyField="id" data={ products } columns={ columns } selectRow={ selectRow } />
            <Code>{ sourceCode }</Code>
          </div>
        );
      }
    }
    `;

    return (
      <div>
        <button
          className="btn btn-success"
          onClick={this.handleBtnClick}
        >
          Select/UnSelect 3rd row
        </button>
        <BootstrapTable
          keyField="id"
          data={products}
          columns={columns}
          selectRow={selectRow}
        />
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
  selectRow,
  selectRow1,
  selectRow2,
  expandRow,
  cellEdit,
  noDataIndication,
}) => {
  switch (mode) {
    case "management":
      return (
        <div>
          <SelectionManagment />
        </div>
      );
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
