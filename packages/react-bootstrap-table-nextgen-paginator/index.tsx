import PropTypes from "prop-types";
import React from "react";
import { PaginationOptions } from "react-bootstrap-table-nextgen";

import createDataContext from "./src/data-context";
import PaginationListStandalone from "./src/pagination-list-standalone";
import PaginationTotalStandalone from "./src/pagination-total-standalone";
import SizePerPageDropdownStandalone from "./src/size-per-page-dropdown-standalone";
import createBaseContext from "./src/state-context";

export interface PaginationCtxOptions {
  options?: PaginationOptions | undefined;
}

export interface PaginationChildProps extends PaginationOptions {
  tableId?: string | undefined;
  bootstrap4?: boolean | undefined;
}

export interface PaginationProviderProps {
  pagination?: PaginationCtxOptions | undefined;
  // TODO
  // children: (childProps: {
  //   paginationProps: PaginationChildProps;
  //   paginationTableProps: BootstrapTableProps;
  // }) => React.ReactElement | null;
  children: any;
  tableId?: string | undefined;
  bootstrap4?: boolean | undefined;
  remoteEmitter: any;
  data: any[];
  isRemotePagination: Function;
}

export interface PaginationDataProviderProps {
  data: any[];
  remoteEmitter: Record<string, any>;
  isRemotePagination: () => boolean;
  children: React.ReactNode;
  pagination: {
    options: {
      custom?: boolean;
      pageStartIndex?: number;
      onPageChange: (newPage: any, currSizePerPage: number) => void;
    };
  };
  onDataSizeChange?: (dataSize: { dataSize: number }) => void;
}

export default (options = {}) => ({
  createContext: createDataContext,
  options,
});

const { Provider, Consumer } = createBaseContext();

const CustomizableProvider = (props: PaginationProviderProps) => (
  <Provider {...props}>
    <Consumer>
      {(paginationProps: any) => props.children(paginationProps)}
    </Consumer>
  </Provider>
);

CustomizableProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export const PaginationProvider = CustomizableProvider;
export {
  PaginationListStandalone,
  PaginationTotalStandalone,
  SizePerPageDropdownStandalone,
};
