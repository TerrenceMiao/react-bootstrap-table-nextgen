/* eslint react/prefer-stateless-function: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-nextgen';
import paginationFactory from 'react-bootstrap-table-nextgen-paginator';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator(87);

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

<BootstrapTable bootstrap4 keyField='id' data={ products } columns={ columns } pagination={ paginationFactory() } />
`;

export default () => (
  <div>
    <BootstrapTable bootstrap4 keyField="id" data={ products } columns={ columns } pagination={ paginationFactory() } />
    <Code>{ sourceCode }</Code>
  </div>
);
