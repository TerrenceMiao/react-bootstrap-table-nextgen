/* eslint-disable jsx-a11y/anchor-is-valid */
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// import bootstrap style by given version
import paginationFactory from "../../../react-bootstrap-table-nextgen-paginator";
import { columns, productsGenerator } from '../utils/common';
import BootstrapTable from './Pagination';
import bootstrapStyle from './bootstrap-style';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Pagination',
  component: BootstrapTable,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'text', description: 'mode' },
    data: { control: 'object', description: 'table data' },
    columns: { control: 'object', description: 'table columns' },
    sourceCode: { control: 'text', description: 'source code of the table' },
    pagination: { control: 'object', description: 'table pagination' },
  },
  decorators: [
    (Story: any) => bootstrapStyle()(Story),
  ],
} satisfies Meta<typeof BootstrapTable>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const BasicPaginationTable: Story = {
  name: "Basic pagination table",
  args: {
    columns: columns,
    data: productsGenerator(87),
    sourceCode: `\
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

    <BootstrapTable keyField='id' data={ products } columns={ columns } pagination={ paginationFactory() } />
    `,
    pagination: paginationFactory(),
  }
};

export const PaginationHooks: Story = {
  name: "Pagination hooks",
  args: {
    columns: columns,
    data: productsGenerator(87),
    sourceCode: `\
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
      onSizePerPageChange: (sizePerPage, page) => {
        console.log('Size per page change!!!');
        console.log('Newest size per page:' + sizePerPage);
        console.log('Newest page:' + page);
      },
      onPageChange: (page, sizePerPage) => {
        console.log('Page change!!!');
        console.log('Newest size per page:' + sizePerPage);
        console.log('Newest page:' + page);
      }
    };

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      pagination={ paginationFactory(options) }
    />
    `,
    pagination: paginationFactory({
      onSizePerPageChange: (sizePerPage: number, page: any) => {
        console.log('Size per page change!!!');
        console.log(`Newest size per page: ${sizePerPage}`);
        console.log(`Newest page: ${page}`);
      },
      onPageChange: (page: any, sizePerPage: number) => {
        console.log('Page change!!!');
        console.log(`Newest size per page: ${sizePerPage}`);
        console.log(`Newest page: ${page}`);
      }
    }),
  }
};

export const PaginationWithDynamicData: Story = {
  name: "Pagination with dynamic data",
  args: {
    mode: "dynamic",
  }
};

const customTotal = (from: number, to: number, size: number) => (
  <span className="react-bootstrap-table-pagination-total">
    Showing { from } to { to } of { size } Results
  </span>
);

const customPaginationProducts = productsGenerator(87);

