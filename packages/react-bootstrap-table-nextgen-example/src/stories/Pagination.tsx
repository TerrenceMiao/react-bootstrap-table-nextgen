/* eslint-disable import/no-anonymous-default-export */
import React from "react";

import BootstrapTable from "../../../react-bootstrap-table-nextgen";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
  PaginationTotalStandalone,
  SizePerPageDropdownStandalone,
} from "../../../react-bootstrap-table-nextgen-paginator";
import filterFactory, { selectFilter, textFilter } from "../../../react-bootstrap-table-nextgen-filter";
import ToolkitProvider, { Search } from "../../../react-bootstrap-table-nextgen-toolkit";
import Code from "../components/common/code-block";

import "../../../react-bootstrap-table-nextgen-filter/style/react-bootstrap-table-nextgen-filter.scss";
import "../../../react-bootstrap-table-nextgen-paginator/style/react-bootstrap-table-nextgen-paginator.scss";
import "../../../react-bootstrap-table-nextgen-toolkit/style/react-bootstrap-table-nextgen-toolkit.scss";
import "../../../react-bootstrap-table-nextgen/style/react-bootstrap-table-nextgen.scss";
import { productsGenerator, productsQualityGenerator } from "../utils/common";
import "./stylesheet/storybook.scss";
import "./stylesheet/tomorrow.min.css";

interface Book {
  id: string;
  name: string;
}

interface BookListState {
  books: Book[];
}

class BookList extends React.Component<{}, BookListState> {
  state: BookListState = {
    books: [
      { id: "1", name: "Book 1" },
      { id: "2", name: "Book 2" },
      { id: "3", name: "Book 3" },
      { id: "4", name: "Book 4" },
      { id: "5", name: "Book 5" },
      { id: "6", name: "Book 6" },
      { id: "7", name: "Book 7" },
      { id: "8", name: "Book 8" },
      { id: "9", name: "Book 9" },
      { id: "10", name: "Book 10" },
      { id: "11", name: "Book 11" },
    ],
  };

  deleteBookWithId = () => {
    const lastOneId = this.state.books.length;
    const updatedBooks = this.state.books.filter(
      (m) => m.id !== lastOneId.toString()
    );
    this.setState({ books: updatedBooks });
  };

  addBook = () => {
    const lastOneId = this.state.books.length + 1;
    this.setState({
      books: [
        ...this.state.books,
        {
          id: `${lastOneId}`,
          name: `Book ${lastOneId}`,
        },
      ],
    });
  };

  render() {
    const options = {
      sizePerPage: 5,
      hideSizePerPage: true,
      hidePageListOnlyOnePage: true,
    };
    const columns = [
      {
        dataField: "id",
        text: "Product ID",
        formatter: (cell: string) => (
          <div>
            <span title={cell}>{cell}</span>
          </div>
        ),
      },
      {
        dataField: "name",
        text: "Product Name",
      },
    ];
    const sourceCode = `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import paginationFactory from 'react-bootstrap-table-nextgen-paginator';

    class BookList extends React.Component {
      state = {
        books: [
          { id: '1', name: 'Book 1' },
          { id: '2', name: 'Book 2' },
          { id: '3', name: 'Book 3' },
          { id: '4', name: 'Book 4' },
          { id: '5', name: 'Book 5' },
          { id: '6', name: 'Book 6' }
        ]
      };

      deleteBookWithId = () => {
        const lastOneId = this.state.books.length;
        const updatedBooks = this.state.books.filter(m => m.id !== lastOneId.toString());
        this.setState({ books: updatedBooks });
      };

      addBook = () => {
        const lastOneId = this.state.books.length + 1;
        this.setState({ books: [...this.state.books, {
          id: \`$\{lastOneId}\`, name: \`Book $\{lastOneId}\`
        }] });
      }

      render() {
        const options = {
          // pageStartIndex: 0,
          sizePerPage: 5,
          hideSizePerPage: true,
          hidePageListOnlyOnePage: true
        };
        const columns = [
          {
            dataField: 'id',
            text: 'Product ID',
            Cell: row => (
              <div>
                <span title={ row.value }>{ row.value }</span>
              </div>
            )
          },
          {
            dataField: 'name',
            text: 'Product Name'
          }
        ];

        return (
          <React.Fragment>
            <BootstrapTable
              keyField="id"
              data={ this.state.books }
              columns={ columns }
              pagination={ paginationFactory(options) }
            />
            <button className="btn btn-default" onClick={ () => this.deleteBookWithId() }>
              delete last one book
            </button>
            <button className="btn btn-default" onClick={ () => this.addBook() }>
              Add a book to the end
            </button>
            <Code>{ sourceCode }</Code>
          </React.Fragment>
        );
      }
    `;

    return (
      <React.Fragment>
        <BootstrapTable
          keyField="id"
          data={this.state.books}
          columns={columns}
          pagination={paginationFactory(options)}
        />
        <button className="btn btn-default" onClick={this.deleteBookWithId}>
          delete last one book
        </button>
        <button className="btn btn-default" onClick={this.addBook}>
          Add a book to the end
        </button>
        <Code>{sourceCode}</Code>
      </React.Fragment>
    );
  }
}

