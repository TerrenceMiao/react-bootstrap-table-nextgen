import React from 'react';

import BootstrapTable from 'react-bootstrap-table-nextgen';
import cellEditFactory from 'react-bootstrap-table-nextgen-editor';
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

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-nextgen';
import cellEditFactory from 'react-bootstrap-table-nextgen-editor';

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

<BootstrapTable
  keyField="id"
  data={ products }
  columns={ columns }
  cellEdit={ cellEditFactory({ mode: 'dbclick' }) }
/>
`;

export default () => (
  <div>
    <h3>Double click to edit cell</h3>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      cellEdit={ cellEditFactory({ mode: 'dbclick' }) }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