export const CustomPagination: Story = {
  name: "Custom pagination",
  args: {
    columns: columns,
    data: customPaginationProducts,
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import paginationFactory from 'react-bootstrap-table-nextgen-paginator';
    // ...

    const customTotal = (from, to, size) => (
      <span className="react-bootstrap-table-pagination-total">
        Showing { from } to { to } of { size } Results
      </span>
    );

    const options = {
      paginationSize: 4,
      pageStartIndex: 0,
      // alwaysShowAllBtns: true, // Always show next and previous button
      // withFirstAndLast: false, // Hide the going to First and Last page button
      // hideSizePerPage: true, // Hide the sizePerPage dropdown always
      // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
      firstPageText: 'First',
      prePageText: 'Back',
      nextPageText: 'Next',
      lastPageText: 'Last',
      nextPageTitle: 'First page',
      prePageTitle: 'Pre page',
      firstPageTitle: 'Next page',
      lastPageTitle: 'Last page',
      showTotal: true,
      paginationTotalRenderer: customTotal,
      disablePageTitle: true,
      sizePerPageList: [{
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: 'All', value: products.length
      }] // A numeric array is also available. the purpose of above example is custom the text
    };

    <BootstrapTable keyField='id' data={ products } columns={ columns } pagination={ paginationFactory(options) } />
    `,
    pagination: paginationFactory({
      paginationSize: 4,
      pageStartIndex: 0,
      // alwaysShowAllBtns: true, // Always show next and previous button
      // withFirstAndLast: false, // Hide the going to First and Last page button
      // hideSizePerPage: true, // Hide the sizePerPage dropdown always
      // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
      firstPageText: 'First',
      prePageText: 'Back',
      nextPageText: <span>Next</span>,
      lastPageText: 'Last',
      nextPageTitle: 'First page',
      prePageTitle: 'Pre page',
      firstPageTitle: 'Next page',
      lastPageTitle: 'Last page',
      showTotal: true,
      paginationTotalRenderer: customTotal,
      disablePageTitle: true,
      sizePerPageList: [{
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: 'All', value: customPaginationProducts.length
      }] // A numeric array is also available. the purpose of above example is custom the text
    }),
  }
};

const pageButtonRenderer = ({
  page,
  active,
  disable,
  title,
  onPageChange
}) => {
  const handleClick = (e: any) => {
    e.preventDefault();
    onPageChange(page);
  };
  const activeStyle: { backgroundColor?: string, color?: string } = {};
  if (active) {
    activeStyle.backgroundColor = 'black';
    activeStyle.color = 'white';
  } else {
    activeStyle.backgroundColor = 'gray';
    activeStyle.color = 'black';
  }
  if (typeof page === 'string') {
    activeStyle.backgroundColor = 'white';
    activeStyle.color = 'black';
  }
  return (
    <li key={ page } className="page-item">
      <a href="#" onClick={ handleClick } style={ activeStyle }>{ page }</a>
    </li>
  );
};

export const CustomPageButton: Story = {
  name: "Custom page button",
  args: {
    columns: columns,
    data: productsGenerator(87),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import paginationFactory from 'react-bootstrap-table-nextgen-paginator';
    // ...

    const pageButtonRenderer = ({
      page,
      active,
      disable,
      title,
      onPageChange
    }) => {
      const handleClick = (e) => {
        e.preventDefault();
        onPageChange(page);
      };
      const activeStyle = {};
      if (active) {
        activeStyle.backgroundColor = 'black';
        activeStyle.color = 'white';
      } else {
        activeStyle.backgroundColor = 'gray';
        activeStyle.color = 'black';
      }
      if (typeof page === 'string') {
        activeStyle.backgroundColor = 'white';
        activeStyle.color = 'black';
      }
      return (
        <li key={ page } className="page-item">
          <a href="#" onClick={ handleClick } style={ activeStyle }>{ page }</a>
        </li>
      );
    };

    const options = {
      pageButtonRenderer
    };

    <BootstrapTable keyField="id" data={ products } columns={ columns } pagination={ paginationFactory(options) } />
    `,
    pagination: paginationFactory({ pageButtonRenderer }),
  }
};

const pageListRenderer = ({
  pages,
  onPageChange
}) => {
  const pageWithoutIndication = pages.filter((p: any) => typeof p.page !== 'string');
  return (
    <div>
      {
        pageWithoutIndication.map((p: any) => (
          <button key={ p.page } className="btn btn-success" onClick={ () => onPageChange(p.page) }>{ p.page }</button>
        ))
      }
    </div>
  );
};

