/* eslint-disable import/no-anonymous-default-export */
import React from "react";

import BootstrapTable from "../../../react-bootstrap-table-nextgen";
import Code from "../components/common/code-block";

import "../../../react-bootstrap-table-nextgen-filter/style/react-bootstrap-table-nextgen-filter.scss";
import "../../../react-bootstrap-table-nextgen-paginator/style/react-bootstrap-table-nextgen-paginator.scss";
import "../../../react-bootstrap-table-nextgen-toolkit/style/react-bootstrap-table-nextgen-toolkit.scss";
import "../../../react-bootstrap-table-nextgen/style/react-bootstrap-table-nextgen.scss";
import { productsGenerator } from "../utils/common";
import "./stylesheet/storybook.scss";
import "./stylesheet/tomorrow.min.css";

interface ProductListProps {}

interface ProductListState {
  products: any[];
  count: number;
}

class ProductList extends React.Component<ProductListProps, ProductListState> {
  constructor(props: ProductListProps) {
    super(props);
    this.state = {
      products: [
        { id: 12, name: "Item 12", price: 12.5, inStock: false },
        { id: 13, name: "Item 13", price: 13.5, inStock: true },
        { id: 14, name: "Item 14", price: 14.5, inStock: true },
      ],
      count: 0,
    };
  }

  toggleInStock = () => {
    let newProducts = [...this.state.products];
    newProducts = newProducts.map((d) => {
      if (d.id === 13) {
        return {
          ...d,
          inStock: !d.inStock,
        };
      }
      return d;
    });
    this.setState((curr) => ({ ...curr, products: newProducts }));
  };

  counter = () => {
    this.setState((curr) => ({ ...curr, count: this.state.count + 1 }));
  };

  render() {
    const columns = [
      {
        dataField: "id",
        text: "Product ID",
        formatter: (cell: any, row: any, rowIndex: number, extraData: any) => (
          <div>
            <span>ID: {row.id}</span>
            <br />
            <span>Counter: {extraData}</span>
          </div>
        ),
        formatExtraData: this.state.count,
      },
      {
        dataField: "name",
        text: "Product Name",
      },
      {
        dataField: "price",
        text: "Product Price",
      },
      {
        dataField: "inStock",
        text: "In Stock",
        formatter: (cellContent: any, row: any) => (
          <div className="checkbox disabled">
            <label>
              <input type="checkbox" checked={row.inStock} disabled />
            </label>
          </div>
        ),
      },
      {
        dataField: "df1",
        isDummyField: true,
        text: "Action 1",
        formatter: (cellContent: any, row: any) => {
          if (row.inStock) {
            return (
              <h5>
                <span className="label label-success"> Available</span>
              </h5>
            );
          }
          return (
            <h5>
              <span className="label label-danger"> Backordered</span>
            </h5>
          );
        },
      },
      {
        dataField: "df2",
        isDummyField: true,
        text: "Action 2",
        formatter: (cellContent: any, row: any) => {
          if (row.inStock) {
            return (
              <h5>
                <span className="label label-success"> Available</span>
              </h5>
            );
          }
          return (
            <h5>
              <span className="label label-danger"> Backordered</span>
            </h5>
          );
        },
      },
    ];

    const sourceCode = `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    class ProductList extends React.Component {
      constructor(props) {
        super(props);
        this.state = { products, count: 0 };
      }

      toggleInStock = () => {
        let newProducts = [...this.state.products];
        newProducts = newProducts.map((d) => {
          if (d.id === 13) {
            return {
              ...d,
              inStock: !d.inStock
            };
          }
          return d;
        });
        this.setState(curr => ({ ...curr, products: newProducts }));
      };

      render() {
        const columns = [
          {
            dataField: 'id',
            text: 'Product ID',
            formatter: (cell, row, rowIndex, extraData) => (
              <div>
                <span>ID: {row.id}</span>
                <br />
                <span>state: {extraData}</span>
              </div>
            ),
            formatExtraData: this.state.count
          },
          {
            dataField: 'name',
            text: 'Product Name'
          },
          {
            dataField: 'price',
            text: 'Product Price'
          },
          {
            dataField: 'inStock',
            text: 'In Stock',
            formatter: (cellContent, row) => (
              <div className="checkbox disabled">
                <label>
                  <input type="checkbox" checked={ row.inStock } disabled />
                </label>
              </div>
            )
          },
          {
            dataField: 'df1',
            isDummyField: true,
            text: 'Action 1',
            formatter: (cellContent, row) => {
              if (row.inStock) {
                return (
                  <h5>
                    <span className="label label-success"> Available</span>
                  </h5>
                );
              }
              return (
                <h5>
                  <span className="label label-danger"> Backordered</span>
                </h5>
              );
            }
          },
          {
            dataField: 'df2',
            isDummyField: true,
            text: 'Action 2',
            formatter: (cellContent, row) => {
              if (row.inStock) {
                return (
                  <h5>
                    <span className="label label-success"> Available</span>
                  </h5>
                );
              }
              return (
                <h5>
                  <span className="label label-danger"> Backordered</span>
                </h5>
              );
            }
          }
        ];

        return (
          <div>
            <h3>Action 1 and Action 2 are dummy column</h3>
            <button onClick={ this.toggleInStock } className="btn btn-primary">
              Toggle item 13 stock status
            </button>
            <button
              className="btn btn-success"
              onClick={ () => this.setState(() => ({ count: this.state.count + 1 })) }
            >
              Click me to Increase counter
            </button>
            <BootstrapTable
              keyField="id"
              data={ this.state.products }
              columns={ columns }
            />
            <Code>{ sourceCode }</Code>
          </div>
        );
      }
    }
    `;

    return (
      <div>
        <h3>Action 1 and Action 2 are dummy column</h3>
        <button onClick={this.toggleInStock} className="btn btn-primary">
          Toggle item 13 stock status
        </button>
        <button className="btn btn-success" onClick={this.counter}>
          Click me to Increase counter
        </button>
        <BootstrapTable
          keyField="id"
          data={this.state.products}
          columns={columns}
        />
        <Code>{sourceCode}</Code>
      </div>
    );
  }
}

