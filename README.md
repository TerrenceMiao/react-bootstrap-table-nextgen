# react-bootstrap-table-nextgen

[![Build Status](https://travis-ci.org/TerrenceMiao/react-bootstrap-table-nextgen.svg?branch=master)](https://travis-ci.org/TerrenceMiao/react-bootstrap-table-nextgen)
Rebuild of [react-bootstrap-table](https://github.com/AllenFang/react-bootstrap-table)

> Note that `react-bootstrap-table-nextgen`'s npm module name is [**`react-bootstrap-table-nextgen`**](https://www.npmjs.com/package/react-bootstrap-table-nextgen)

`react-bootstrap-table-nextgen` separates some functionalities from its core modules to other modules as listed in the following:

- [`react-bootstrap-table-nextgen`](https://www.npmjs.com/package/react-bootstrap-table-nextgen)
- [`react-bootstrap-table-nextgen-filter`](https://www.npmjs.com/package/react-bootstrap-table-nextgen-filter)
- [`react-bootstrap-table-nextgen-editor`](https://www.npmjs.com/package/react-bootstrap-table-nextgen-editor)
- [`react-bootstrap-table-nextgen-paginator`](https://www.npmjs.com/package/react-bootstrap-table-nextgen-paginator)
- [`react-bootstrap-table-nextgen-overlay`](https://www.npmjs.com/package/react-bootstrap-table-nextgen-overlay)
- [`react-bootstrap-table-nextgen-toolkit`](https://www.npmjs.com/package/react-bootstrap-table-nextgen-toolkit)

Not only does this reduce the bundle size of your apps but also helps us have a cleaner design to avoid handling too much logic in the kernel module (SRP).

## Migration

If you are coming from the legacy [`react-bootstrap-table`](https://github.com/AllenFang/react-bootstrap-table/), please check out the [migration guide](./docs/migration.md).

## Usage

See [getting started](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/getting-started.html).

## Online Demo

See `react-bootstrap-table-nextgen` [storybook](https://terrencemiao.github.io/react-bootstrap-table-nextgen/storybook-static).

## Development

Please check the [development guide](./docs/development.md).

## Running storybook example on your local machine

```sh
# Clone the repo
$ git clone https://github.com/TerrenceMiao/react-bootstrap-table-nextgen.git

# change dir to the cloned repo
$ cd react-bootstrap-table-nextgen

# Install all dependencies with yarn
$ yarn install

# Start the stroybook server, then go to localhost:6006
$ yarn storybook

```