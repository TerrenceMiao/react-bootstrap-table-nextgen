import type { Meta, StoryObj } from '@storybook/react';
import PropTypes from "prop-types";
import React from "react";

// import bootstrap style by given version
import filterFactory, { EQ, FILTER_TYPES, GT, LIKE, LT, customFilter, dateFilter, multiSelectFilter, numberFilter, selectFilter, textFilter } from '../../../react-bootstrap-table-nextgen-filter';
import { jobsGenerator1, productsGenerator, productsQualityGenerator, stockGenerator } from '../utils/common';
import BootstrapTable from './ColumnFilter';
import bootstrapStyle from './bootstrap-style';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Column Filter',
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
    header: { control: 'text', description: 'header of the table' },
  },
  decorators: [
    (Story: any) => bootstrapStyle()(Story),
  ],
} satisfies Meta<typeof BootstrapTable>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const TextFilter: Story = {
  name: "Text filter",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID',
      footer: 'hello'
    }, {
      dataField: 'name',
      text: 'Product Name',
      footer: 'hello',
      filter: textFilter({
        id: 'identify'
      })
    }, {
      dataField: 'price',
      text: 'Product Price',
      footer: 'hello',
      filter: textFilter()
    }],
    data: productsGenerator(8),
    sourceCode: `\
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

    <BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
    `,
    filter: filterFactory(),
    selectRow: {
      mode: 'checkbox',
      clickToSelect: true
    },
  }
};

export const TextFilterWithDefaultValue: Story = {
  name: "Text filter with default value",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      filter: textFilter()
    }, {
      dataField: 'price',
      text: 'Product Price',
      filter: textFilter({
        defaultValue: '2103'
      })
    }],
    data: productsGenerator(8),
    sourceCode: `\
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
      filter: textFilter({
        defaultValue: '2103'
      })
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
    `,
    filter: filterFactory(),
  }
};

export const TextFilterWithComparator: Story = {
  name: "Text filter with comparator",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      filter: textFilter({
        comparator: EQ // default is Comparator.LIKE
      })
    }, {
      dataField: 'price',
      text: 'Product Price',
      filter: textFilter()
    }],
    data: productsGenerator(8),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table-nextgen-filter';

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      filter: textFilter({
        comparator: Comparator.EQ
      })
    }, {
      dataField: 'price',
      text: 'Product Price',
      filter: textFilter()
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
    `,
    filter: filterFactory(),
  }
};

export const TextFilterWithCaseSensitive: Story = {
  name: "Text filter with case sensitive",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      filter: textFilter({ caseSensitive: true })
    }, {
      dataField: 'price',
      text: 'Product Price'
    }],
    data: productsGenerator(8),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { textFilter } from 'react-bootstrap-table-nextgen-filter';

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      filter: textFilter({ caseSensitive: true })
    }, {
      dataField: 'price',
      text: 'Product Price'
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
    `,
    filter: filterFactory(),
  }
};

const selectOptions = {
  0: 'good',
  1: 'Bad',
  2: 'unknown'
};

export const SelectFilter: Story = {
  name: "Select filter",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'quality',
      text: 'Product Quailty',
      formatter: (cell: number) => selectOptions[cell],
      filter: selectFilter({
        options: selectOptions
      })
    }],
    data: productsQualityGenerator(6),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { selectFilter } from 'react-bootstrap-table-nextgen-filter';

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
      text: 'Product Name'
    }, {
      dataField: 'quality',
      text: 'Product Quailty',
      formatter: cell => selectOptions[cell],
      filter: selectFilter({
        options: selectOptions
      })
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
    `,
    filter: filterFactory(),
  }
};

const selectOptionsArr = [{
  value: 0,
  label: 'good'
}, {
  value: 1,
  label: 'Bad'
}, {
  value: 2,
  label: 'unknown'
}];

export const ConfigureSelectFilterOptions: Story = {
  name: "Configure select filter options",
  args: {
    mode: "options",
    data: productsQualityGenerator(6),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { selectFilter } from 'react-bootstrap-table-nextgen-filter';

    // Object map options
    const selectOptions = {
      0: 'good',
      1: 'Bad',
      2: 'unknown'
    };

    // Array options
    const selectOptionsArr = [{
      value: 0,
      label: 'good'
    }, {
      value: 1,
      label: 'Bad'
    }, {
      value: 2,
      label: 'unknown'
    }];

    const columns1 = [..., {
      dataField: 'quality',
      text: 'Product Quailty',
      formatter: cell => selectOptions[cell],
      filter: selectFilter({
        options: selectOptions
      })
    }];
    <BootstrapTable keyField='id' data={ products } columns={ columns1 } filter={ filterFactory() } />

    const columns2 = [..., {
      dataField: 'quality',
      text: 'Product Quailty',
      formatter: cell => selectOptionsArr.filter(opt => opt.value === cell)[0].label || '',
      filter: selectFilter({
        options: selectOptionsArr
      })
    }];
    <BootstrapTable keyField='id' data={ products } columns={ columns2 } filter={ filterFactory() } />

    const columns3 = [..., {
      dataField: 'quality',
      text: 'Product Quailty',
      formatter: cell => selectOptionsArr.filter(opt => opt.value === cell)[0].label || '',
      filter: selectFilter({
        options: () => selectOptionsArr
      })
    }];
    <BootstrapTable keyField='id' data={ products } columns={ columns3 } filter={ filterFactory() } />
    `,
    filter: filterFactory(),
    columns1: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'quality',
      text: 'Product Quailty',
      formatter: (cell: number) => selectOptions[cell],
      filter: selectFilter({
        options: selectOptions
      })
    }],
    columns2: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'quality',
      text: 'Product Quailty',
      formatter: (cell: number) => selectOptionsArr.filter(opt => opt.value === cell)[0].label || '',
      filter: selectFilter({
        options: selectOptionsArr
      })
    }],
    columns3: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'quality',
      text: 'Product Quailty',
      formatter: (cell: number) => selectOptionsArr.filter(opt => opt.value === cell)[0].label || '',
      filter: selectFilter({
        options: () => selectOptionsArr
      })
    }]
  }
};