interface StandalonePaginationListProps {}

class StandalonePaginationList extends React.Component<StandalonePaginationListProps> {
  products = productsGenerator(87);
  columns = [
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
  options = {
    custom: true,
    totalSize: this.products.length,
  };
  sourceCode = `\
  import BootstrapTable from 'react-bootstrap-table-nextgen';
  import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table-nextgen-paginator';

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

  const options = {
    custom: true,
    totalSize: products.length
  };

  <PaginationProvider
    pagination={ paginationFactory(options) }
  >
    {
      ({
        paginationProps,
        paginationTableProps
      }) => (
        <div>
          <PaginationListStandalone
            { ...paginationProps }
          />
          <BootstrapTable
            keyField="id"
            data={ products }
            columns={ columns }
            { ...paginationTableProps }
          />
        </div>
      )
    }
  </PaginationProvider>
  `;

  render() {
    return (
      <div>
        <PaginationProvider
          pagination={paginationFactory(this.options)}
          data={this.products}
          remoteEmitter={{}}
          isRemotePagination={() => false}
        >
          {({ paginationProps, paginationTableProps }) => (
            <div>
              <PaginationListStandalone {...paginationProps} />
              <BootstrapTable
                keyField="id"
                columns={this.columns}
                data={this.products}
                {...paginationTableProps}
              />
            </div>
          )}
        </PaginationProvider>
        <Code>{this.sourceCode}</Code>
      </div>
    );
  }
}

interface StandaloneSizePerPageProps {}

class StandaloneSizePerPage extends React.Component<StandaloneSizePerPageProps> {
  render() {
    const products = productsGenerator(87);
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
    const options = {
      custom: true,
      totalSize: products.length,
    };
    const sourceCode = `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone } from 'react-bootstrap-table-nextgen-paginator';

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

    const options = {
      custom: true,
      totalSize: products.length
    };

    <PaginationProvider
      pagination={ paginationFactory(options) }
    >
      {
        ({
          paginationProps,
          paginationTableProps
        }) => (
          <div>
            <SizePerPageDropdownStandalone
              { ...paginationProps }
            />
            <BootstrapTable
              keyField="id"
              data={ products }
              columns={ columns }
              { ...paginationTableProps }
            />
          </div>
        )
      }
    </PaginationProvider>
    `;

    return (
      <div>
        <PaginationProvider
          // bootstrap4
          pagination={paginationFactory(options)}
          data={products}
          remoteEmitter={{}}
          isRemotePagination={() => false}
        >
          {({ paginationProps, paginationTableProps }) => (
            <div>
              <SizePerPageDropdownStandalone
                {...paginationProps}
                btnContextual="btn btn-warning"
              />
              <BootstrapTable
                keyField="id"
                columns={columns}
                data={products}
                {...paginationTableProps}
              />
            </div>
          )}
        </PaginationProvider>
        <Code>{sourceCode}</Code>
      </div>
    );
  }
}

interface StandalonePaginationTotalProps {}

class StandalonePaginationTotal extends React.Component<StandalonePaginationTotalProps> {
  render() {
    const products = productsGenerator(87);
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
    const options = {
      custom: true,
      totalSize: products.length,
    };
    const sourceCode = `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import paginationFactory, { PaginationProvider, PaginationTotalStandalone, PaginationListStandalone } from 'react-bootstrap-table-nextgen-paginator';

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

    const options = {
      custom: true,
      totalSize: products.length
    };

    <PaginationProvider
      pagination={ paginationFactory(options) }
    >
      {
        ({
          paginationProps,
          paginationTableProps
        }) => (
          <div>
            <PaginationTotalStandalone
              { ...paginationProps }
            />
            <PaginationListStandalone
              { ...paginationProps }
            />
            <BootstrapTable
              keyField="id"
              data={ products }
              columns={ columns }
              { ...paginationTableProps }
            />
          </div>
        )
      }
    </PaginationProvider>
    `;

    return (
      <div>
        <PaginationProvider
          pagination={paginationFactory(options)}
          data={products}
          remoteEmitter={{}}
          isRemotePagination={() => false}
        >
          {({ paginationProps, paginationTableProps }) => (
            <div>
              <PaginationTotalStandalone {...paginationProps} />
              <PaginationListStandalone {...paginationProps} />
              <BootstrapTable
                keyField="id"
                columns={columns}
                data={products}
                {...paginationTableProps}
              />
            </div>
          )}
        </PaginationProvider>
        <Code>{sourceCode}</Code>
      </div>
    );
  }
}

interface FullyCustomPaginationProps {}

class FullyCustomPagination extends React.Component<FullyCustomPaginationProps> {
  handleNextPage =
    ({ page, onPageChange }) =>
    () => {
      onPageChange(page + 1);
    };