export const CustomPageList: Story = {
  name: "Custom page list",
  args: {
    columns: columns,
    data: productsGenerator(87),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import paginationFactory from 'react-bootstrap-table-nextgen-paginator';
    // ...

    const pageListRenderer = ({
      pages,
      onPageChange
    }) => {
      const pageWithoutIndication = pages.filter(p => typeof p.page !== 'string');
      return (
        <div>
          {
            pageWithoutIndication.map(p => (
              <button key={ p.page } className="btn btn-success" onClick={ () => onPageChange(p.page) }>{ p.page }</button>
            ))
          }
        </div>
      );
    };

    const options = {
      pageListRenderer
    };

    <BootstrapTable keyField="id" data={ products } columns={ columns } pagination={ paginationFactory(options) } />
    `,
    pagination: paginationFactory({ pageListRenderer }),
  }
};

const sizePerPageOptionRenderer = ({
  text,
  page,
  onSizePerPageChange
}) => (
  <li
    key={ text }
    role="presentation"
    className="dropdown-item"
  >
    <a
      href="#"
      // @ts-ignore
      tabIndex="-1"
      role="menuitem"
      data-page={ page }
      onMouseDown={ (e: any) => {
        e.preventDefault();
        onSizePerPageChange(page);
      } }
      style={ { color: 'red' } }
    >
      { text }
    </a>
  </li>
);

export const CustomSizePerPageOption: Story = {
  name: "Custom size per page option",
  args: {
    columns: columns,
    data: productsGenerator(87),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import paginationFactory from 'react-bootstrap-table-nextgen-paginator';
    // ...

    const sizePerPageOptionRenderer = ({
      text,
      page,
      onSizePerPageChange
    }) => (
      <li
        key={ text }
        role="presentation"
        className="dropdown-item"
      >
        <a
          href="#"
          tabIndex="-1"
          role="menuitem"
          data-page={ page }
          onMouseDown={ (e) => {
            e.preventDefault();
            onSizePerPageChange(page);
          } }
          style={ { color: 'red' } }
        >
          { text }
        </a>
      </li>
    );

    const options = {
      sizePerPageOptionRenderer
    };

    <BootstrapTable keyField="id" data={ products } columns={ columns } pagination={ paginationFactory(options) } />
    `,
    pagination: paginationFactory({ sizePerPageOptionRenderer }),
  }
};

const sizePerPageRenderer = ({
  options,
  currSizePerPage,
  onSizePerPageChange
}) => (
  <div className="btn-group" role="group">
    {
      options.map((option: any) => (
        <button
          key={ option.text }
          type="button"
          onClick={ () => onSizePerPageChange(option.page) }
          className={ `btn ${currSizePerPage === `${option.page}` ? 'btn-secondary' : 'btn-warning'}` }
        >
          { option.text }
        </button>
      ))
    }
  </div>
);

export const CustomSizePerPage: Story = {
  name: "Custom size per page",
  args: {
    columns: columns,
    data: productsGenerator(87),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import paginationFactory from 'react-bootstrap-table-nextgen-paginator';
    // ...

    const sizePerPageRenderer = ({
      options,
      currSizePerPage,
      onSizePerPageChange
    }) => (
      <div className="btn-group" role="group">
        {
          options.map((option) => {
            const isSelect = currSizePerPage === \`$\{option.page}\`;
            return (
              <button
                key={ option.text }
                type="button"
                onClick={ () => onSizePerPageChange(option.page) }
                className={ \`btn $\{isSelect ? 'btn-secondary' : 'btn-warning'}\` }
              >
                { option.text }
              </button>
            );
          })
        }
      </div>
    );

    const options = {
      sizePerPageRenderer
    };

    <BootstrapTable keyField="id" data={ products } columns={ columns } pagination={ paginationFactory(options) } />
    `,
    pagination: paginationFactory({ sizePerPageRenderer }),
  }
};

export const StandalonePaginationList: Story = {
  name: "Standalone pagination list",
  args: {
    mode: "standalone-list",
  }
};

export const StandaloneSizePerPageDropdown: Story = {
  name: "Standalone size per page dropdown",
  args: {
    mode: "standalone-dropdown",
  }
};

export const StandalonePaginationTotal: Story = {
  name: "Standalone pagination total",
  args: {
    mode: "standalone-total",
  }
};

export const FullCustomPagination: Story = {
  name: "Full custom pagination",
  args: {
    mode: "full",
  }
};

export const RemoteFullCustomPagination: Story = {
  name: "Remote full custom pagination",
  args: {
    mode: "remote-full",
  }
};

export const CustomPaginationWithFilter: Story = {
  name: "Custom pagination with filter",
  args: {
    mode: "filter",
  }
};

export const CustomPaginationWithSearch: Story = {
  name: "Custom pagination with search",
  args: {
    mode: "search",
  }
};
