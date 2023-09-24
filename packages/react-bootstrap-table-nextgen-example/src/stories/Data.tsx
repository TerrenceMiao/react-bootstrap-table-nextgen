/* eslint-disable import/no-anonymous-default-export */
import React from "react";

import BootstrapTable from "../../../react-bootstrap-table-nextgen";
import filterFactory, {
  textFilter,
} from "../../../react-bootstrap-table-nextgen-filter";
import paginationFactory from "../../../react-bootstrap-table-nextgen-paginator";
import ToolkitProvider, {
  Search,
} from "../../../react-bootstrap-table-nextgen-toolkit";

import Code from "../components/common/code-block";
import { productsGenerator } from "../utils/common";

import "../../../react-bootstrap-table-nextgen-filter/style/react-bootstrap-table-nextgen-filter.scss";
import "../../../react-bootstrap-table-nextgen-paginator/style/react-bootstrap-table-nextgen-paginator.scss";
import "../../../react-bootstrap-table-nextgen-toolkit/style/react-bootstrap-table-nextgen-toolkit.scss";
import "../../../react-bootstrap-table-nextgen/style/react-bootstrap-table-nextgen.scss";
import "./stylesheet/storybook.scss";
import "./stylesheet/tomorrow.min.css";

interface WithoutPaginationCaseState {
  rowCount: number;
}

class WithoutPaginationCase extends React.Component<
  {},
  WithoutPaginationCaseState
> {
  products1 = productsGenerator(8);

  constructor(props: any) {
    super(props);
    this.state = { rowCount: this.products1.length };
  }

  handleDataChange = ({ dataSize }) => {
    this.setState({ rowCount: dataSize });
  };

  render() {
    const sourceCode2 = `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { textFilter } from 'react-bootstrap-table-nextgen-filter';
    import paginationFactory from 'react-bootstrap-table-nextgen-paginator';

    class Case2 extends React.Component {
      constructor(props) {
        super(props);
        this.state = { rowCount: products.length };
      }

      handleDataChange = ({ dataSize }) => {
        this.setState({ rowCount: dataSize });
      }

      render() {
        return (
          <div>
            <h5>Row Count:<span className="badge">{ this.state.rowCount }</span></h5>
            <BootstrapTable
              onDataSizeChange={ this.handleDataChange }
              keyField="id"
              data={ products }
              columns={ columns }
              filter={ filterFactory() }
              pagination={ paginationFactory() }
            />
            <Code>{ sourceCode }</Code>
          </div>
        );
      }
    `;

    return (
      <div>
        <h3>Without Pagination Case</h3>
        <h5>
          Row Count:<span className="badge">{this.state.rowCount}</span>
        </h5>
        <BootstrapTable
          onDataSizeChange={this.handleDataChange}
          keyField="id"
          data={this.products1}
          columns={[
            {
              dataField: "id",
              text: "Product ID",
            },
            {
              dataField: "name",
              text: "Product Name",
              filter: textFilter(),
            },
            {
              dataField: "price",
              text: "Product Price",
              filter: textFilter(),
            },
          ]}
          filter={filterFactory()}
        />
        <Code>{sourceCode2}</Code>
      </div>
    );
  }
}

interface WithPaginationCaseState {
  rowCount: number;
}

class WithPaginationCase extends React.Component<{}, WithPaginationCaseState> {
  products2 = productsGenerator(88);

  constructor(props: any) {
    super(props);
    this.state = { rowCount: this.products2.length };
  }

  handleDataChange = ({ dataSize }) => {
    this.setState({ rowCount: dataSize });
  };