  handlePrevPage =
    ({ page, onPageChange }) =>
    () => {
      onPageChange(page - 1);
    };

  handleSizePerPage = (
    { page, onSizePerPageChange },
    newSizePerPage: number
  ) => {
    onSizePerPageChange(newSizePerPage, page);
  };

  render() {
    const products = productsGenerator(87);
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
    const options = {
      custom: true,
      totalSize: products.length,
    };
    const sourceCode = `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import paginationFactory from 'react-bootstrap-table-nextgen-paginator';

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

    const options = {
      custom: true,
      totalSize: products.length
    };

    class FullyCustomPagination extends React.Component {
      handleNextPage = ({
        page,
        onPageChange
      }) => () => {
        onPageChange(page + 1);
      }

      handlePrevPage = ({
        page,
        onPageChange
      }) => () => {
        onPageChange(page - 1);
      }

      handleSizePerPage = ({
        page,
        onSizePerPageChange
      }, newSizePerPage) => {
        onSizePerPageChange(newSizePerPage, page);
      }

      render() {
        return (
          <div>
            <PaginationProvider
              pagination={ paginationFactory(options) }
            >
              {
                ({
                  paginationProps,
                  paginationTableProps
                }) => (
                  <div>
                    <div>
                      <p>Current Page: { paginationProps.page }</p>
                      <p>Current SizePerPage: { paginationProps.sizePerPage }</p>
                    </div>
                    <div className="btn-group" role="group">
                      <button className="btn btn-success" onClick={ this.handlePrevPage(paginationProps) }>Prev Page</button>
                      <button className="btn btn-primary" onClick={ this.handleNextPage(paginationProps) }>Next Page</button>
                      <button className="btn btn-danger" onClick={ () => this.handleSizePerPage(paginationProps, 10) }>Size Per Page: 10</button>
                      <button className="btn btn-warning" onClick={ () => this.handleSizePerPage(paginationProps, 25) }>Size Per Page: 25</button>
                    </div>
                    <BootstrapTable
                      keyField="id"
                      data={ products }
                      columns={ columns }
                      { ...paginationTableProps }
                    />
                  </div>
                )
              }
            </PaginationProvider>
            <Code>{ sourceCode }</Code>
          </div>
        );
      }
    }
    `;

    return (
      <div>
        <PaginationProvider
          pagination={paginationFactory(options)}
          data={products}
          remoteEmitter={{}}
          isRemotePagination={() => false}
        >
          {({ paginationProps, paginationTableProps }: any) => (
            <div>
              <div>
                <p>Current Page: {paginationProps.page}</p>
                <p>Current SizePerPage: {paginationProps.sizePerPage}</p>
              </div>
              <div className="btn-group" role="group">
                <button
                  className="btn btn-success"
                  onClick={this.handlePrevPage(paginationProps)}
                >
                  Prev Page
                </button>
                <button
                  className="btn btn-primary"
                  onClick={this.handleNextPage(paginationProps)}
                >
                  Next Page
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => this.handleSizePerPage(paginationProps, 10)}
                >
                  Size Per Page: 10
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => this.handleSizePerPage(paginationProps, 25)}
                >
                  Size Per Page: 25
                </button>
              </div>
              <BootstrapTable
                keyField="id"
                data={products}
                columns={columns}
                {...paginationTableProps}
              />
            </div>
          )}
        </PaginationProvider>
        <Code>{sourceCode}</Code>
      </div>
    );
  }
}

