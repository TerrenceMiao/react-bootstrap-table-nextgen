/* eslint-disable import/no-anonymous-default-export */
import PropTypes from "prop-types";
import React from "react";

import BootstrapTable from "../../../react-bootstrap-table-nextgen";
import overlayFactory from "../../../react-bootstrap-table-nextgen-overlay";
import paginationFactory from "../../../react-bootstrap-table-nextgen-paginator";

import Code from "../components/common/code-block";

import "../../../react-bootstrap-table-nextgen-filter/style/react-bootstrap-table-nextgen-filter.scss";
import "../../../react-bootstrap-table-nextgen-paginator/style/react-bootstrap-table-nextgen-paginator.scss";
import "../../../react-bootstrap-table-nextgen-toolkit/style/react-bootstrap-table-nextgen-toolkit.scss";
import "../../../react-bootstrap-table-nextgen/style/react-bootstrap-table-nextgen.scss";
import { productsGenerator } from "../utils/common";
import "./stylesheet/storybook.scss";
import "./stylesheet/tomorrow.min.css";

const NoDataIndication = () => (
  <div className="spinner">
    <div className="rect1" />
    <div className="rect2" />
    <div className="rect3" />
    <div className="rect4" />
    <div className="rect5" />
  </div>
);

const emptyTableOverlaySourceCode = `\
import BootstrapTable from 'react-bootstrap-table-nextgen';
import paginationFactory from 'react-bootstrap-table-nextgen-paginator';

// ...
const NoDataIndication = () => (
  <div className="spinner">
    <div className="rect1" />
    <div className="rect2" />
    <div className="rect3" />
    <div className="rect4" />
    <div className="rect5" />
  </div>
);

const Table = ({ data, page, sizePerPage, onTableChange, totalSize }) => (
  <div>
    <BootstrapTable
      remote
      keyField="id"
      data={ data }
      columns={ columns }
      pagination={ paginationFactory({ page, sizePerPage, totalSize }) }
      onTableChange={ onTableChange }
      noDataIndication={ () => <NoDataIndication /> }
    />
    <Code>{ sourceCode }</Code>
  </div>
);

class EmptyTableOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      data: products.slice(0, 10),
      sizePerPage: 10
    };
  }

  handleTableChange = (type, { page, sizePerPage }) => {
    const currentIndex = (page - 1) * sizePerPage;
    setTimeout(() => {
      this.setState(() => ({
        page,
        data: products.slice(currentIndex, currentIndex + sizePerPage),
        sizePerPage
      }));
    }, 3000);
    this.setState(() => ({ data: [] }));
  }

  render() {
    const { data, sizePerPage, page } = this.state;
    return (
      <Table
        data={ data }
        page={ page }
        sizePerPage={ sizePerPage }
        totalSize={ products.length }
        onTableChange={ this.handleTableChange }
      />
    );
  }
}
`;

const Table = ({ data, page, sizePerPage, onTableChange, totalSize }) => (
  <div>
    <BootstrapTable
      remote
      keyField="id"
      data={data}
      columns={[
        {
          dataField: "id",
          text: "Product ID",
        },
        {
          dataField: "name",
          text: "Product Name",
        },
        {
          dataField: "price",
          text: "Product Price",
        },
      ]}
      pagination={paginationFactory({ page, sizePerPage, totalSize })}
      onTableChange={onTableChange}
      noDataIndication={() => <NoDataIndication />}
    />
    <Code>{emptyTableOverlaySourceCode}</Code>
  </div>
);

Table.propTypes = {
  data: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  totalSize: PropTypes.number.isRequired,
  sizePerPage: PropTypes.number.isRequired,
  onTableChange: PropTypes.func.isRequired,
};

interface EmptyTableOverlayState {
  data: any;
  sizePerPage: number;
  page: any;
}

class EmptyTableOverlay extends React.Component<{}, EmptyTableOverlayState> {
  products = productsGenerator(87);

  constructor(props: any) {
    super(props);
    this.state = {
      page: 1,
      data: this.products.slice(0, 10),
      sizePerPage: 10,
    };
  }

  handleTableChange = (type: any, { page, sizePerPage }) => {
    const currentIndex = (page - 1) * sizePerPage;
    setTimeout(() => {
      this.setState(() => ({
        page,
        data: this.products.slice(currentIndex, currentIndex + sizePerPage),
        sizePerPage,
      }));
    }, 3000);
    this.setState(() => ({ data: [] }));
  };