export const SelectFilterWithDefaultValue: Story = {
  name: "Select filter with default value",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'quality',
      text: 'Product Quailty',
      formatter: (cell: number) => selectOptions[cell],
      filter: selectFilter({
        options: selectOptions,
        defaultValue: 2
      })
    }],
    data: productsQualityGenerator(6),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { selectFilter } from 'react-bootstrap-table-nextgen-filter';

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
      text: 'Product Name'
    }, {
      dataField: 'quality',
      text: 'Product Quailty',
      formatter: cell => selectOptions[cell],
      filter: selectFilter({
        options: selectOptions,
        defaultValue: 2
      })
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
    `,
    filter: filterFactory(),
  }
};

export const SelectFilterWithComparator: Story = {
  name: "Select filter with comparator",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price',
      filter: selectFilter({
        options: {
          '03': '03',
          '04': '04',
          '01': '01'
        },
        comparator: LIKE // default is Comparator.EQ
      })
    }],
    data: productsGenerator(6),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { selectFilter } from 'react-bootstrap-table-nextgen-filter';

    const selectOptions = {
      '03': '03',
      '04': '04',
      '01': '01'
    };

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price',
      filter: selectFilter({
        options: selectOptions,
        comparator: Comparator.LIKE // default is Comparator.EQ
      })
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
    `,
    filter: filterFactory(),
  }
};

export const MultiSelectFilter: Story = {
  name: "MultiSelect filter",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'quality',
      text: 'Product Quailty',
      formatter: (cell: number) => selectOptions[cell],
      filter: multiSelectFilter({
        options: selectOptions
      })
    }],
    data: productsQualityGenerator(6),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { multiSelectFilter } from 'react-bootstrap-table-nextgen-filter';

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
      text: 'Product Name'
    }, {
      dataField: 'quality',
      text: 'Product Quailty',
      formatter: cell => selectOptions[cell],
      filter: multiSelectFilter({
        options: selectOptions
      })
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
    `,
    filter: filterFactory(),
  }
};

export const MultiSelectFilterWithDefaultValue: Story = {
  name: "MultiSelect filter with default value",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'quality',
      text: 'Product Quailty',
      formatter: (cell: number) => selectOptions[cell],
      filter: multiSelectFilter({
        options: selectOptions,
        defaultValue: [0, 2]
      })
    }],
    data: productsQualityGenerator(6),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { multiSelectFilter } from 'react-bootstrap-table-nextgen-filter';

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
      text: 'Product Name'
    }, {
      dataField: 'quality',
      text: 'Product Quailty',
      formatter: cell => selectOptions[cell],
      filter: multiSelectFilter({
        options: selectOptions,
        defaultValue: [0, 2]
      })
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
    `,
    filter: filterFactory(),
  }
};

export const NumberFilter: Story = {
  name: "Number filter",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price',
      filter: numberFilter()
    }],
    data: productsGenerator(8),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { numberFilter } from 'react-bootstrap-table-nextgen-filter';

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price',
      filter: numberFilter()
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
    `,
    filter: filterFactory(),
  }
};

export const NumberFilterWithDefaultValue: Story = {
  name: "Number filter with default value",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price',
      filter: numberFilter({
        defaultValue: { number: 2103, comparator: GT }
      })
    }],
    data: productsGenerator(8),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { numberFilter, Comparator } from 'react-bootstrap-table-nextgen-filter';

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price',
      filter: numberFilter({
        defaultValue: { number: 2103, comparator: Comparator.GT }
      })
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
    `,
    filter: filterFactory(),
  }
};