interface RemoteFullyCustomPaginationProps {}

interface RemoteFullyCustomPaginationState {
  data: any;
  sizePerPage: number;
  page: any;
}

class RemoteFullyCustomPagination extends React.Component<
  RemoteFullyCustomPaginationProps,
  RemoteFullyCustomPaginationState
> {
  products = productsGenerator(87);
  columns = [
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
  sourceCode = `\
  import BootstrapTable from 'react-bootstrap-table-nextgen';
  import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table-nextgen-paginator';
  // ...
  const RemotePagination = ({ data, page, sizePerPage, onTableChange, totalSize }) => (
    <div>
      <PaginationProvider
        pagination={
          paginationFactory({
            custom: true,
            page,
            sizePerPage,
            totalSize
          })
        }
      >
        {
          ({
            paginationProps,
            paginationTableProps
          }) => (
            <div>
              <div>
                <p>Current Page: { paginationProps.page }</p>
                <p>Current SizePerPage: { paginationProps.sizePerPage }</p>
              </div>
              <div>
                <PaginationListStandalone
                  { ...paginationProps }
                />
              </div>
              <BootstrapTable
                remote
                keyField="id"
                data={ data }
                columns={ columns }
                onTableChange={ onTableChange }
                { ...paginationTableProps }
              />
            </div>
          )
        }
      </PaginationProvider>
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

  constructor(props: RemoteFullyCustomPaginationProps) {
    super(props);
    this.state = {
      page: 1,
      data: this.products.slice(0, 10),
      sizePerPage: 10,
    };
  }

  handleTableChange = (type: string, { page, sizePerPage }) => {
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
      <div>
        <PaginationProvider
          pagination={paginationFactory({
            custom: true,
            page,
            sizePerPage,
            totalSize: this.products.length,
          })}
          data={this.products}
          remoteEmitter={{}}
          isRemotePagination={() => false}
        >
          {({ paginationProps, paginationTableProps }: any) => (
            <div>
              <div>
                <p>Current Page: {paginationProps.page}</p>
                <p>Current SizePerPage: {paginationProps.sizePerPage}</p>
              </div>
              <div>
                <PaginationListStandalone {...paginationProps} />
              </div>
              <BootstrapTable
                remote
                keyField="id"
                data={data}
                columns={this.columns}
                onTableChange={this.handleTableChange}
                {...paginationTableProps}
              />
            </div>
          )}
        </PaginationProvider>
        <Code>{this.sourceCode}</Code>
      </div>
    );
  }
}

interface PaginationFilterState {
  products: any[]; // Adjust the type as per your data structure
}

class PaginationFilter extends React.Component<{}, PaginationFilterState> {
  constructor(props: {}) {
    super(props);
    this.state = { products: productsQualityGenerator(21) };
  }

  loadData = () => {
    this.setState({ products: productsQualityGenerator(40, 7) });
  }

  render() {
    const selectOptions = {
      0: 'good',
      1: 'Bad',
      2: 'unknown'
    };
    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      filter: textFilter()
    }, {
      dataField: 'quality',
      text: 'Product Quailty',
      formatter: (cell: any) => selectOptions[cell],
      filter: selectFilter({
        options: selectOptions,
        defaultValue: 0
      })
    }];
    const options = {
      custom: true,
      paginationSize: 4,
      pageStartIndex: 1,
      firstPageText: 'First',
      prePageText: 'Back',
      nextPageText: 'Next',
      lastPageText: 'Last',
      nextPageTitle: 'First page',
      prePageTitle: 'Pre page',
      firstPageTitle: 'Next page',
      lastPageTitle: 'Last page',
      showTotal: true,
      totalSize: this.state.products.length,
    };
    const sourceCode = `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table-nextgen-paginator';
    import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table-nextgen-filter';

    const selectOptions = {
      0: 'good',
      1: 'Bad',
      2: 'unknown'
    };

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      filter: textFilter()
    }, {
      dataField: 'quality',
      text: 'Product Quailty',
      formatter: cell => selectOptions[cell],
      filter: selectFilter({
        options: selectOptions,
        defaultValue: 0
      })
    }];

    class Table extends React.Component {
      state = { products }

      loadData = () => {
        this.setState({ products: productsQualityGenerator(40, 7) });
      }

      render() {
        const options = {
          custom: true,
          paginationSize: 4,
          pageStartIndex: 1,
          firstPageText: 'First',
          prePageText: 'Back',
          nextPageText: 'Next',
          lastPageText: 'Last',
          nextPageTitle: 'First page',
          prePageTitle: 'Pre page',
          firstPageTitle: 'Next page',
          lastPageTitle: 'Last page',
          showTotal: true,
          totalSize: this.state.products.length
        };
        const contentTable = ({ paginationProps, paginationTableProps }) => (
          <div>
            <button className="btn btn-default" onClick={ this.loadData }>Load Another Data</button>
            <PaginationListStandalone { ...paginationProps } />
            <div>
              <div>
                <BootstrapTable
                  striped
                  hover
                  keyField="id"
                  data={ this.state.products }
                  columns={ columns }
                  filter={ filterFactory() }
                  { ...paginationTableProps }
                />
              </div>
            </div>
            <PaginationListStandalone { ...paginationProps } />
          </div>
        );

        return (
          <div>
            <h2>PaginationProvider will care the data size change. You dont do anything</h2>
            <PaginationProvider
              pagination={
                paginationFactory(options)
              }
            >
              { contentTable }
            </PaginationProvider>
          </div >
        );
      }
    }
    `;

    const contentTable = ({ paginationProps, paginationTableProps }) => (
      <div>
        <button className="btn btn-default" onClick={this.loadData}>Load Another Data</button>
        <PaginationListStandalone {...paginationProps} />
        <div>
          <BootstrapTable
            striped
            hover
            keyField="id"
            data={this.state.products}
            columns={columns}
            filter={filterFactory()}
            {...paginationTableProps}
          />
        </div>
      </div>
    );

    return (
      <div>
        <h2>PaginationProvider will care the data size change. You don't do anything</h2>
        <PaginationProvider
          pagination={paginationFactory(options)}
          data={this.state.products}
          remoteEmitter={{}}
          isRemotePagination={() => false}
        >
          {contentTable}
        </PaginationProvider>
        <Code>{sourceCode}</Code>
      </div >
    );
  }
}

interface PaginationSearchState {
  products: any[]; // Adjust the type as per your data structure
}

class PaginationSearch extends React.Component<{}, PaginationSearchState> {
  constructor(props: {}) {
    super(props);
    this.state = { products: productsGenerator(40) };
  }

  loadData = () => {
    this.setState({ products: productsGenerator(17) });
  }

  render() {
    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }];
    const options = {
      custom: true,
      paginationSize: 4,
      pageStartIndex: 1,
      firstPageText: 'First',
      prePageText: 'Back',
      nextPageText: 'Next',
      lastPageText: 'Last',
      nextPageTitle: 'First page',
      prePageTitle: 'Pre page',
      firstPageTitle: 'Next page',
      lastPageTitle: 'Last page',
      showTotal: true,
      totalSize: this.state.products.length,
    };
    const sourceCode = `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table-nextgen-paginator';
    import filterFactory, { textFilter } from 'react-bootstrap-table-nextgen-filter';

    class Table extends React.Component {
      state = { products }

      loadData = () => {
        this.setState({ products: productsGenerator(17) });
      }

      render() {
        const options = {
          custom: true,
          paginationSize: 4,
          pageStartIndex: 1,
          firstPageText: 'First',
          prePageText: 'Back',
          nextPageText: 'Next',
          lastPageText: 'Last',
          nextPageTitle: 'First page',
          prePageTitle: 'Pre page',
          firstPageTitle: 'Next page',
          lastPageTitle: 'Last page',
          showTotal: true,
          totalSize: this.state.products.length
        };
        const contentTable = ({ paginationProps, paginationTableProps }) => (
          <div>
            <button className="btn btn-default" onClick={ this.loadData }>Load Another Data</button>
            <PaginationListStandalone { ...paginationProps } />
            <ToolkitProvider
              keyField="id"
              columns={ columns }
              data={ this.state.products }
              search
            >
              {
                toolkitprops => (
                  <div>
                    <SearchBar { ...toolkitprops.searchProps } />
                    <BootstrapTable
                      striped
                      hover
                      { ...toolkitprops.baseProps }
                      { ...paginationTableProps }
                    />
                  </div>
                )
              }
            </ToolkitProvider>
            <PaginationListStandalone { ...paginationProps } />
          </div>
        );

        return (
          <div>
            <h2>PaginationProvider will care the data size change. You dont do anything</h2>
            <PaginationProvider
              pagination={
                paginationFactory(options)
              }
            >
              { contentTable }
            </PaginationProvider>
            <Code>{ sourceCode }</Code>
          </div >
        );
      }
    }
    `;

    const { SearchBar } = Search;

    const contentTable = ({ paginationProps, paginationTableProps }) => (
      <div>
        <button className="btn btn-default" onClick={this.loadData}>Load Another Data</button>
        <PaginationListStandalone {...paginationProps} />
        <ToolkitProvider
          keyField="id"
          columns={columns}
          data={this.state.products}
          search
        >
          {
            toolkitprops => (
              <div>
                <SearchBar {...toolkitprops.searchProps} />
                <BootstrapTable
                  striped
                  hover
                  {...toolkitprops.baseProps}
                  {...paginationTableProps}
                />
              </div>
            )
          }
        </ToolkitProvider>
      </div>
    );

    return (
      <div>
        <h2>PaginationProvider will care the data size change. You don't do anything</h2>
        <PaginationProvider
          pagination={paginationFactory(options)}
          data={this.state.products}
          remoteEmitter={{}}
          isRemotePagination={() => false}
        >
          {contentTable}
        </PaginationProvider>
        <Code>{sourceCode}</Code>
      </div>
    );
  }
}

export default ({ mode, data, columns, sourceCode, pagination }) => {
  switch (mode) {
    case "dynamic":
      return (
        <div>
          <BookList />
        </div>
      );
    case "standalone-list":
      return (
        <div>
          <StandalonePaginationList />
        </div>
      );
    case "standalone-dropdown":
      return (
        <div>
          <StandaloneSizePerPage />
        </div>
      );
    case "standalone-total":
      return (
        <div>
          <StandalonePaginationTotal />
        </div>
      );
    case "full":
      return (
        <div>
          <FullyCustomPagination />
        </div>
      );
    case "remote-full":
      return (
        <div>
          <RemoteFullyCustomPagination />
        </div>
      );
    case "filter":
      return (
        <div>
          <PaginationFilter />
        </div>
      );
    case "search":
      return (
        <div>
          <PaginationSearch />
        </div>
      );
    default:
      return (
        <div>
          <BootstrapTable
            keyField="id"
            data={data}
            columns={columns}
            pagination={pagination}
          />
          <Code>{sourceCode}</Code>
        </div>
      );
  }
};