interface DummyColumnWithRowExpandProps {}

interface DummyColumnWithRowExpandState {
  hoverIdx: any;
}

class DummyColumnWithRowExpand extends React.Component<
  DummyColumnWithRowExpandProps,
  DummyColumnWithRowExpandState
> {
  constructor(props: DummyColumnWithRowExpandProps) {
    super(props);

    this.state = {
      hoverIdx: null,
    };
  }

  expandRow = {
    renderer: () => (
      <div style={{ width: "100%", height: "20px" }}>Content</div>
    ),
    showExpandColumn: true,
    expandByColumnOnly: true,
  };

  actionFormater = (cell: any, row: any, rowIndex: number, { hoverIdx }) => {
    if (
      (hoverIdx !== null || hoverIdx !== undefined) &&
      hoverIdx === rowIndex
    ) {
      return (
        <div
          style={{ width: "20px", height: "20px", backgroundColor: "orange" }}
        />
      );
    }
    return <div style={{ width: "20px", height: "20px" }} />;
  };

  rowEvents = {
    onMouseEnter: (e: any, row: any, rowIndex: number) => {
      this.setState({ hoverIdx: rowIndex });
    },
    onMouseLeave: () => {
      this.setState({ hoverIdx: null });
    },
  };

  rowStyle = (row: any, rowIndex: number) => {
    row.index = rowIndex;
    const style: { backgroundColor?: any; borderTop?: any } = {};
    if (rowIndex % 2 === 0) {
      style.backgroundColor = "transparent";
    } else {
      style.backgroundColor = "rgba(54, 163, 173, .10)";
    }
    style.borderTop = "none";

    return style;
  };

  render() {
    const columns = [
      {
        dataField: "id",
        text: "Product ID",
      },
      {
        dataField: "name",
        text: "Product Name",
      },
      {
        dataField: "price",
        text: "Product Price",
      },
      {
        isDummyField: true,
        text: "",
        formatter: this.actionFormater,
        formatExtraData: { hoverIdx: this.state.hoverIdx },
        headerStyle: { width: "50px" },
        style: { height: "30px" },
      },
    ];
    const sourceCode = `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    class DummyColumnWithRowExpand extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
          hoverIdx: null
        };
      }

      expandRow = {
        renderer: () => (
          <div style={ { width: '100%', height: '20px' } }>Content</div>
        ),
        showExpandColumn: true,
        expandByColumnOnly: true
      };

      actionFormater = (cell, row, rowIndex, { hoverIdx }) => {
        if ((hoverIdx !== null || hoverIdx !== undefined) && hoverIdx === rowIndex) {
          return (
            <div
              style={ { width: '20px', height: '20px', backgroundColor: 'orange' } }
            />
          );
        }
        return (
          <div
            style={ { width: '20px', height: '20px' } }
          />
        );
      }

      rowEvents = {
        onMouseEnter: (e, row, rowIndex) => {
          this.setState({ hoverIdx: rowIndex });
        },
        onMouseLeave: () => {
          this.setState({ hoverIdx: null });
        }
      }

      rowStyle = (row, rowIndex) => {
        row.index = rowIndex;
        const style = {};
        if (rowIndex % 2 === 0) {
          style.backgroundColor = 'transparent';
        } else {
          style.backgroundColor = 'rgba(54, 163, 173, .10)';
        }
        style.borderTop = 'none';

        return style;
      }

      render() {
        const columns = [{
          dataField: 'id',
          text: 'Product ID'
        }, {
          dataField: 'name',
          text: 'Product Name'
        }, {
          dataField: 'price',
          text: 'Product Price'
        }, {
          text: '',
          isDummyField: true,
          formatter: this.actionFormater,
          formatExtraData: { hoverIdx: this.state.hoverIdx },
          headerStyle: { width: '50px' },
          style: { height: '30px' }
        }];
        return (
          <div>
            <BootstrapTable
              keyField="id"
              data={ products }
              columns={ columns }
              noDataIndication="There is no data"
              classes="table"
              rowStyle={ this.rowStyle }
              rowEvents={ this.rowEvents }
              expandRow={ this.expandRow }
            />
          </div>
        );
      }
    }
    `;

    return (
      <div>
        <BootstrapTable
          keyField="id"
          data={productsGenerator()}
          columns={columns}
          rowStyle={this.rowStyle}
          rowEvents={this.rowEvents}
          expandRow={this.expandRow}
        />
        <Code>{sourceCode}</Code>
      </div>
    );
  }
}

export default ({
  mode,
  data,
  columns,
  sourceCode,
  bordered,
  header,
}) => {
  switch (mode) {
    case "dummy":
      return <ProductList />;
    case "rowdummy":
      return <DummyColumnWithRowExpand />;
    default:
      return (
        <div>
          {header}
          <BootstrapTable
            keyField="id"
            data={data}
            columns={columns}
            bordered={bordered}
          />
          <Code>{sourceCode}</Code>
        </div>
      );
  }
};