export const DateFilter: Story = {
  name: "Date filter",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'inStockDate',
      text: 'InStock Date',
      formatter: (cell: any) => cell.toString(),
      filter: dateFilter()
    }],
    data: stockGenerator(8),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { dateFilter } from 'react-bootstrap-table-nextgen-filter';

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'inStockDate',
      text: 'InStock Date',
      filter: dateFilter()
    }];

    <BootstrapTable
      keyField="id"
      data={ stocks }
      columns={ columns }
      filter={ filterFactory() }
    />
    `,
    filter: filterFactory(),
  }
};

export const DateFilterWithDefaultValue: Story = {
  name: "Date filter with default value",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'inStockDate',
      text: 'InStock Date',
      formatter: (cell: any) => cell.toString(),
      filter: dateFilter({
        defaultValue: { date: new Date(2018, 0, 1), comparator: GT }
      })
    }],
    data: stockGenerator(8),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { dateFilter } from 'react-bootstrap-table-nextgen-filter';

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'inStockDate',
      text: 'InStock Date',
      filter: dateFilter({
        defaultValue: { date: new Date(2018, 0, 1), comparator: Comparator.GT }
      })
    }];

    <BootstrapTable
      keyField="id"
      data={ stocks }
      columns={ columns }
      filter={ filterFactory() }
    />
    `,
    filter: filterFactory(),
  }
};

export const FilterPosition: Story = {
  name: "Filter position",
  args: {
    mode: "position",
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      filter: textFilter()
    }, {
      dataField: 'price',
      text: 'Product Price',
      filter: textFilter()
    }],
    data: productsGenerator(8),
    sourceCode1: `\
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

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      filter={ filterFactory() }
      filterPosition="top"
    />
    `,
    sourceCode2: `\
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

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      filter={ filterFactory() }
      filterPosition="bottom"
    />
    `,
    filter: filterFactory(),
    selectRow: {
      mode: 'checkbox',
      clickToSelect: true
    },
    expandRow: {
      renderer: (row: any) => (
        <div>
          <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
          <p>You can render anything here, also you can add additional data on every row object</p>
          <p>expandRow.renderer callback will pass the origin row object to you</p>
        </div>
      ),
      showExpandColumn: true,
      expandColumnPosition: 'right'
    },
  }
};

export const CustomTextFilter: Story = {
  name: "Custom text filter",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      filter: textFilter()
    }, {
      dataField: 'price',
      text: 'Product Price',
      filter: textFilter({
        delay: 1000, // default is 500ms
        style: {
          backgroundColor: 'yellow'
        },
        className: 'test-classname',
        placeholder: 'Custom PlaceHolder',
        onClick: e => console.log(e)
      })
    }],
    data: productsGenerator(8),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { textFilter } from 'react-bootstrap-table-nextgen-filter';

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      filter: textFilter()
    }, {
      dataField: 'price',
      text: 'Product Price',
      filter: textFilter({
        delay: 1000, // default is 500ms
        style: {
          backgroundColor: 'yellow'
        },
        className: 'test-classname',
        placeholder: 'Custom PlaceHolder',
        onClick: e => console.log(e)
      })
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
    `,
    filter: filterFactory(),
  }
};

export const CustomSelectFilter: Story = {
  name: "Custom select filter",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'quality',
      text: 'Product Quailty',
      formatter: (cell: number) => selectOptions[cell],
      filter: selectFilter({
        options: selectOptions,
        withoutEmptyOption: true,
        style: {
          backgroundColor: 'pink'
        },
        className: 'test-classname',
        // datamycustomattr: 'datamycustomattr'
      })
    }],
    data: productsQualityGenerator(6),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { selectFilter } from 'react-bootstrap-table-nextgen-filter';

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
      text: 'Product Name'
    }, {
      dataField: 'quality',
      text: 'Product Quailty',
      formatter: cell => selectOptions[cell],
      filter: selectFilter({
        options: selectOptions,
        withoutEmptyOption: true,
        style: {
          backgroundColor: 'pink'
        },
        className: 'test-classname',
        datamycustomattr: 'datamycustomattr'
      })
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
    `,
    filter: filterFactory(),
  }
};

