import React from "react";
import { ColumnDescription, SearchProps } from "react-bootstrap-table-nextgen";

import Context from "./context";
import ToolkitProvider from "./provider";

export default ToolkitProvider;
export const ToolkitContext = Context;

export { default as ColumnToggle } from "./src/column-toggle";
export { default as CSVExport } from "./src/csv";
export { default as Search } from "./src/search";

/**
 * declaration for table toolkit sub module
 */
export interface InjectedSearchProps {
  searchText: string;
  onSearch: (val: string) => void;
  onClear: () => void;
}

export interface SearchMatchProps<T extends object = any> {
  searchText: string;
  value: string;
  column: ColumnDescription<T>;
  row: T;
}

export interface TableSearchProps<T extends object = any> {
  searchFormatted?: boolean | undefined;
  defaultSearch?: string | undefined;
  placeholder?: string | undefined;
  onColumnMatch?: (props: SearchMatchProps<T>) => boolean;
  customMatchFunc?: ((props: SearchMatchProps<T>) => boolean) | undefined;
  afterSearch?: (newResult: T[]) => void | undefined;
  searchContext?: Function;
  searchText?: string;
}

export interface CSVProps {
  fileName?: string | undefined;
  separator?: string | undefined;
  ignoreHeader?: boolean | undefined;
  noAutoBOM?: boolean | undefined;
  /**
   * default is text/plain;charset=utf-8
   */
  blobType?: string | undefined;
  exportAll?: boolean | undefined;
  onlyExportSelection?: boolean | undefined;
  onlyExportFiltered?: boolean | undefined;
}

export interface TableToolkitProps<T extends object = any> {
  bootstrap4?: boolean | undefined;
  search?: TableSearchProps<T> | boolean | undefined;
  keyField: keyof T | string;
  data: T[];
  ref?: any;
  columns: Array<ColumnDescription<T>>;
  children: (props: ToolkitContextType) => JSX.Element;
  exportCSV?: boolean | CSVProps | undefined;
  columnToggle?: { [dataField: string]: boolean } | boolean | undefined;
  setDependencyModules?: Function;
  registerExposedAPI?: Function;
}

export interface ToolkitContextType {
  searchProps: InjectedSearchProps;
  csvProps: {
    onExport: (source?: any) => void;
  };
  columnToggleProps: {
    columns: ColumnDescription[];
    /**
     * array of toggled columns
     */
    toggles: boolean[];
    onColumnToggle: (dataField: string) => void;
  };
  baseProps: {
    /**
     * table key field
     */
    keyField: any;
    columns: ColumnDescription[];
    data: any[];
    bootstrap4?: boolean | undefined;
  };
}

export interface ToggleListProps {
  columns: ColumnDescription[];
  /**
   * array of toggled columns
   */
  toggles: boolean[];
  onColumnToggle: (dataField: string) => void;
  btnClassName?: string | undefined;
  className?: string | undefined;
  contextual?: string | undefined;
}

export interface ExportCSVButtonProps {
  children: React.ReactNode;
  onExport: () => void;
  style?: React.CSSProperties | undefined;
  className?: string | undefined;
}

export interface SearchBarProps <T = any> extends SearchProps<T> {
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  delay?: number | undefined;
  searchText?: string | undefined;
  tableId?: string | undefined;
  ref?: React.RefObject<React.Component<SearchProps<T>>>;
}

export interface ClearSearchButtonProps {
  onClear?: (() => void) | undefined;
  className?: string | undefined;
  text?: string | undefined;
}
