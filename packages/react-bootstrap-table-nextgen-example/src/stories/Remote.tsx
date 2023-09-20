/* eslint-disable import/no-anonymous-default-export */
import PropTypes from "prop-types";
import React from "react";

import BootstrapTable from "../../../react-bootstrap-table-nextgen";
import filterFactory, {
  LIKE,
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

const { SearchBar } = Search;

const remoteSortColumns = [
  {
    dataField: "id",
    text: "Product ID",
  },
  {
    dataField: "name",
    text: "Product Name",
    sort: true,
  },
  {
    dataField: "price",
    text: "Product Price",
    sort: true,
  },
];

const remoteSortSourceCode = `\
import BootstrapTable from 'react-bootstrap-table-nextgen';

const columns = [{
  dataField: 'id',
  text: 'Product ID',
}, {
  dataField: 'name',
  text: 'Product Name',
  filter: textFilter()
}, {
  dataField: 'price',
  text: 'Product Price',
  filter: textFilter()
}];

const RemoteSort = props => (
  <div>
    <BootstrapTable
      remote={ { sort: true } }
      keyField="id"
      data={ props.data }
      columns={ columns }
      onTableChange={ props.onTableChange }
    />
    <Code>{ sourceCode }</Code>
  </div>
);

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: products
    };
  }

  handleTableChange = (type, { sortField, sortOrder, data }) => {
    setTimeout(() => {
      let result;
      if (sortOrder === 'asc') {
        result = data.sort((a, b) => {
          if (a[sortField] > b[sortField]) {
            return 1;
          } else if (b[sortField] > a[sortField]) {
            return -1;
          }
          return 0;
        });
      } else {
        result = data.sort((a, b) => {
          if (a[sortField] > b[sortField]) {
            return -1;
          } else if (b[sortField] > a[sortField]) {
            return 1;
          }
          return 0;
        });
      }
      this.setState(() => ({
        data: result
      }));
    }, 2000);
  }

  render() {
    return (
      <RemoteSort
        data={ this.state.data }
        onTableChange={ this.handleTableChange }
      />
    );
  }
}
`;

const RemoteSort = (props: any) => (
  <div>
    <BootstrapTable
      remote={{ sort: true }}
      keyField="id"
      data={props.data}
      columns={remoteSortColumns}
      onTableChange={props.onTableChange}
    />
    <Code>{remoteSortSourceCode}</Code>
  </div>
);

RemoteSort.propTypes = {
  data: PropTypes.array.isRequired,
  onTableChange: PropTypes.func.isRequired,
};

interface RemoteSortState {
  data: any;
}

class RemoteSortComponent extends React.Component<{}, RemoteSortState> {
  products = productsGenerator(5);

  constructor(props: any) {
    super(props);
    this.state = {
      data: this.products,
    };
  }

  handleTableChange = (type: any, { sortField, sortOrder, data }) => {
    setTimeout(() => {
      let result: any;
      if (sortOrder === "asc") {
        result = data.sort((a: any, b: any) => {
          if (a[sortField] > b[sortField]) {
            return 1;
          } else if (b[sortField] > a[sortField]) {
            return -1;
          }
          return 0;
        });
      } else {
        result = data.sort((a: any, b: any) => {
          if (a[sortField] > b[sortField]) {
            return -1;
          } else if (b[sortField] > a[sortField]) {
            return 1;
          }
          return 0;
        });
      }
      this.setState(() => ({
        data: result,
      }));
    }, 2000);
  };

  render() {
    return (
      <RemoteSort
        data={this.state.data}
        onTableChange={this.handleTableChange}
      />
    );
  }
}

const remoteFilterColumns = [
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

const remoteFilterSourceCode = `\
import BootstrapTable from 'react-bootstrap-table-nextgen';
import filterFactory, { textFilter } from 'react-bootstrap-table-nextgen-filter';

const columns = [{
  dataField: 'id',
  text: 'Product ID',
}, {
  dataField: 'name',
  text: 'Product Name',
  filter: textFilter()
}, {
  dataField: 'price',
  text: 'Product Price',
  filter: textFilter()
}];

const RemoteFilter = props => (
  <div>
    <BootstrapTable
      remote={ { filter: true } }
      keyField="id"
      data={ props.data }
      columns={ columns }
      filter={ filterFactory() }
      onTableChange={ props.onTableChange }
    />
    <Code>{ sourceCode }</Code>
  </div>
);

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: products
    };
  }

  handleTableChange = (type, { filters }) => {
    setTimeout(() => {
      const result = products.filter((row) => {
        let valid = true;
        for (const dataField in filters) {
          const { filterVal, filterType, comparator } = filters[dataField];

          if (filterType === 'TEXT') {
            if (comparator === Comparator.LIKE) {
              valid = row[dataField].toString().indexOf(filterVal) > -1;
            } else {
              valid = row[dataField] === filterVal;
            }
          }
          if (!valid) break;
        }
        return valid;
      });
      this.setState(() => ({
        data: result
      }));
    }, 2000);
  }

  render() {
    return (
      <RemoteFilter
        data={ this.state.data }
        onTableChange={ this.handleTableChange }
      />
    );
  }
}
`;

const RemoteFilter = (props: any) => (
  <div>
    <BootstrapTable
      remote={{ filter: true }}
      keyField="id"
      data={props.data}
      columns={remoteFilterColumns}
      filter={filterFactory()}
      onTableChange={props.onTableChange}
    />
    <Code>{remoteFilterSourceCode}</Code>
  </div>
);

RemoteFilter.propTypes = {
  data: PropTypes.array.isRequired,
  onTableChange: PropTypes.func.isRequired,
};

interface RemoteFilterState {
  data: any;
}

class RemoteFilterComponent extends React.Component<{}, RemoteFilterState> {
  products = productsGenerator(17);

  constructor(props: any) {
    super(props);
    this.state = {
      data: this.products,
    };
  }

  handleTableChange = (type: any, { filters }) => {
    setTimeout(() => {
      const result = this.products.filter((row: any) => {
        let valid = true;
        for (const dataField in filters) {
          const { filterVal, filterType, comparator } = filters[dataField];

          if (filterType === "TEXT") {
            if (comparator === LIKE) {
              valid = row[dataField].toString().indexOf(filterVal) > -1;
            } else {
              valid = row[dataField] === filterVal;
            }
          }
          if (!valid) break;
        }
        return valid;
      });
      this.setState(() => ({
        data: result,
      }));
    }, 2000);
  };

  render() {
    return (
      <RemoteFilter
        data={this.state.data}
        onTableChange={this.handleTableChange}
      />
    );
  }
}

const remotePaginationSourceCode = `\
import BootstrapTable from 'react-bootstrap-table-nextgen';
import paginationFactory from 'react-bootstrap-table-nextgen-paginator';
// ...
const RemotePagination = ({ data, page, sizePerPage, onTableChange, totalSize }) => (
  <div>
    <BootstrapTable
      remote
      keyField="id"
      data={ data }
      columns={ columns }
      pagination={ paginationFactory({ page, sizePerPage, totalSize }) }
      onTableChange={ onTableChange }
    />
    <Code>{ sourceCode }</Code>
  </div>
);

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      data: products.slice(0, 10),
      sizePerPage: 10
    };
  }

  handleTableChange = (type, { page, sizePerPage }) => {
    const currentIndex = (page - 1) * sizePerPage;
    setTimeout(() => {
      this.setState(() => ({
        page,
        data: products.slice(currentIndex, currentIndex + sizePerPage),
        sizePerPage
      }));
    }, 2000);
  }

  render() {
    const { data, sizePerPage, page } = this.state;
    return (
      <RemotePagination
        data={ data }
        page={ page }
        sizePerPage={ sizePerPage }
        totalSize={ products.length }
        onTableChange={ this.handleTableChange }
      />
    );
  }
}
`;

const RemotePagination = ({
  data,
  page,
  sizePerPage,
  onTableChange,
  totalSize,
}) => (
  <div>
    <BootstrapTable
      remote
      keyField="id"
      data={data}
      columns={[
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
      ]}
      pagination={paginationFactory({ page, sizePerPage, totalSize })}
      onTableChange={onTableChange}
    />
    <Code>{remotePaginationSourceCode}</Code>
  </div>
);

RemotePagination.propTypes = {
  data: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  totalSize: PropTypes.number.isRequired,
  sizePerPage: PropTypes.number.isRequired,
  onTableChange: PropTypes.func.isRequired,
};

interface RemotePaginationState {
  data: any;
  sizePerPage: number;
  page: any;
}

class RemotePaginationComponent extends React.Component<
  {},
  RemotePaginationState
> {
  products = productsGenerator(87);

  constructor(props: any) {
    super(props);
    this.state = {
      page: 1,
      data: this.products.slice(0, 10),
      sizePerPage: 10,
    };
  }

  handleTableChange = (type: any, { page, sizePerPage }) => {
    const currentIndex = (page - 1) * sizePerPage;
    setTimeout(() => {
      this.setState(() => ({
        page,
        data: this.products.slice(currentIndex, currentIndex + sizePerPage),
        sizePerPage,
      }));
    }, 2000);
  };

  render() {
    const { data, sizePerPage, page } = this.state;
    return (
      <RemotePagination
        data={data}
        page={page}
        sizePerPage={sizePerPage}
        totalSize={this.products.length}
        onTableChange={this.handleTableChange}
      />
    );
  }
}

const remoteSearchColumns = [
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

const remoteSearchSourceCode = `\
import BootstrapTable from 'react-bootstrap-table-nextgen';
import ToolkitProvider, { Search } from 'react-bootstrap-table-nextgen-toolkit';
import filterFactory, { textFilter } from 'react-bootstrap-table-nextgen-filter';

const columns = [{
  dataField: 'id',
  text: 'Product ID',
}, {
  dataField: 'name',
  text: 'Product Name',
  filter: textFilter()
}, {
  dataField: 'price',
  text: 'Product Price',
  filter: textFilter()
}];

const RemoteFilter = props => (
  <div>
    <ToolkitProvider
      keyField="id"
      data={ props.data }
      columns={ columns }
      search
    >
      {
        toolkitprops => [
          <SearchBar { ...toolkitprops.searchProps } />,
          <BootstrapTable
            { ...toolkitprops.baseProps }
            remote={ { search: true } }
            onTableChange={ props.onTableChange }
          />
        ]
      }
    </ToolkitProvider>
    <Code>{ sourceCode }</Code>
  </div>
);

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: products
    };
  }

  handleTableChange = (type, { filters }) => {
    setTimeout(() => {
      const result = products.filter((row) => {
        let valid = true;
        for (const dataField in filters) {
          const { filterVal, filterType, comparator } = filters[dataField];

          if (filterType === 'TEXT') {
            if (comparator === Comparator.LIKE) {
              valid = row[dataField].toString().indexOf(filterVal) > -1;
            } else {
              valid = row[dataField] === filterVal;
            }
          }
          if (!valid) break;
        }
        return valid;
      });
      this.setState(() => ({
        data: result
      }));
    }, 2000);
  }

  render() {
    return (
      <RemoteFilter
        data={ this.state.data }
        onTableChange={ this.handleTableChange }
      />
    );
  }
}
`;

const RemoteSearch = (props: any) => (
  <div>
    <ToolkitProvider
      keyField="id"
      data={props.data}
      columns={remoteSearchColumns}
      search
    >
      {(toolkitprops) => (
        <div>
          <SearchBar {...toolkitprops.searchProps} />
          <BootstrapTable
            {...toolkitprops.baseProps}
            remote={{ search: true }}
            onTableChange={props.onTableChange}
          />
        </div>
      )}
    </ToolkitProvider>
    <Code>{remoteSearchSourceCode}</Code>
  </div>
);

RemoteSearch.propTypes = {
  data: PropTypes.array.isRequired,
  onTableChange: PropTypes.func.isRequired,
};

interface RemoteSearchState {
  data: any;
}

class RemoteSearchComponent extends React.Component<{}, RemoteSearchState> {
  products = productsGenerator(17);

  constructor(props: any) {
    super(props);
    this.state = {
      data: this.products,
    };
  }

  handleTableChange = (type: any, { searchText }) => {
    setTimeout(() => {
      const result = this.products.filter((row: any) => {
        for (let cidx = 0; cidx < remoteSearchColumns.length; cidx += 1) {
          const column = remoteSearchColumns[cidx];
          let targetValue = row[column.dataField];
          if (targetValue !== null && typeof targetValue !== "undefined") {
            targetValue = targetValue.toString().toLowerCase();
            if (targetValue.indexOf(searchText) > -1) {
              return true;
            }
          }
        }
        return false;
      });
      this.setState(() => ({
        data: result,
      }));
    }, 2000);
  };

  render() {
    return (
      <RemoteSearch
        data={this.state.data}
        onTableChange={this.handleTableChange}
      />
    );
  }
}

export default ({ mode }) => {
  switch (mode) {
    case "sort":
      return <RemoteSortComponent />;
    case "filter":
      return <RemoteFilterComponent />;
    case "pagination":
      return <RemotePaginationComponent />;
    case "search":
      return <RemoteSearchComponent />;
  }
};