export const CustomNumberFilter: Story = {
  name: "Custom number filter",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price',
      filter: numberFilter({
        options: [2100, 2103, 2105],
        delay: 600,
        placeholder: 'custom placeholder',
        withoutEmptyComparatorOption: true,
        comparators: [EQ, GT, LT],
        style: { display: 'inline-grid' },
        className: 'custom-numberfilter-class',
        comparatorStyle: { backgroundColor: 'antiquewhite' },
        comparatorClassName: 'custom-comparator-class',
        numberStyle: { backgroundColor: 'cadetblue', margin: '0px' },
        numberClassName: 'custom-number-class'
      })
    }],
    data: productsGenerator(6),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { numberFilter, Comparator } from 'react-bootstrap-table-nextgen-filter';

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price',
      filter: numberFilter({
        options: [2100, 2103, 2105],
        delay: 600,
        placeholder: 'custom placeholder',
        withoutEmptyComparatorOption: true,
        comparators: [Comparator.EQ, Comparator.GT, Comparator.LT],
        style: { display: 'inline-grid' },
        className: 'custom-numberfilter-class',
        comparatorStyle: { backgroundColor: 'antiquewhite' },
        comparatorClassName: 'custom-comparator-class',
        numberStyle: { backgroundColor: 'cadetblue', margin: '0px' },
        numberClassName: 'custom-number-class'
      })
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
    `,
    filter: filterFactory(),
  }
};

export const CustomDateFilter: Story = {
  name: "Custom date filter",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'inStockDate',
      text: 'InStock Date',
      formatter: (cell: any) => cell.toString(),
      filter: dateFilter({
        delay: 400,
        placeholder: 'custom placeholder',
        withoutEmptyComparatorOption: true,
        comparators: [EQ, GT, LT],
        style: { display: 'inline-grid' },
        className: 'custom-datefilter-class',
        comparatorStyle: { backgroundColor: 'antiquewhite' },
        comparatorClassName: 'custom-comparator-class',
        dateStyle: { backgroundColor: 'cadetblue', margin: '0px' },
        dateClassName: 'custom-date-class'
      })
    }],
    data: stockGenerator(8),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { dateFilter } from 'react-bootstrap-table-nextgen-filter';

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'inStockDate',
      text: 'InStock Date',
      filter: dateFilter({
        delay: 400,
        placeholder: 'custom placeholder',
        withoutEmptyComparatorOption: true,
        comparators: [Comparator.EQ, Comparator.GT, Comparator.LT],
        style: { display: 'inline-grid' },
        className: 'custom-datefilter-class',
        comparatorStyle: { backgroundColor: 'antiquewhite' },
        comparatorClassName: 'custom-comparator-class',
        dateStyle: { backgroundColor: 'cadetblue', margin: '0px' },
        dateClassName: 'custom-date-class'
      })
    }];

    <BootstrapTable
      keyField="id"
      data={ stocks }
      columns={ columns }
      filter={ filterFactory() }
    />
    `,
    filter: filterFactory(),
  }
};

export const CustomMultiSelectFilter: Story = {
  name: "Custom multi select filter",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'quality',
      text: 'Product Quailty',
      formatter: (cell: any) => selectOptions[cell],
      filter: multiSelectFilter({
        options: selectOptions,
        withoutEmptyOption: true,
        style: {
          backgroundColor: 'pink'
        },
        className: 'test-classname',
        // datamycustomattr: 'datamycustomattr'
      })
    }],
    data: productsQualityGenerator(6),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { multiSelectFilter } from 'react-bootstrap-table-nextgen-filter';

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
      text: 'Product Name'
    }, {
      dataField: 'quality',
      text: 'Product Quailty',
      formatter: cell => selectOptions[cell],
      filter: multiSelectFilter({
        options: selectOptions,
        withoutEmptyOption: true,
        style: {
          backgroundColor: 'pink'
        },
        className: 'test-classname',
        datamycustomattr: 'datamycustomattr'
      })
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
    `,
    filter: filterFactory(),
  }
};

const owners = ['Allen', 'Bob', 'Cat'];
const types = ['Cloud Service', 'Message Service', 'Add Service', 'Edit Service', 'Money'];

export const CustomFilterValue: Story = {
  name: "Custom filter value",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Job ID'
    }, {
      dataField: 'name',
      text: 'Job Name',
      filter: textFilter()
    }, {
      dataField: 'owner',
      text: 'Job Owner',
      filter: textFilter(),
      formatter: (cell: number, row: any) => owners[cell],
      filterValue: (cell: number, row: any) => owners[cell]
    }, {
      dataField: 'type',
      text: 'Job Type',
      filter: textFilter(),
      formatter: (cell: number, row: any) => types[cell],
      filterValue: (cell: number, row: any) => types[cell]
    }],
    data: jobsGenerator1(5),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { textFilter } from 'react-bootstrap-table-nextgen-filter';

    const owners = ['Allen', 'Bob', 'Cat'];
    const types = ['Cloud Service', 'Message Service', 'Add Service', 'Edit Service', 'Money'];
    const columns = [{
      dataField: 'id',
      text: 'Job ID'
    }, {
      dataField: 'name',
      text: 'Job Name',
      filter: textFilter()
    }, {
      dataField: 'owner',
      text: 'Job Owner',
      filter: textFilter(),
      formatter: (cell, row) => owners[cell],
      filterValue: (cell, row) => owners[cell]
    }, {
      dataField: 'type',
      text: 'Job Type',
      filter: textFilter(),
      filterValue: (cell, row) => types[cell]
    }];

    // shape of job: { id: 0, name: 'Job name 0', owner: 1, type: 3 }

    <BootstrapTable keyField='id' data={ jobs } columns={ columns } filter={ filterFactory() } />
    `,
    filter: filterFactory(),
  }
};

let nameFilter: any;

