/* eslint-disable import/no-anonymous-default-export */
import PropTypes from "prop-types";
import React from "react";

import BootstrapTable from "../../../react-bootstrap-table-nextgen";
import cellEditFactory from "../../../react-bootstrap-table-nextgen-editor";
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

const remoteCellEditSourceCode = `\
import BootstrapTable from 'react-bootstrap-table-nextgen';
import cellEditFactory from 'react-bootstrap-table-nextgen-editor';
// ...

const RemoteCellEdit = (props) => {
  const cellEdit = {
    mode: 'click',
    errorMessage: props.errorMessage
  };

  return (
    <div>
      <BootstrapTable
        remote={ { cellEdit: true } }
        keyField="id"
        data={ props.data }
        columns={ columns }
        cellEdit={ cellEditFactory(cellEdit) }
        onTableChange={ props.onTableChange }
      />
      <Code>{ sourceCode }</Code>
    </div>
  );
};

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: products,
      errorMessage: null
    };
  }

  handleTableChange = (type, { data, cellEdit: { rowId, dataField, newValue } }) => {
    setTimeout(() => {
      if (newValue === 'test' && dataField === 'name') {
        this.setState(() => ({
          data,
          errorMessage: 'Oops, product name shouldn't be "test"'
        }));
      } else {
        const result = data.map((row) => {
          if (row.id === rowId) {
            const newRow = { ...row };
            newRow[dataField] = newValue;
            return newRow;
          }
          return row;
        });
        this.setState(() => ({
          data: result,
          errorMessage: null
        }));
      }
    }, 2000);
  }

  render() {
    return (
      <RemoteCellEdit
        data={ this.state.data }
        errorMessage={ this.state.errorMessage }
        onTableChange={ this.handleTableChange }
      />
    );
  }
}
`;

const RemoteCellEdit = (props: any) => {
  const cellEdit = {
    mode: "click",
    errorMessage: props.errorMessage,
  };

  return (
    <div>
      <BootstrapTable
        remote={{ cellEdit: true }}
        keyField="id"
        data={props.data}
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
        cellEdit={cellEditFactory(cellEdit)}
        onTableChange={props.onTableChange}
      />
      <Code>{remoteCellEditSourceCode}</Code>
    </div>
  );
};

RemoteCellEdit.propTypes = {
  data: PropTypes.array.isRequired,
  onTableChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

interface RemoteCellEditState {
  data: any;
  errorMessage: string;
}

class RemoteCellEditComponent extends React.Component<{}, RemoteCellEditState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: productsGenerator(),
      errorMessage: "",
    };
  }

  handleTableChange = (
    type: any,
    { data, cellEdit: { rowId, dataField, newValue } }
  ) => {
    setTimeout(() => {
      if (newValue === "test" && dataField === "name") {
        this.setState(() => ({
          data,
          errorMessage: 'Oops, product name shouldn\'t be "test"',
        }));
      } else {
        const result = data.map((row: any) => {
          if (row.id === rowId) {
            const newRow = { ...row };
            newRow[dataField] = newValue;
            return newRow;
          }
          return row;
        });
        this.setState(() => ({
          data: result,
          errorMessage: "",
        }));
      }
    }, 2000);
  };

  render() {
    return (
      <RemoteCellEdit
        data={this.state.data}
        errorMessage={this.state.errorMessage}
        onTableChange={this.handleTableChange}
      />
    );
  }
}

