/* eslint react/require-default-props: 0 */
/* eslint no-return-assign: 0 */
/* eslint no-param-reassign: 0 */
/* eslint react/no-unused-prop-types: 0 */
import React, { Component } from "react";
import {
  EQ,
  FILTER_TYPES,
  MultiSelectFilterOptions,
  MultiSelectFilterProps,
} from "../..";

function optionsEquals(currOpts: any, prevOpts: any) {
  const keys = Object.keys(currOpts);
  for (let i = 0; i < keys.length; i += 1) {
    if (currOpts[keys[i]] !== prevOpts[keys[i]]) {
      return false;
    }
  }
  return Object.keys(currOpts).length === Object.keys(prevOpts).length;
}

const getSelections = (container: any) => {
  if (container && container.selectedOptions) {
    return Array.from(container.selectedOptions).map((item: any) => item.value);
  }
  const selections = [];
  const totalLen = container ? container.options.length : 0;
  for (let i = 0; i < totalLen; i += 1) {
    const option = container.options.item(i);
    if (option.selected) selections.push(option.value);
  }
  return selections;
};

interface MultiSelectFilterState {
  isSelected: boolean;
}
class MultiSelectFilter extends Component<
  MultiSelectFilterProps,
  MultiSelectFilterState
> {
  selectInput: any;

  constructor(props: MultiSelectFilterProps) {
    super(props);
    this.filter = this.filter.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    const isSelected =
      (props.defaultValue ?? []).map(
        (item: string) => (props.options as MultiSelectFilterOptions)[item]
      ).length > 0;
    this.state = { isSelected };
  }

  componentDidMount() {
    const { getFilter } = this.props;

    const value = getSelections(this.selectInput);
    if (value && value.length > 0) {
      this.applyFilter(value);
    }

    // export onFilter function to allow users to access
    if (getFilter) {
      getFilter((filterVal: any) => {
        this.selectInput.value = filterVal;
        this.applyFilter(filterVal);
      });
    }
  }

  componentDidUpdate(prevProps: any) {
    let needFilter = false;
    if (this.props.defaultValue !== prevProps.defaultValue) {
      needFilter = true;
    } else if (!optionsEquals(this.props.options, prevProps.options)) {
      needFilter = true;
    }
    if (needFilter) {
      this.applyFilter(getSelections(this.selectInput));
    }
  }

  getDefaultValue() {
    const { filterState = {}, defaultValue = [] } = this.props;
    if (filterState && typeof filterState.filterVal !== "undefined") {
      return filterState.filterVal;
    }
    return defaultValue;
  }

  getOptions() {
    const optionTags = [];
    const {
      options,
      placeholder,
      column,
      withoutEmptyOption = false,
    } = this.props;
    if (!withoutEmptyOption) {
      optionTags.push(
        <option key="-1" value="">
          {placeholder || `Select ${column.text}...`}
        </option>
      );
    }
    Object.keys(options).forEach((key) =>
      optionTags.push(
        <option key={key} value={key}>
          {(options as MultiSelectFilterOptions)[key]}
        </option>
      )
    );
    return optionTags;
  }

  cleanFiltered() {
    const value =
      this.props.defaultValue !== undefined ? this.props.defaultValue : [];
    this.selectInput.value = value;
    this.applyFilter(value);
  }

  applyFilter(value: any) {
    if (value.length === 1 && value[0] === "") {
      value = [];
    }
    this.setState(() => ({ isSelected: value.length > 0 }));
    // TODO
    // @ts-ignore
    this.props.onFilter(this.props.column, FILTER_TYPES.MULTISELECT)(value);
  }

  filter(e: any) {
    const value = getSelections(e.target);
    this.applyFilter(value);
  }

  render() {
    const {
      id = null,
      style,
      className = "",
      filterState = {},
      defaultValue = [],
      onFilter,
      column,
      options,
      comparator = EQ,
      withoutEmptyOption = false,
      caseSensitive = true,
      getFilter,
      ...rest
    } = this.props;

    const selectClass = `filter select-filter form-control ${className} ${
      this.state.isSelected ? "" : "placeholder-selected"
    }`;
    const elmId = `multiselect-filter-column-${column.dataField}${
      id ? `-${id}` : ""
    }`;

    return (
      <label className="filter-label" htmlFor={elmId}>
        <span className="sr-only">Filter by {column.text}</span>
        <select
          {...rest}
          ref={(n) => (this.selectInput = n)}
          id={elmId}
          style={style}
          multiple
          className={selectClass}
          onChange={this.filter}
          onClick={(e) => e.stopPropagation()}
          defaultValue={this.getDefaultValue()}
        >
          {this.getOptions()}
        </select>
      </label>
    );
  }
}

// MultiSelectFilter.propTypes = {
//   onFilter: PropTypes.func.isRequired,
//   column: PropTypes.object.isRequired,
//   options: PropTypes.object.isRequired,
//   id: PropTypes.string,
//   filterState: PropTypes.object,
//   comparator: PropTypes.oneOf([LIKE, EQ]),
//   placeholder: PropTypes.string,
//   style: PropTypes.object,
//   className: PropTypes.string,
//   withoutEmptyOption: PropTypes.bool,
//   defaultValue: PropTypes.array,
//   caseSensitive: PropTypes.bool,
//   getFilter: PropTypes.func,
// };

// MultiSelectFilter.defaultProps = {
//   defaultValue: [],
//   filterState: {},
//   className: "",
//   withoutEmptyOption: false,
//   comparator: EQ,
//   caseSensitive: true,
//   id: null,
// };

export default MultiSelectFilter;
