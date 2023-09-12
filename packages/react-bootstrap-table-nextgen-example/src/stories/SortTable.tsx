/* eslint-disable import/no-anonymous-default-export */
import React, { Component } from "react";

import BootstrapTable from "../../../react-bootstrap-table-nextgen";
import Code from "../components/common/code-block";

import "../../../react-bootstrap-table-nextgen-filter/style/react-bootstrap-table-nextgen-filter.scss";
import "../../../react-bootstrap-table-nextgen-paginator/style/react-bootstrap-table-nextgen-paginator.scss";
import "../../../react-bootstrap-table-nextgen-toolkit/style/react-bootstrap-table-nextgen-toolkit.scss";
import "../../../react-bootstrap-table-nextgen/style/react-bootstrap-table-nextgen.scss";
import { jobsGenerator1, productsGenerator } from "../utils/common";
import "./stylesheet/storybook.scss";
import "./stylesheet/tomorrow.min.css";

interface SortManagementState {
  field: string | null;
  order: string | null;
}

class SortManagement extends Component<{}, SortManagementState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      field: null,
      order: null,
    };
  }

  handleSort = (field: string, order: string) => {
    this.setState({
      field,
      order,
    });
  };

  handleSortById = () => {
    this.setState({
      field: "id",
      order: "desc",
    });
  };

  render() {
    const columns = [
      {
        dataField: "id",
        text: "Product ID",
        sort: true,
        onSort: this.handleSort,
      },
      {
        dataField: "name",
        text: "Product Name",
        sort: true,
        onSort: this.handleSort,
      },
      {
        dataField: "price",
        text: "Product Price",
      },
    ];
    const data = productsGenerator();
    const sourceCode = `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    class SortManagement extends React.Component {
      state = {
        field: null,
        order: null
      }

      handleSort = (field, order) => {
        this.setState({
          field,
          order
        });
      }

      handleSortById = () => {
        this.setState({
          field: 'id',
          order: 'desc'
        });
      }

      render() {
        const columns = [{
          dataField: 'id',
          text: 'Product ID',
          sort: true,
          onSort: this.handleSort
        }, {
          dataField: 'name',
          text: 'Product Name',
          sort: true,
          onSort: this.handleSort
        }, {
          dataField: 'price',
          text: 'Product Price'
        }];
        return (
          <div>
            <button className="btn btn-danger" onClick={ this.handleSortById }>Sort By ID</button>
            <BootstrapTable
              keyField="id"
              data={ products }
              columns={ columns }
              sort={ {
                dataField: this.state.field,
                order: this.state.order
              } }
            />
            <Code>{ sourceCode }</Code>
          </div>
        );
      }
    }
    `;

    return (
      <div>
        <button className="btn btn-danger" onClick={this.handleSortById}>
          Sort By ID
        </button>
        <BootstrapTable
          keyField="id"
          data={data}
          columns={columns}
          sort={{
            dataField: this.state.field,
            order: this.state.order,
          }}
        />
        <Code>{sourceCode}</Code>
      </div>
    );
  }
}

interface CustomSortValueProps {}

interface CustomSortValueState {
  data: any[];
}

class CustomSortValue extends Component<
  CustomSortValueProps,
  CustomSortValueState
> {
  constructor(props: CustomSortValueProps) {
    super(props);
    this.state = { data: jobsGenerator1(8) };
  }

  handleClick = () => {
    this.setState(() => {
      const newProducts = jobsGenerator1(21);
      return {
        data: newProducts,
      };
    });
  };

  render() {
    const types = [
      "Cloud Service",
      "Message Service",
      "Add Service",
      "Edit Service",
      "Money",
    ];
    const columns: any[] = [
      {
        dataField: "id",
        text: "Job ID",
      },
      {
        dataField: "name",
        text: "Job Name",
      },
      {
        dataField: "owner",
        text: "Job Owner",
      },
      {
        dataField: "type",
        text: "Job Type",
        sort: true,
        formatter: (cell: any, row: any) => types[cell],
        sortValue: (cell: any, row: any) => types[cell],
      },
    ];
    const sourceCode = `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    const types = ['Cloud Service', 'Message Service', 'Add Service', 'Edit Service', 'Money'];

    const columns = [{
      dataField: 'id',
      text: 'Job ID'
    }, {
      dataField: 'name',
      text: 'Job Name'
    }, {
      dataField: 'owner',
      text: 'Job Owner'
    }, {
      dataField: 'type',
      text: 'Job Type',
      sort: true,
      formatter: (cell, row) => types[cell],
      sortValue: (cell, row) => types[cell]
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } />
    `;

    return (
      <div>
        <button className="btn btn-default" onClick={this.handleClick}>
          Change Data
        </button>
        <BootstrapTable
          keyField="id"
          data={this.state.data}
          columns={columns}
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
  defaultSorted,
  defaultSortDirection,
  sort,
}) => {
  switch (mode) {
    case "management":
      return <SortManagement />;
    case "configuration":
      return (
        <div>
          <h3>Reverse Sorting Table</h3>
          <BootstrapTable
            keyField="id"
            data={data}
            columns={columns}
            sort={sort}
          />
          <Code>{sourceCode}</Code>
        </div>
      );
    case "custom":
      return <CustomSortValue />;
    default:
      return (
        <div>
          {header}
          <BootstrapTable
            keyField="id"
            data={data}
            columns={columns}
            defaultSorted={defaultSorted}
            defaultSortDirection={defaultSortDirection}
            sort={sort}
          />
          <Code>{sourceCode}</Code>
        </div>
      );
  }
};