  render() {
    const { data, sizePerPage, page } = this.state;
    return (
      <Table
        data={data}
        page={page}
        sizePerPage={sizePerPage}
        totalSize={this.products.length}
        onTableChange={this.handleTableChange}
      />
    );
  }
}

const tableOverlaySourceCode = `\
import BootstrapTable from 'react-bootstrap-table-nextgen';
import paginationFactory from 'react-bootstrap-table-nextgen-paginator';
import overlayFactory from 'react-bootstrap-table-nextgen-overlay';

// ...
const RemotePagination = ({ loading, data, page, sizePerPage, onTableChange, totalSize }) => (
  <div>
    <BootstrapTable
      remote
      loading={ loading }
      keyField="id"
      data={ data }
      columns={ columns }
      pagination={ paginationFactory({ page, sizePerPage, totalSize }) }
      onTableChange={ onTableChange }
      overlay={ overlayFactory({ spinner: true, styles: { overlay: (base) => ({...base, background: 'rgba(255, 0, 0, 0.5)'}) } }) }
    />
    <Code>{ sourceCode }</Code>
  </div>
);

RemotePagination.propTypes = {
  data: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  totalSize: PropTypes.number.isRequired,
  sizePerPage: PropTypes.number.isRequired,
  onTableChange: PropTypes.func.isRequired
};

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      loading: false,
      data: products.slice(0, 10),
      sizePerPage: 10
    };
  }

  handleTableChange = ({ page, sizePerPage }) => {
    const currentIndex = (page - 1) * sizePerPage;
    setTimeout(() => {
      this.setState(() => ({
        page,
        loading: false,
        data: products.slice(currentIndex, currentIndex + sizePerPage),
        sizePerPage
      }));
    }, 3000);
    this.setState(() => ({ loading: true }));
  }

  render() {
    const { data, sizePerPage, page, loading } = this.state;
    return (
      <RemotePagination
        data={ data }
        page={ page }
        loading={ loading }
        sizePerPage={ sizePerPage }
        totalSize={ products.length }
        onTableChange={ this.handleTableChange }
      />
    );
  }
}
`;

const RemotePagination = ({
  loading,
  data,
  page,
  sizePerPage,
  onTableChange,
  totalSize,
}) => (
  <div>
    <BootstrapTable
      remote
      loading={loading}
      keyField="id"
      data={data}
      columns={[
        {
          dataField: "id",
          text: "Product ID",
        },
        {
          dataField: "name",
          text: "Product Name",
        },
        {
          dataField: "price",
          text: "Product Price",
        },
      ]}
      pagination={paginationFactory({ page, sizePerPage, totalSize })}
      onTableChange={onTableChange}
      overlay={overlayFactory({
        spinner: true,
        styles: {
          overlay: (base: any) => ({
            ...base,
            background: "rgba(255, 0, 0, 0.5)",
          }),
        },
      })}
    />
    <Code>{tableOverlaySourceCode}</Code>
  </div>
);

RemotePagination.propTypes = {
  data: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  totalSize: PropTypes.number.isRequired,
  sizePerPage: PropTypes.number.isRequired,
  onTableChange: PropTypes.func.isRequired,
};

interface TableOverlayState {
  data: any;
  sizePerPage: number;
  page: any;
  loading: boolean;
}

class TableOverlay extends React.Component<{}, TableOverlayState> {
  products = productsGenerator(87);

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      loading: false,
      data: this.products.slice(0, 10),
      sizePerPage: 10,
    };
  }

  handleTableChange = (type: any, { page, sizePerPage }) => {
    const currentIndex = (page - 1) * sizePerPage;
    setTimeout(() => {
      this.setState(() => ({
        page,
        loading: false,
        data: this.products.slice(currentIndex, currentIndex + sizePerPage),
        sizePerPage,
      }));
    }, 3000);
    this.setState(() => ({ loading: true }));
  };

  render() {
    const { data, sizePerPage, page, loading } = this.state;
    return (
      <RemotePagination
        data={data}
        page={page}
        loading={loading}
        sizePerPage={sizePerPage}
        totalSize={this.products.length}
        onTableChange={this.handleTableChange}
      />
    );
  }
}

export default ({ mode }) => {
  switch (mode) {
    case "empty":
      return <EmptyTableOverlay />;
    default:
      return <TableOverlay />;
  }
};
