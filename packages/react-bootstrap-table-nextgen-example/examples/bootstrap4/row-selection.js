import React from 'react';

import BootstrapTable from 'react-bootstrap-table-nextgen';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

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

const selectRow = {
  mode: 'radio',
  clickToSelect: true
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

const selectRow = {
  mode: 'radio',
  clickToSelect: true
};

<BootstrapTable
  bootstrap4
  keyField='id'
  data={ products }
  columns={ columns }
  selectRow={ selectRow }
/>
`;

export default () => (
  <div>
    <BootstrapTable bootstrap4 keyField="id" data={ products } columns={ columns } selectRow={ selectRow } />
    <Code>{ sourceCode }</Code>
  </div>
);