  render() {
    const sourceCode1 = `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { textFilter } from 'react-bootstrap-table-nextgen-filter';

    class Case1 extends React.Component {
      constructor(props) {
        super(props);
        this.state = { rowCount: products.length };
      }

      handleDataChange = ({ dataSize }) => {
        this.setState({ rowCount: dataSize });
      }

      render() {
        return (
          <div>
            <h5>Row Count:<span className="badge">{ this.state.rowCount }</span></h5>
            <BootstrapTable
              onDataSizeChange={ this.handleDataChange }
              keyField="id"
              data={ products }
              columns={ columns }
              filter={ filterFactory() }
            />
            <Code>{ sourceCode }</Code>
          </div>
        );
      }
    `;

    return (
      <div>
        <h3>Without Pagination Case</h3>
        <h5>
          Row Count:<span className="badge">{this.state.rowCount}</span>
        </h5>
        <BootstrapTable
          onDataSizeChange={this.handleDataChange}
          keyField="id"
          data={this.products2}
          columns={[
            {
              dataField: "id",
              text: "Product ID",
            },
            {
              dataField: "name",
              text: "Product Name",
              filter: textFilter(),
            },
            {
              dataField: "price",
              text: "Product Price",
              filter: textFilter(),
            },
          ]}
          filter={filterFactory()}
          pagination={paginationFactory()}
        />
        <Code>{sourceCode1}</Code>
      </div>
    );
  }
}

const LoadDataWithFilterProductList = (props: any) => {
  const columns = [
    {
      dataField: "id",
      text: "Product ID",
    },
    {
      dataField: "name",
      text: "Product Name",
      filter: textFilter(),
    },
    {
      dataField: "price",
      text: "Product Price",
      filter: textFilter(),
    },
  ];

  return (
    <div style={{ paddingTop: "20px" }}>
      <h1 className="h2">Products</h1>
      <BootstrapTable
        keyField="id"
        data={props.products}
        columns={columns}
        filter={filterFactory()}
      />
    </div>
  );
};

interface LoadDataWithFilterState {
  products: any[];
}

class LoadDataWithFilterComponent extends React.Component<
  {},
  LoadDataWithFilterState
> {
  constructor(props: any) {
    super(props);
    this.state = { products: [] };
  }

  loadData = () => {
    this.setState({
      products: productsGenerator(),
    });
  };

  render() {
    return (
      <div>
        <button
          onClick={this.loadData}
          style={{
            fontSize: "20px",
            position: "absolute",
            left: "200px",
            top: "40px",
          }}
        >
          Load Data
        </button>
        <LoadDataWithFilterProductList products={this.state.products} />
      </div>
    );
  }
}

const LoadDataWithDefaultFilterProductList = (props: any) => {
  const columns = [
    {
      dataField: "id",
      text: "Product ID",
    },
    {
      dataField: "name",
      text: "Product Name",
      filter: textFilter({
        defaultValue: "1",
      }),
    },
    {
      dataField: "price",
      text: "Product Price",
      filter: textFilter(),
    },
  ];

  return (
    <div style={{ paddingTop: "20px" }}>
      <h1 className="h2">Products</h1>
      <BootstrapTable
        keyField="id"
        data={props.products}
        columns={columns}
        filter={filterFactory()}
      />
    </div>
  );
};

interface LoadDataWithDefaultFilterState {
  products: any[];
}

class LoadDataWithDefaultFilterComponent extends React.Component<
  {},
  LoadDataWithDefaultFilterState
> {
  state = {
    products: productsGenerator(3),
  };

  loadData = () => {
    this.setState({
      products: productsGenerator(14),
    });
  };

  render() {
    return (
      <div>
        <button
          onClick={this.loadData}
          style={{
            fontSize: "20px",
            position: "absolute",
            left: "200px",
            top: "40px",
          }}
        >
          Load Data
        </button>
        <LoadDataWithDefaultFilterProductList products={this.state.products} />
      </div>
    );
  }
}

const { SearchBar } = Search;

const LoadDataWithSearchProductList = (props: any) => {
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
  ];

  return (
    <div style={{ paddingTop: "20px" }}>
      <h1 className="h2">Products</h1>
      <ToolkitProvider
        keyField="id"
        data={props.products}
        columns={columns}
        search
      >
        {(toolkitprops) => (
          <div>
            <SearchBar {...toolkitprops.searchProps} />
            <BootstrapTable striped hover {...toolkitprops.baseProps} />
          </div>
        )}
      </ToolkitProvider>
    </div>
  );
};

interface LoadDataWithSearchState {
  products: any[];
}