const handleNameFilterClick = () => {
  nameFilter(0);
};

export const ProgrammaticallyTextFilter: Story = {
  name: "Programmatically text filter",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      filter: textFilter({
        getFilter: (filter) => {
          // nameFilter was assigned once the component has been mounted.
          nameFilter = filter;
        }
      })
    }, {
      dataField: 'price',
      text: 'Product Price',
      filter: textFilter()
    }],
    data: productsGenerator(8),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { textFilter } from 'react-bootstrap-table-nextgen-filter';

    let nameFilter;

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      filter: textFilter({
        getFilter: (filter) => {
          // nameFilter was assigned once the component has been mounted.
          nameFilter = filter;
        }
      })
    }, {
      dataField: 'price',
      text: 'Product Price',
      filter: textFilter()
    }];

    const handleClick = () => {
      nameFilter(0);
    };

    export default () => (
      <div>
        <button className="btn btn-lg btn-primary" onClick={ handleClick }> filter columns by 0 </button>

        <BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
      </div>
    );
    `,
    filter: filterFactory(),
    header: <button className="btn btn-lg btn-primary" onClick={ handleNameFilterClick }> filter columns by 0 </button>,
  }
};

let qualityFilter: any;

const handleQualityFilterClick = () => {
  qualityFilter(0);
};

export const ProgrammaticallySelectFilter: Story = {
  name: "Programmatically select filter",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'quality',
      text: 'Product Quality',
      formatter: (cell: any) => selectOptions[cell],
      filter: selectFilter({
        options: selectOptions,
        getFilter: (filter) => {
          // qualityFilter was assigned once the component has been mounted.
          qualityFilter = filter;
        }
      })
    }],
    data: productsQualityGenerator(6),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { selectFilter } from 'react-bootstrap-table-nextgen-filter';

    let qualityFilter;

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
      text: 'Product Name'
    }, {
      dataField: 'quality',
      text: 'Product Quality',
      formatter: cell => selectOptions[cell],
      filter: selectFilter({
        options: selectOptions,
        getFilter: (filter) => {
          // qualityFilter was assigned once the component has been mounted.
          qualityFilter = filter;
        }
      })
    }];

    const handleClick = () => {
      qualityFilter(0);
    };

    export default () => (
      <div>
        <button className="btn btn-lg btn-primary" onClick={ handleClick }>{' filter columns by option "good" '}</button>

        <BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
      </div>
    );
    `,
    filter: filterFactory(),
    header: <button className="btn btn-lg btn-primary" onClick={ handleQualityFilterClick }>{' filter columns by option "good" '}</button>,
  }
};

let priceFilter: any;

const handlePriceFilterClick = () => {
  priceFilter({
    number: 2103,
    comparator: GT
  });
};

export const ProgrammaticallyNumberFilter: Story = {
  name: "Programmatically number filter",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price',
      filter: numberFilter({
        getFilter: (filter) => {
          // pricerFilter was assigned once the component has been mounted.
          priceFilter = filter;
        }
      })
    }],
    data: productsGenerator(8),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { numberFilter } from 'react-bootstrap-table-nextgen-filter';

    let priceFilter;

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price',
      filter: numberFilter({
        getFilter: (filter) => {
          // pricerFilter was assigned once the component has been mounted.
          priceFilter = filter;
        }
      })
    }];

    const handleClick = () => {
      priceFilter({
        number: 2103,
        comparator: Comparator.GT
      });
    };

    export default () => (
      <div>
        <button className="btn btn-lg btn-primary" onClick={ handleClick }> filter all columns which is greater than 2103 </button>

        <BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
      </div>
    );
    `,
    filter: filterFactory(),
    header: <button className="btn btn-lg btn-primary" onClick={ handlePriceFilterClick }> filter all columns which is greater than 2103 </button>,
  }
};

let inStockDateFilter: any;

const handleDateFilterClick = () => {
  inStockDateFilter({
    date: new Date(2018, 0, 1),
    comparator: GT
  });
};

export const ProgrammaticallyDateFilter: Story = {
  name: "Programmatically date filter",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'inStockDate',
      text: 'InStock Date',
      formatter: (cell: any) => cell.toString(),
      filter: dateFilter({
        getFilter: (filter) => {
          // inStockDateFilter was assigned once the component has been mounted.
          inStockDateFilter = filter;
        }
      })
    }],
    data: stockGenerator(8),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { dateFilter, Comparator } from 'react-bootstrap-table-nextgen-filter';

    let inStockDateFilter;

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'inStockDate',
      text: 'InStock Date',
      filter: dateFilter({
        getFilter: (filter) => {
          // inStockDateFilter was assigned once the component has been mounted.
          inStockDateFilter = filter;
        }
      })
    }];

    const handleClick = () => {
      inStockDateFilter({
        date: new Date(2018, 0, 1),
        comparator: Comparator.GT
      });
    };

    export default () => (
      <div>
        <button className="btn btn-lg btn-primary" onClick={ handleClick }> filter InStock Date columns which is greater than 2018.01.01 </button>

        <BootstrapTable keyField='id' data={ stocks } columns={ columns } filter={ filterFactory() } />
      </div>
    );
    `,
    filter: filterFactory(),
    header: <button className="btn btn-lg btn-primary" onClick={ handleDateFilterClick }> filter InStock Date columns which is greater than 2018.01.01 </button>,
  }
};

