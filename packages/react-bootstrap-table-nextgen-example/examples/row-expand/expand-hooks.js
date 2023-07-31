/* eslint no-console: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-nextgen';
import Code from 'components/common/code-block';
import { productsExpandRowsGenerator } from 'utils/common';

const products = productsExpandRowsGenerator();

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

const expandRow = {
  renderer: row => (
    <div>
      <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
      <p>You can render anything here, also you can add additional data on every row object</p>
      <p>expandRow.renderer callback will pass the origin row object to you</p>
    </div>
  ),
  showExpandColumn: true,
  onExpand: (row, isExpand, rowIndex, e) => {
    console.log(row.id);
    console.log(isExpand);
    console.log(rowIndex);
    console.log(e);
  },
  onExpandAll: (isExpandAll, rows, e) => {
    console.log(isExpandAll);
    console.log(rows);
    console.log(e);
  }
};

const sourceCode = `\
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

const expandRow = {
  renderer: row => (
    <div>
      <p>{ \`This Expand row is belong to rowKey $\{row.id}\` }</p>
      <p>You can render anything here, also you can add additional data on every row object</p>
      <p>expandRow.renderer callback will pass the origin row object to you</p>
    </div>
  ),
  showExpandColumn: true,
  onExpand: (row, isExpand, rowIndex, e) => {
    console.log(row.id);
    console.log(isExpand);
    console.log(rowIndex);
    console.log(e);
  },
  onExpandAll: (isExpandAll, rows, e) => {
    console.log(isExpandAll);
    console.log(rows);
    console.log(e);
  }
};

<BootstrapTable
  keyField='id'
  data={ products }
  columns={ columns }
  expandRow={ expandRow }
/>
`;

export default () => (
  <div>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      expandRow={ expandRow }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