class LodadDataWithSearchComponent extends React.Component<
  {},
  LoadDataWithSearchState
> {
  constructor(props: any) {
    super(props);
    this.state = { products: [] };
  }

  loadData = () => {
    this.setState({
      products: productsGenerator(),
    });
  };

  render() {
    return (
      <div>
        <button
          onClick={this.loadData}
          style={{
            fontSize: "20px",
            position: "absolute",
            left: "200px",
            top: "40px",
          }}
        >
          Load Data
        </button>
        <LoadDataWithSearchProductList products={this.state.products} />
      </div>
    );
  }
}

const LoadDataWithDefaultSearchProductList = (props: any) => {
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
  ];

  return (
    <div style={{ paddingTop: "20px" }}>
      <h1 className="h2">Products</h1>
      <ToolkitProvider
        keyField="id"
        data={props.products}
        columns={columns}
        search={{ defaultSearch: "3" }}
      >
        {(toolkitprops) => (
          <div>
            <SearchBar {...toolkitprops.searchProps} />
            <BootstrapTable striped hover {...toolkitprops.baseProps} />
          </div>
        )}
      </ToolkitProvider>
    </div>
  );
};

interface LoadDataWithDefaultSearchState {
  products: any[];
}

class LodadDataWithDefaultSearchComponent extends React.Component<
  {},
  LoadDataWithDefaultSearchState
> {
  constructor(props: any) {
    super(props);
    this.state = { products: productsGenerator(4) };
  }

  loadData = () => {
    this.setState({
      products: productsGenerator(34),
    });
  };

  render() {
    return (
      <div>
        <button
          onClick={this.loadData}
          style={{
            fontSize: "20px",
            position: "absolute",
            left: "200px",
            top: "40px",
          }}
        >
          Load Data
        </button>
        <LoadDataWithDefaultSearchProductList products={this.state.products} />
      </div>
    );
  }
}

const LodadDataWithFilterAndPaginationProductList = (props: any) => {
  const columns = [
    {
      dataField: "id",
      text: "Product ID",
    },
    {
      dataField: "name",
      text: "Product Name",
      filter: textFilter({
        defaultValue: "6",
      }),
    },
    {
      dataField: "price",
      text: "Product Price",
      filter: textFilter(),
    },
  ];

  return (
    <div style={{ paddingTop: "20px" }}>
      <h1 className="h2">Products</h1>
      <BootstrapTable
        keyField="id"
        data={props.products}
        columns={columns}
        filter={filterFactory()}
        pagination={paginationFactory()}
      />
    </div>
  );
};

interface LodadDataWithFilterAndPaginationState {
  products: any[];
}

class LodadDataWithFilterAndPaginationComponent extends React.Component<
  {},
  LodadDataWithFilterAndPaginationState
> {
  constructor(props: any) {
    super(props);
    this.state = { products: productsGenerator(60) };
  }

  loadData = () => {
    this.setState({
      products: productsGenerator(14),
    });
  };

  render() {
    return (
      <div>
        <button
          onClick={this.loadData}
          style={{
            fontSize: "20px",
            position: "absolute",
            left: "200px",
            top: "40px",
          }}
        >
          Load Data
        </button>
        <LodadDataWithFilterAndPaginationProductList
          products={this.state.products}
        />
      </div>
    );
  }
}

export default ({ mode }) => {
  switch (mode) {
    case "data":
      return (
        <div>
          <WithoutPaginationCase />
          <WithPaginationCase />
        </div>
      );
    case "filter":
      return (
        <div>
          <LoadDataWithFilterComponent />
        </div>
      );
    case "default-filter":
      return (
        <div>
          <LoadDataWithDefaultFilterComponent />
        </div>
      );
    case "search":
      return (
        <div>
          <LodadDataWithSearchComponent />
        </div>
      );
    case "default-search":
      return (
        <div>
          <LodadDataWithDefaultSearchComponent />
        </div>
      );
    case "pagination":
      return (
        <div>
          <LodadDataWithFilterAndPaginationComponent />
        </div>
      );
  }
};