let qualityMultiSelectFilter: any;

const handleQualityMultiSelectFilterClick = () => {
  qualityMultiSelectFilter([0, 2]);
};

export const ProgrammaticallyMultiSelectFilter: Story = {
  name: "Programmatically multi select filter",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'quality',
      text: 'Product Quality',
      formatter: (cell: number) => selectOptions[cell],
      filter: multiSelectFilter({
        options: selectOptions,
        getFilter: (filter) => {
          // qualityMultiSelectFilter was assigned once the component has been mounted.
          qualityMultiSelectFilter = filter;
        }
      })
    }],
    data: productsQualityGenerator(6),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { multiSelectFilter } from 'react-bootstrap-table-nextgen-filter';

    let qualityFilter;

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
      text: 'Product Name'
    }, {
      dataField: 'quality',
      text: 'Product Quality',
      formatter: cell => selectOptions[cell],
      filter: multiSelectFilter({
        options: selectOptions,
        getFilter: (filter) => {
          // qualityFilter was assigned once the component has been mounted.
          qualityFilter = filter;
        }
      })
    }];

    const handleClick = () => {
      qualityFilter([0, 2]);
    };

    export default () => (
      <div>
        <button className="btn btn-lg btn-primary" onClick={ handleClick }>{' filter columns by option "good" and "unknow" '}</button>
        <BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
      </div>
    );
    `,
    filter: filterFactory(),
    header: <button className="btn btn-lg btn-primary" onClick={ handleQualityMultiSelectFilterClick }>{' filter columns by option "good" and "unknow" '}</button>,
  }
};

interface PriceFilterProps {
  column: any;
  onFilter: (value: string) => void;
}

class PriceFilter extends React.Component<PriceFilterProps> {
  static propTypes = {
    column: PropTypes.object.isRequired,
    onFilter: PropTypes.func.isRequired,
  };

  private input: HTMLInputElement | null;

  constructor(props: PriceFilterProps) {
    super(props);
    this.filter = this.filter.bind(this);
    this.getValue = this.getValue.bind(this);
    this.input = null;
  }

  getValue() {
    if (this.input) {
      return this.input.value;
    }
    return '';
  }

  filter() {
    if (this.input) {
      this.props.onFilter(this.getValue());
    }
  }

  render() {
    return (
      <>
        <input
          ref={(node) => (this.input = node)}
          type="text"
          placeholder="Input price"
        />
        <button className="btn btn-warning" onClick={this.filter}>
          {`Find ${this.props.column.text}`}
        </button>
      </>
    );
  }
}

export const CustomFilter: Story = {
  name: "Custom filter",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      filter: textFilter()
    }, {
      dataField: 'price',
      text: 'Product Price',
      filter: customFilter(),
      filterRenderer: (onFilter:any, column: any) =>
        <PriceFilter onFilter={ onFilter } column={ column } />
    }],
    data: productsGenerator(8),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { textFilter, customFilter } from 'react-bootstrap-table-nextgen-filter';

    class PriceFilter extends React.Component {
      static propTypes = {
        column: PropTypes.object.isRequired,
        onFilter: PropTypes.func.isRequired
      }
      constructor(props) {
        super(props);
        this.filter = this.filter.bind(this);
        this.getValue = this.getValue.bind(this);
      }
      getValue() {
        return this.input.value;
      }
      filter() {
        this.props.onFilter(this.getValue());
      }
      render() {
        return [
          <input
            key="input"
            ref={ node => this.input = node }
            type="text"
            placeholder="Input price"
          />,
          <button
            key="submit"
            className="btn btn-warning"
            onClick={ this.filter }
          >
            { \`Filter $\{this.props.column.text}\` }
          </button>
        ];
      }
    }

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      filter: textFilter()
    }, {
      dataField: 'price',
      text: 'Product Price',
      filter: customFilter(),
      filterRenderer: (onFilter, column) =>
        <PriceFilter onFilter={ onFilter } column={ column } />
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
    `,
    filter: filterFactory(),
  }
};

interface AdvancePriceFilterProps {
  column: any;
  onFilter: (value: { number: number; comparator: string }) => void;
}

class AdvancePriceFilter extends React.Component<AdvancePriceFilterProps, { value: number }> {
  static propTypes = {
    column: PropTypes.object.isRequired,
    onFilter: PropTypes.func.isRequired,
  };

  private range: HTMLInputElement | null;
  private showValue: HTMLParagraphElement | null;
  private select: HTMLSelectElement | null;

