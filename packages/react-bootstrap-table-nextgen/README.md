# react-bootstrap-table-nextgen
Next generation of [`react-bootstrap-table-nextgen`](https://github.com/TerrenceMiao/react-bootstrap-table-nextgen)

**[Live Demo](https://terrencemiao.github.io/react-bootstrap-table-nextgen/storybook-static)**

## Usage

### Installation

```sh
npm install react-bootstrap-table-nextgen --save
```

### Include CSS

> react-bootstrap-table-nextgen need you to add bootstrap css in your application firstly. About bootstrap css, we only compatible with bootstrap 3 but will start to compatible for bootstrap 4 on v0.2.0

```js
// es5
require('react-bootstrap-table-nextgen/dist/react-bootstrap-table-nextgen.min.css');

// es6
import 'react-bootstrap-table-nextgen/dist/react-bootstrap-table-nextgen.min.css';
```

### Your First Table

```js
import BootstrapTable from 'react-bootstrap-table-nextgen';

const products = [ ... ];
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

export default () =>
  <BootstrapTable keyField='id' data={ products } columns={ columns } />
```