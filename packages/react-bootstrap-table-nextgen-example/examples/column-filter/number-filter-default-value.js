import React from 'react';
import BootstrapTable from 'react-bootstrap-table-nextgen';
import filterFactory, { numberFilter, Comparator } from 'react-bootstrap-table-nextgen-filter';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator(8);

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

const sourceCode = `\
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
`;

export default () => (
  <div>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      filter={ filterFactory() }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