  constructor(props: AdvancePriceFilterProps) {
    super(props);
    this.filter = this.filter.bind(this);
    this.getValue = this.getValue.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = { value: 2100 };
    this.range = null;
    this.showValue = null;
    this.select = null;
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ value: parseInt(e.target.value, 10) });
  }

  getValue() {
    if (this.range) {
      return parseInt(this.range.value, 10);
    }
    return 0;
  }

  filter() {
    if (this.select) {
      this.props.onFilter({
        number: this.getValue(),
        comparator: this.select.value,
      });
    }
  }

  render() {
    return (
      <>
        <input
          key="range"
          ref={(node) => (this.range = node)}
          type="range"
          min="2100"
          max="2110"
          onChange={this.onChange}
        />
        <p
          key="show"
          ref={(node) => (this.showValue = node)}
          style={{ textAlign: 'center' }}
        >
          {this.state.value}
        </p>
        <select
          key="select"
          ref={(node) => (this.select = node)}
          className="form-control"
        >
          <option value={GT}>&gt;</option>
          <option value={EQ}>=</option>
          <option value={LT}>&lt;</option>
        </select>
        <button
          key="submit"
          className="btn btn-warning"
          onClick={this.filter}
        >
          {`Filter ${this.props.column.text}`}
        </button>
      </>
    );
  }
}

export const AdvanceCustomFilter: Story = {
  name: "Advance custom filter",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      filter: textFilter()
    }, {
      dataField: 'price',
      text: 'Product Price',
      filter: customFilter({
        type: FILTER_TYPES.NUMBER // ask react-bootstrap-table to filter data as number
      }),
      filterRenderer: (onFilter, column) =>
        <AdvancePriceFilter onFilter={ onFilter } column={ column } />
    }],
    data: productsGenerator(8),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { textFilter, customFilter, Comparator, FILTER_TYPES } from 'react-bootstrap-table-nextgen-filter';

    class PriceFilter extends React.Component {
      static propTypes = {
        column: PropTypes.object.isRequired,
        onFilter: PropTypes.func.isRequired
      }
      constructor(props) {
        super(props);
        this.filter = this.filter.bind(this);
        this.getValue = this.getValue.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = { value: 2100 };
      }
      onChange(e) {
        this.setState({ value: e.target.value });
      }
      getValue() {
        return parseInt(this.range.value, 10);
      }
      filter() {
        this.props.onFilter({
          number: this.getValue(),
          comparator: this.select.value
        });
      }
      render() {
        return [
          <input
            key="range"
            ref={ node => this.range = node }
            type="range"
            min="2100"
            max="2110"
            onChange={ this.onChange }
          />,
          <p
            key="show"
            ref={ node => this.showValue = node }
            style={ { textAlign: 'center' } }
          >
            { this.state.value }
          </p>,
          <select
            key="select"
            ref={ node => this.select = node }
            className="form-control"
          >
            <option value={ Comparator.GT }>&gt;</option>
            <option value={ Comparator.EQ }>=</option>
            <option value={ Comparator.LT }>&lt;</option>
          </select>,
          <button
            key="submit"
            className="btn btn-warning"
            onClick={ this.filter }
          >
            { \`Filter $\{this.props.column.text}\` }
          </button>
        ];
      }
    }

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      filter: textFilter()
    }, {
      dataField: 'price',
      text: 'Product Price',
      filter: customFilter({
        type: FILTER_TYPES.NUMBER // ask react-bootstrap-table to filter data as number
      }),
      filterRenderer: (onFilter, column) =>
        <PriceFilter onFilter={ onFilter } column={ column } />
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
    `,
    filter: filterFactory(),
  }
};

const selectFilterOptions: { value: number; label: string; }[] = [
  { value: 0, label: 'good' },
  { value: 1, label: 'Bad' },
  { value: 2, label: 'unknown' }
];

export const PreservedOptionOrderOnSelectFilter: Story = {
  name: "Preserved option order on select filter",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'quality',
      text: 'Product Quailty',
      formatter: (cell: any) => {
        const foundOption = selectFilterOptions.find((opt: any) => opt.value === cell);
        return foundOption ? foundOption.label: "";
      },
      filter: selectFilter({
        options: selectFilterOptions
      })
    }],
    data: productsQualityGenerator(6),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { selectFilter } from 'react-bootstrap-table-nextgen-filter';

    const selectOptions = [
      { value: 0, label: 'good' },
      { value: 1, label: 'Bad' },
      { value: 2, label: 'unknown' }
    ];

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'quality',
      text: 'Product Quailty',
      formatter: cell => selectOptions.find(opt => opt.value === cell).label,
      filter: selectFilter({
        options: selectOptions
      })
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
    `,
    filter: filterFactory(),
    header: <h3><code>selectFilter.options</code> accept an Array and we keep that order when rendering the options</h3>,
  }
};

let clearNameFilter: any;
let clearQualityFilter: any;
let clearPriceFilter: any;
let clearStockDateFilter: any;

const handleAllFiltersClick = () => {
  clearNameFilter('');
  clearQualityFilter('');
  clearPriceFilter('');
  clearStockDateFilter();
};

export const ClearAllFilters: Story = {
  name: "Clear all filters",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      filter: textFilter({
        getFilter: (filter) => {
          clearNameFilter = filter;
        },
        onFilter: filterVal => console.log(`Filter product name ${filterVal}`)
      })
    }, {
      dataField: 'quality',
      text: 'Product Quailty',
      formatter: (cell: number) => selectOptions[cell],
      filter: selectFilter({
        options: selectOptions,
        getFilter: (filter) => {
          clearQualityFilter = filter;
        },
        onFilter: filterVal => console.log(`Filter quality ${filterVal}`)
      })
    }, {
      dataField: 'price',
      text: 'Price',
      filter: textFilter({
        getFilter: (filter) => {
          clearPriceFilter = filter;
        },
        onFilter: filterVal => console.log(`Filter Price: ${filterVal}`)
      })
    }, {
      dataField: 'inStockDate',
      text: 'InStock Date',
      formatter: (cell: any) => cell.toString(),
      filter: dateFilter({
        getFilter: (filter) => {
          clearStockDateFilter = filter;
        },
        onFilter: filterVal => console.log(`Filter date: ${filterVal}`)
      })
    }],
    data: stockGenerator(8),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { textFilter, dateFilter } from 'react-bootstrap-table-nextgen-filter';

    let nameFilter;
    let priceFilter;
    let stockDateFilter;

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      filter: textFilter({
        getFilter: (filter) => {
          nameFilter = filter;
        }
      })
    }, {
      dataField: 'price',
      text: 'Price',
      filter: textFilter({
        getFilter: (filter) => {
          priceFilter = filter;
        }
      })
    }, {
      dataField: 'inStockDate',
      text: 'InStock Date',
      formatter: cell => cell.toString(),
      filter: dateFilter({
        getFilter: (filter) => {
          stockDateFilter = filter;
        }
      })
    }];

    const handleClick = () => {
      nameFilter('');
      priceFilter('');
      stockDateFilter();
    };

    export default () => (
      <div>
        <button className="btn btn-lg btn-primary" onClick={ handleClick }> Clear all filters </button>
        <BootstrapTable
          keyField="id"
          data={ products }
          columns={ columns }
          filter={ filterFactory() }
        />
      </div>
    );
    `,
    filter: filterFactory(),
    header: <button className="btn btn-lg btn-primary" onClick={ handleAllFiltersClick }> Clear all filters </button>,
  }
};

