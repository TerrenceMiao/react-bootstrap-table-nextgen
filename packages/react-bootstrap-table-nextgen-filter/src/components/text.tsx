/* eslint react/require-default-props: 0 */
/* eslint react/prop-types: 0 */
/* eslint no-return-assign: 0 */
/* eslint camelcase: 0 */
import React, { Component } from "react";

import { FILTER_TYPES, TextFilterProps } from "../..";

interface TextFilterState {
  value: any;
}

class TextFilter extends Component<TextFilterProps, TextFilterState> {
  input: any;
  timeout: any;
  constructor(props: any) {
    super(props);
    this.filter = this.filter.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.timeout = null;
    function getDefaultValue() {
      if (
        props.filterState &&
        typeof props.filterState.filterVal !== "undefined"
      ) {
        return props.filterState.filterVal;
      }
      return props.defaultValue;
    }
    this.state = {
      value: getDefaultValue(),
    };
  }

  componentDidMount() {
    const { onFilter, getFilter, column } = this.props;
    const defaultValue = this.input.value;

    if (defaultValue) {
      // TODO
      // onFilter(this.props.column, FILTER_TYPES.TEXT, true)(defaultValue);
      console.log(FILTER_TYPES.TEXT);
    }

    // export onFilter function to allow users to access
    if (getFilter) {
      getFilter((filterVal: any) => {
        this.setState(() => ({ value: filterVal }));
        // TODO
        // onFilter(column, FILTER_TYPES.TEXT)(filterVal);
        console.log(FILTER_TYPES.TEXT);
      });
    }
  }

  componentWillUnmount() {
    this.cleanTimer();
  }

  componentDidUpdate(nextProps: any) {
    if (nextProps.defaultValue !== this.props.defaultValue) {
      this.applyFilter(nextProps.defaultValue);
    }
  }

  filter(e: any) {
    e.stopPropagation();
    this.cleanTimer();
    const filterValue = e.target.value;
    this.setState(() => ({ value: filterValue }));
    this.timeout = setTimeout(() => {
      // TODO
      // this.props.onFilter(this.props.column, FILTER_TYPES.TEXT)(filterValue);
      console.log(FILTER_TYPES.TEXT);
    }, this.props.delay);
  }

  cleanTimer() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  cleanFiltered() {
    const value = this.props.defaultValue;
    this.setState(() => ({ value }));
    // TODO
    // this.props.onFilter(this.props.column, FILTER_TYPES.TEXT)(value);
    console.log(FILTER_TYPES.TEXT);
  }

  applyFilter(filterText: any) {
    this.setState(() => ({ value: filterText }));
    // TODO
    // this.props.onFilter(this.props.column, FILTER_TYPES.TEXT)(filterText);
    console.log(FILTER_TYPES.TEXT);
  }

  handleClick(e: any) {
    e.stopPropagation();
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  render() {
    const {
      id,
      placeholder,
      column: { dataField, text },
      style,
      className,
      onFilter,
      caseSensitive,
      defaultValue,
      getFilter,
      filterState,
      ...rest
    } = this.props;

    const elmId = `text-filter-column-${dataField}${id ? `-${id}` : ""}`;

    return (
      <label className="filter-label" htmlFor={elmId}>
        <span className="sr-only">Filter by {text}</span>
        <input
          {...rest}
          ref={(n) => (this.input = n)}
          type="text"
          id={elmId}
          className={`filter text-filter form-control ${className}`}
          style={style}
          onChange={this.filter}
          onClick={this.handleClick}
          placeholder={placeholder || `Enter ${text}...`}
          value={this.state.value}
        />
      </label>
    );
  }
}

// TextFilter.propTypes = {
//   onFilter: PropTypes.func.isRequired,
//   column: PropTypes.object.isRequired,
//   id: PropTypes.string,
//   filterState: PropTypes.object,
//   comparator: PropTypes.oneOf([LIKE, EQ]),
//   defaultValue: PropTypes.string,
//   delay: PropTypes.number,
//   placeholder: PropTypes.string,
//   style: PropTypes.object,
//   className: PropTypes.string,
//   caseSensitive: PropTypes.bool,
//   getFilter: PropTypes.func,
// };

// TextFilter.defaultProps = {
//   delay: FILTER_DELAY,
//   filterState: {},
//   defaultValue: "",
//   caseSensitive: false,
//   id: null,
// };

export default TextFilter;
