import PropTypes from "prop-types";
import { CSSProperties, SyntheticEvent } from "react";
import {
  ColumnDescription,
  TableColumnFilterProps,
} from "react-bootstrap-table-nextgen";

import DateFilter from "./src/components/date";
import MultiSelectFilter from "./src/components/multiselect";
import NumberFilter from "./src/components/number";
import SelectFilter from "./src/components/select";
import TextFilter from "./src/components/text";
import createContext from "./src/context";

export default (options = {}) => ({
  createContext,
  options,
});

export const textFilter = (props = {}) => ({
  Filter: TextFilter,
  props,
});

export const selectFilter = (props = {}) => ({
  Filter: SelectFilter,
  props,
});

export const multiSelectFilter = (props = {}) => ({
  Filter: MultiSelectFilter,
  props,
});

export const numberFilter = (props = {}) => ({
  Filter: NumberFilter,
  props,
});

export const dateFilter = (props = {}) => ({
  Filter: DateFilter,
  props,
});

export const customFilter = (props = {}) => ({
  props,
});

export enum FILTER_TYPES {
  TEXT = "TEXT",
  SELECT = "SELECT",
  MULTISELECT = "MULTISELECT",
  NUMBER = "NUMBER",
  DATE = "DATE",
}

export const FILTER_DELAY = 500;

/**
 * Filter comparators used for table filters
 */
export const LIKE = "LIKE";
export const EQ = "=";
export const NE = "!=";
export const GT = ">";
export const GE = ">=";
export const LT = "<";
export const LE = "<=";

export enum Comparator {
  LIKE = "LIKE",
  EQ = "=",
  NE = "!=",
  GT = ">",
  GE = ">=",
  LT = "<",
  LE = "<=",
}

export type TextFilterProps<T extends object = any> = TableColumnFilterProps<
  string,
  T
> &
  Partial<{
    /**
     *  default is false, and true will only work when comparator is LIKE
     */
    caseSensitive: boolean;
    comparator: Comparator;
    /**
     * on filter element click event
     */
    onClick?: ((e: SyntheticEvent) => void) | undefined;
    filterState?: any;
    column: any;
  }>;

/**
 * text column filter
 * @param props text filter options
 */
// export function textFilter(
//   props?: Partial<TextFilterProps>
// ): TableColumnFilterProps;

/**
 * select filter option type
 */
export type SelectFilterOptions =
  | { [index: string]: string }
  | Array<{ value: number; label: string }>;

export type SelectFilterProps<T extends object = any> = TableColumnFilterProps<
  string,
  T
> & {
  options:
    | SelectFilterOptions
    | ((column: ColumnDescription<T>) => SelectFilterOptions);
  comparator?: Comparator | undefined;
  /**
   * When the default unset selection is hidden from dropdown
   */
  withoutEmptyOption?: boolean | undefined;
  filterState?: any;
  column: any;
  caseSensitive?: boolean;
};

/**
 * single select column filter
 * @param props Select filter options
 */
// export function selectFilter(
//   props: Partial<SelectFilterProps>
// ): TableColumnFilterProps;

/**
 * Datatype that can be used as the multiselect filter option
 */
export interface MultiSelectFilterOptions {
  [index: string]: string;
}
/**
 * Multi Select filter options
 */
export type MultiSelectFilterProps<T extends object = any> =
  TableColumnFilterProps<string[], T> & {
    options: MultiSelectFilterOptions | (() => MultiSelectFilterOptions);
    comparator?: Comparator | undefined;
    /**
     * When set the default selection is hidden from dropdown
     */
    withoutEmptyOption?: boolean | undefined;
    filterState?: any;
    column: any;
    caseSensitive?: boolean;
  };

/**
 * multiSelectFilter adds multi select filtering to a column
 * @param props filter options
 */
// export function multiSelectFilter(
//   props: Partial<MultiSelectFilterProps>
// ): TableColumnFilterProps;

/**
 * Number filter configuration options
 */
export type NumberFilterProps<T extends object = any> = TableColumnFilterProps<
  { number: number | ""; comparator: Comparator },
  T
> & {
  options?: number[] | undefined;
  comparators?: Comparator[] | undefined;
  /**
   * When set to true comparator dropdown does not show a "no selection" option
   */
  withoutEmptyComparatorOption?: boolean | undefined;
  withoutEmptyNumberOption?: boolean | undefined;
  comparatorClassName?: string | undefined;
  numberClassName?: string | undefined;
  comparatorStyle?: CSSProperties | undefined;
  numberStyle?: CSSProperties | undefined;
  defaultValue?: { number: number; comparator: Comparator } | undefined;
  filterState?: any;
  column: any;
};

// export function numberFilter(
//   props: Partial<NumberFilterProps>
// ): TableColumnFilterProps;

/**
 * Date filter options
 */
export interface DateFilterProps<T extends object = any>
  extends TableColumnFilterProps<Date, T> {
  withoutEmptyComparatorOption?: boolean | undefined;
  defaultValue?:
    | {
        date?: Date;
        comparator?: Comparator;
      }
    | undefined;
  comparators?: Comparator[] | undefined;
  comparatorClassName?: string | undefined;
  dateClassName?: string | undefined;
  comparatorStyle?: CSSProperties | undefined;
  dateStyle?: CSSProperties | undefined;
  filterState?: any;
  column: any;
}

// export function dateFilter(props: DateFilterProps): TableColumnFilterProps;

/**
 * Custom filter
 */
export interface CustomFilterProps {
  type?: string | FILTER_TYPES | undefined;
  comparator?: Comparator | undefined;
  caseSensitive?: boolean | undefined;
}

// export function customFilter(
//   props: CustomFilterProps
// ): TableColumnFilterProps;

/**
 * declaration for table filter sub module
 */
export interface FilterFactoryProps<T extends object = any> {
  // TODO newFilters is not tested not its type is validated since the author of this commit has no experience with this field
  afterFilter?: ((newResult: T[], newFilters?: unknown[]) => void) | undefined;
}

// declare function filterFactory(props?: FilterFactoryProps): unknown;
// export default filterFactory;