function afterFilter(newResult: any, newFilters: any) {
  console.log(newResult);
  console.log(newFilters);
}

export const FilterHooks: Story = {
  name: "Filter hooks",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      filter: textFilter()
    }, {
      dataField: 'price',
      text: 'Product Price',
      filter: textFilter({
        onFilter: filterVal => console.log(`Filter Value: ${filterVal}`)
      })
    }],
    data: productsGenerator(8),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { textFilter } from 'react-bootstrap-table-nextgen-filter';

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      filter: textFilter()
    }, {
      dataField: 'price',
      text: 'Product Price',
      filter: textFilter({
        onFilter: filterVal => console.log(\`Filter Value: $\{filterVal}\`)
      })
    }];

    function afterFilter(newResult, newFilters) {
      console.log(newResult);
      console.log(newFilters);
    }

    <BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory({ afterFilter }) } />
    `,
    filter: filterFactory({ afterFilter }),
  }
};

const filterByPrice = (filterVal: any, data?: any): void | any[] => {
  if (filterVal) {
    return data.filter((product: any) => product.price === filterVal);
  }
  return data;
}

export const ImplementCustomFilterLogic: Story = {
  name: "Implement custom filter logic",
  args: {
    columns:  [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      filter: textFilter()
    }, {
      dataField: 'price',
      text: 'Product Price',
      filter: textFilter({
        onFilter: filterByPrice
      })
    }],
    data: productsGenerator(8),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { textFilter } from 'react-bootstrap-table-nextgen-filter';

    class Table extends React.Component {
      filterByPrice = (filterVal, data) => {
        if (filterVal) {
          return data.filter(product => product.price == filterVal);
        }
        return data;
      }

      render() {
        const columns = [{
          dataField: 'id',
          text: 'Product ID'
        }, {
          dataField: 'name',
          text: 'Product Name',
          filter: textFilter()
        }, {
          dataField: 'price',
          text: 'Product Price',
          filter: textFilter({
            onFilter: this.filterByPrice
          })
        }];

        return (
          <div>
            <BootstrapTable
              keyField="id"
              data={ products }
              columns={ columns }
              filter={ filterFactory() }
            />
          </div>
        );
      }
    }
    `,
    filter: filterFactory({ afterFilter }),
    header:  <h2>Implement a eq price filter</h2>,
  }
};
