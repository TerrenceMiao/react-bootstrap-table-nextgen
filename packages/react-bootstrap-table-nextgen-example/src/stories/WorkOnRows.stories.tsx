import type { Meta, StoryObj } from '@storybook/react';

// import bootstrap style by given version
import { columns, productsGenerator } from '../utils/common';
import BootstrapTable from './WorkOnRows';
import bootstrapStyle from './bootstrap-style';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Work On Rows',
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
  },
  decorators: [
    (Story: any) => bootstrapStyle()(Story),
  ],
} satisfies Meta<typeof BootstrapTable>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const CustomizeRowStyle: Story = {
  name: "Customize row style",
  args: {
    mode: "customize",
    columns: columns,
    data: productsGenerator(),
    sourceCode1: `\
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

    const rowStyle = { backgroundColor: '#c8e6c9' };

    <BootstrapTable keyField='id' data={ products } columns={ columns } rowStyle={ rowStyle } />
    `,
    rowStyle1: { backgroundColor: '#c8e6c9' },
    sourceCode2: `\
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

    const rowStyle2 = (row, rowIndex) => {
      const style = {};
      if (row.id > 3) {
        style.backgroundColor = '#c8e6c9';
      } else {
        style.backgroundColor = '#00BFFF';
      }

      if (rowIndex > 2) {
        style.fontWeight = 'bold';
        style.color = 'white';
      }

      return style;
    };

    <BootstrapTable keyField='id' data={ products } columns={ columns } rowStyle={ rowStyle2 } />
    `,
    rowStyle2: (row: any, rowIndex: number) => {
      const style = { backgroundColor: "", fontWeight: "", color: "" };
      if (row.id > 3) {
        style.backgroundColor = '#c8e6c9';
      } else {
        style.backgroundColor = '#00BFFF';
      }

      if (rowIndex > 2) {
        style.fontWeight = 'bold';
        style.color = 'white';
      }

      return style;
    },
  }
};

export const CustomizeRowClass: Story = {
  name: "Customize row class",
  args: {
    mode: "customize",
    columns: columns,
    data: productsGenerator(),
    sourceCode1: `\
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

    const rowClasses = 'custom-row-class';

    <BootstrapTable keyField='id' data={ products } columns={ columns } rowClasses={ rowClasses } />
    `,
    rowClasses1: 'custom-row-class',
    sourceCode2: `\
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

    const rowClasses = (row, rowIndex) => {
      let classes = null;

      if (rowIndex > 2) {
        classes = 'index-bigger-than-two';
      }

      return classes;
    };

    <BootstrapTable keyField='id' data={ products } columns={ columns } rowClasses={ rowClasses } />
    `,
    rowClasses2: (row: any, rowIndex: number) => {
      let classes: string | null = null;

      if (rowIndex > 2) {
        classes = 'index-bigger-than-two';
      }

      return classes;
    },
  }
};

export const HideRows: Story = {
  name: "Hide rows",
  args: {
    columns: columns,
    data: productsGenerator(),
    sourceCode: `\
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

    const hiddenRowKeys = [1, 3];

    <BootstrapTable keyField="id" data={ products } columns={ columns } hiddenRows={ hiddenRowKeys } />
    `,
    hiddenRows: [1, 3],
  }
};

export const RowEvent: Story = {
  name: "Row event",
  args: {
    columns: columns,
    data: productsGenerator(),
    sourceCode: `\
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

    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        console.log(\`clicked on row with index: \${rowIndex}\`);
      },
      onMouseEnter: (e, row, rowIndex) => {
        console.log(\`enter on row with index: \${rowIndex}\`);
      }
    };

    <BootstrapTable keyField='id' data={ products } columns={ columns } rowEvents={ rowEvents } />
    `,
    rowEvents: {
      onClick: (e: any, row: any, rowIndex: number) => {
        console.log(`clicked on row with index: ${rowIndex}`);
      },
      onMouseEnter: (e: any, row: any, rowIndex: number) => {
        console.log(`enter on row with index: ${rowIndex}`);
      }
    },
  }
};