const remoteAllSourceCode = `\
import BootstrapTable from 'react-bootstrap-table-nextgen';
import paginationFactory from 'react-bootstrap-table-nextgen-paginator';
import cellEditFactory from 'react-bootstrap-table-nextgen-editor';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table-nextgen-filter';
// ...

const columns = [{
  dataField: 'id',
  text: 'Product ID',
  sort: true
}, {
  dataField: 'name',
  text: 'Product Name',
  filter: textFilter({
    defaultValue: '8'
  }),
  sort: true
}, {
  dataField: 'price',
  text: 'Product Price',
  filter: textFilter(),
  sort: true
}];

const defaultSorted = [{
  dataField: 'name',
  order: 'desc'
}];

const cellEditProps = {
  mode: 'click'
};

const RemoteAll = ({ data, page, sizePerPage, onTableChange, totalSize }) => (
  <div>
    <BootstrapTable
      remote
      keyField="id"
      data={ data }
      columns={ columns }
      defaultSorted={ defaultSorted }
      filter={ filterFactory() }
      pagination={ paginationFactory({ page, sizePerPage, totalSize }) }
      cellEdit={ cellEditFactory(cellEditProps) }
      onTableChange={ onTableChange }
    />
    <Code>{ sourceCode }</Code>
  </div>
);

RemoteAll.propTypes = {
  data: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  totalSize: PropTypes.number.isRequired,
  sizePerPage: PropTypes.number.isRequired,
  onTableChange: PropTypes.func.isRequired
};

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      data: products.slice(0, 10),
      totalSize: products.length,
      sizePerPage: 10
    };
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  handleTableChange = (type, { page, sizePerPage, filters, sortField, sortOrder, cellEdit }) => {
    const currentIndex = (page - 1) * sizePerPage;
    setTimeout(() => {
      // Handle cell editing
      if (type === 'cellEdit') {
        const { rowId, dataField, newValue } = cellEdit;
        products = products.map((row) => {
          if (row.id === rowId) {
            const newRow = { ...row };
            newRow[dataField] = newValue;
            return newRow;
          }
          return row;
        });
      }
      let result = products;

      // Handle column filters
      result = result.filter((row) => {
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
      // Handle column sort
      if (sortOrder === 'asc') {
        result = result.sort((a, b) => {
          if (a[sortField] > b[sortField]) {
            return 1;
          } else if (b[sortField] > a[sortField]) {
            return -1;
          }
          return 0;
        });
      } else {
        result = result.sort((a, b) => {
          if (a[sortField] > b[sortField]) {
            return -1;
          } else if (b[sortField] > a[sortField]) {
            return 1;
          }
          return 0;
        });
      }
      this.setState(() => ({
        page,
        data: result.slice(currentIndex, currentIndex + sizePerPage),
        totalSize: result.length,
        sizePerPage
      }));
    }, 2000);
  }

  render() {
    const { data, sizePerPage, page } = this.state;
    return (
      <RemoteAll
        data={ data }
        page={ page }
        sizePerPage={ sizePerPage }
        totalSize={ this.state.totalSize }
        onTableChange={ this.handleTableChange }
      />
    );
  }
}
`;

const RemoteAll = ({ data, page, sizePerPage, onTableChange, totalSize }) => (
  <div>
    <h3>
      When <code>remote.pagination</code> is enabled, the filtering, sorting and
      searching will also change to remote mode automatically
    </h3>
    <BootstrapTable
      remote
      keyField="id"
      data={data}
      columns={[
        {
          dataField: "id",
          text: "Product ID",
          sort: true,
        },
        {
          dataField: "name",
          text: "Product Name",
          filter: textFilter({
            defaultValue: "8",
          }),
          sort: true,
        },
        {
          dataField: "price",
          text: "Product Price",
          filter: textFilter(),
          sort: true,
        },
      ]}
      defaultSorted={[
        {
          dataField: "name",
          order: "desc",
        },
      ]}
      filter={filterFactory()}
      pagination={paginationFactory({ page, sizePerPage, totalSize })}
      onTableChange={onTableChange}
      cellEdit={cellEditFactory({
        mode: "click",
      })}
    />
    <Code>{remoteAllSourceCode}</Code>
  </div>
);

RemoteAll.propTypes = {
  data: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  totalSize: PropTypes.number.isRequired,
  sizePerPage: PropTypes.number.isRequired,
  onTableChange: PropTypes.func.isRequired,
};

let products = productsGenerator(87);

interface RemoteAllState {
  data: any;
  sizePerPage: number;
  page: number;
  totalSize: number;
}

class RemoteAllComponent extends React.Component<{}, RemoteAllState> {
  constructor(props: any) {
    super(props);
    this.state = {
      page: 1,
      data: products.slice(0, 10),
      totalSize: products.length,
      sizePerPage: 10,
    };
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  handleTableChange = (
    type: any,
    { page, sizePerPage, filters, sortField, sortOrder, cellEdit }
  ) => {
    const currentIndex = (page - 1) * sizePerPage;
    setTimeout(() => {
      // Handle cell editing
      if (type === "cellEdit") {
        const { rowId, dataField, newValue } = cellEdit;
        products = products.map((row: any) => {
          if (row.id === rowId) {
            const newRow = { ...row };
            newRow[dataField] = newValue;
            return newRow;
          }
          return row;
        });
      }
      let result = products;
      // Handle column filters
      result = result.filter((row: any) => {
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
      // Handle column sort
      if (sortOrder === "asc") {
        result = result.sort((a: any, b: any) => {
          if (a[sortField] > b[sortField]) {
            return 1;
          } else if (b[sortField] > a[sortField]) {
            return -1;
          }
          return 0;
        });
      } else {
        result = result.sort((a: any, b: any) => {
          if (a[sortField] > b[sortField]) {
            return -1;
          } else if (b[sortField] > a[sortField]) {
            return 1;
          }
          return 0;
        });
      }
      this.setState(() => ({
        page,
        data: result.slice(currentIndex, currentIndex + sizePerPage),
        totalSize: result.length,
        sizePerPage,
      }));
    }, 2000);
  };

  render() {
    const { data, sizePerPage, page } = this.state;
    return (
      <RemoteAll
        data={data}
        page={page}
        sizePerPage={sizePerPage}
        totalSize={this.state.totalSize}
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
    case "edit":
      return <RemoteCellEditComponent />;
    case "all":
      return <RemoteAllComponent />;
  }
};
