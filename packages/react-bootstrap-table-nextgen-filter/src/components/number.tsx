/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint react/require-default-props: 0 */
/* eslint no-return-assign: 0 */
import React, { Component } from "react";
import { FILTER_DELAY, FILTER_TYPES, NumberFilterProps } from "../..";

const EQ = "=";
const NE = "!=";
const GT = ">";
const GE = ">=";
const LT = "<";
const LE = "<=";

const legalComparators = [EQ, NE, GT, GE, LT, LE];

interface NumberFilterState {
  isSelected: boolean;
}

class NumberFilter extends Component<NumberFilterProps, NumberFilterState> {
  comparators: any[];
  numberFilter: any;
  numberFilterComparator: any;
  timeout: any;

  constructor(props: NumberFilterProps) {
    super(props);
    this.comparators = props.comparators || legalComparators;
    this.timeout = null;
    let isSelected =
      props.defaultValue !== undefined &&
      props.defaultValue.number !== undefined;
    if (props.options && isSelected) {
      isSelected = props.options.indexOf(props.defaultValue.number) > -1;
    }
    this.state = { isSelected };
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeNumberSet = this.onChangeNumberSet.bind(this);
    this.onChangeComparator = this.onChangeComparator.bind(this);
  }

  componentDidMount() {
    const { column, onFilter, getFilter } = this.props;
    const comparator =
      this.numberFilterComparator.value === ""
        ? EQ
        : this.numberFilterComparator.value;
    const number = this.numberFilter.value;
    if (comparator && number) {
      // TODO
      // @ts-ignore
      onFilter(column, FILTER_TYPES.NUMBER, true)({ number, comparator });
    }

    // export onFilter function to allow users to access
    if (getFilter) {
      getFilter((filterVal: any) => {
        this.setState(() => ({ isSelected: filterVal !== "" }));
        this.numberFilterComparator.value = filterVal.comparator;
        this.numberFilter.value = filterVal.number;

        const fn = filterVal.number;
        const fc = filterVal.comparator;
        // TODO
        // @ts-ignore
        onFilter(column, FILTER_TYPES.NUMBER)({ number: fn, comparator: fc });
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onChangeNumber(e: any) {
    const { delay = FILTER_DELAY, column, onFilter } = this.props;
    const comparator = this.numberFilterComparator.value;
    if (comparator === "") {
      return;
    }
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    const v = e.target.value;
    this.timeout = setTimeout(() => {
      // TODO
      // @ts-ignore
      onFilter(column, FILTER_TYPES.NUMBER)({ number: v, comparator });
    }, delay);
  }

  onChangeNumberSet(e: any) {
    const { column, onFilter } = this.props;
    const comparator = this.numberFilterComparator.value;
    const { value } = e.target;
    this.setState(() => ({ isSelected: value !== "" }));
    // if (comparator === '') {
    //   return;
    // }
    // TODO
    // @ts-ignore
    onFilter(column, FILTER_TYPES.NUMBER)({ number: value, comparator });
  }

  onChangeComparator(e: any) {
    const { column, onFilter } = this.props;
    const value = this.numberFilter.value;
    const comparator = e.target.value;
    // if (value === '') {
    //   return;
    // }
    // TODO
    // @ts-ignore
    onFilter(column, FILTER_TYPES.NUMBER)({ number: value, comparator });
  }

  getDefaultComparator() {
    const {
      defaultValue = { number: undefined, comparator: "" },
      filterState = {},
    } = this.props;
    if (filterState && filterState.filterVal) {
      return filterState.filterVal.comparator;
    }
    if (defaultValue && defaultValue.comparator) {
      return defaultValue.comparator;
    }
    return "";
  }

  getDefaultValue() {
    const {
      defaultValue = { number: undefined, comparator: "" },
      filterState = {},
    } = this.props;
    if (filterState && filterState.filterVal) {
      return filterState.filterVal.number;
    }
    if (defaultValue && defaultValue.number) {
      return defaultValue.number;
    }
    return "";
  }

  getComparatorOptions() {
    const optionTags = [];
    const { withoutEmptyComparatorOption = false } = this.props;
    if (!withoutEmptyComparatorOption) {
      optionTags.push(<option key="-1" />);
    }
    for (let i = 0; i < this.comparators.length; i += 1) {
      optionTags.push(
        <option key={i} value={this.comparators[i]}>
          {this.comparators[i]}
        </option>
      );
    }
    return optionTags;
  }

  getNumberOptions() {
    const optionTags = [];
    const { options, column, withoutEmptyNumberOption = false } = this.props;
    if (!withoutEmptyNumberOption) {
      optionTags.push(
        <option key="-1" value="">
          {this.props.placeholder || `Select ${column.text}...`}
        </option>
      );
    }
    for (let i = 0; i < (options as number[]).length; i += 1) {
      optionTags.push(
        <option key={i} value={(options as number[])[i]}>
          {(options as number[])[i]}
        </option>
      );
    }
    return optionTags;
  }

  applyFilter(filterObj: any) {
    const { column, onFilter } = this.props;
    const { number, comparator } = filterObj;
    this.setState(() => ({ isSelected: number !== "" }));
    this.numberFilterComparator.value = comparator;
    this.numberFilter.value = number;
    // TODO
    // @ts-ignore
    onFilter(column, FILTER_TYPES.NUMBER)({ number, comparator });
  }

  cleanFiltered() {
    const {
      column,
      onFilter,
      defaultValue = { number: undefined, comparator: "" },
    } = this.props;
    const value = defaultValue ? defaultValue.number : "";
    const comparator = defaultValue ? defaultValue.comparator : "";
    this.setState(() => ({ isSelected: value !== "" }));
    this.numberFilterComparator.value = comparator;
    this.numberFilter.value = value;
    // TODO
    // @ts-ignore
    onFilter(column, FILTER_TYPES.NUMBER)({ number: value, comparator });
  }

  render() {
    const { isSelected } = this.state;
    const {
      id = null,
      column,
      options,
      style,
      className = "",
      numberStyle,
      numberClassName = "",
      comparatorStyle,
      comparatorClassName = "",
      placeholder,
    } = this.props;
    const selectClass = `
      select-filter
      number-filter-input
      form-control
      ${numberClassName}
      ${!isSelected ? "placeholder-selected" : ""}
    `;

    const comparatorElmId = `number-filter-comparator-${column.dataField}${
      id ? `-${id}` : ""
    }`;
    const inputElmId = `number-filter-column-${column.dataField}${
      id ? `-${id}` : ""
    }`;

    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className={`filter number-filter ${className}`}
        style={style}
      >
        <label className="filter-label" htmlFor={comparatorElmId}>
          <span className="sr-only">Filter comparator</span>
          <select
            ref={(n) => (this.numberFilterComparator = n)}
            style={comparatorStyle}
            id={comparatorElmId}
            className={`number-filter-comparator form-control ${comparatorClassName}`}
            onChange={this.onChangeComparator}
            defaultValue={this.getDefaultComparator()}
          >
            {this.getComparatorOptions()}
          </select>
        </label>
        {options ? (
          <label className="filter-label" htmlFor={inputElmId}>
            <span className="sr-only">{`Select ${column.text}`}</span>
            <select
              ref={(n) => (this.numberFilter = n)}
              id={inputElmId}
              style={numberStyle}
              className={selectClass}
              onChange={this.onChangeNumberSet}
              defaultValue={this.getDefaultValue()}
            >
              {this.getNumberOptions()}
            </select>
          </label>
        ) : (
          <label htmlFor={inputElmId}>
            <span className="sr-only">{`Enter ${column.text}`}</span>
            <input
              ref={(n) => (this.numberFilter = n)}
              id={inputElmId}
              type="number"
              style={numberStyle}
              className={`number-filter-input form-control ${numberClassName}`}
              placeholder={placeholder || `Enter ${column.text}...`}
              onChange={this.onChangeNumber}
              defaultValue={this.getDefaultValue()}
            />
          </label>
        )}
      </div>
    );
  }
}

// NumberFilter.propTypes = {
//   onFilter: PropTypes.func.isRequired,
//   column: PropTypes.object.isRequired,
//   id: PropTypes.string,
//   filterState: PropTypes.object,
//   options: PropTypes.arrayOf(PropTypes.number),
//   defaultValue: PropTypes.shape({
//     number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     comparator: PropTypes.oneOf([...legalComparators, ""]),
//   }),
//   delay: PropTypes.number,
//   /* eslint consistent-return: 0 */
//   comparators: (props: any, propName: any) => {
//     if (!props[propName]) {
//       return;
//     }
//     for (let i = 0; i < props[propName].length; i += 1) {
//       let comparatorIsValid = false;
//       for (let j = 0; j < legalComparators.length; j += 1) {
//         if (
//           legalComparators[j] === props[propName][i] ||
//           props[propName][i] === ""
//         ) {
//           comparatorIsValid = true;
//           break;
//         }
//       }
//       if (!comparatorIsValid) {
//         return new Error(`Number comparator provided is not supported.
//           Use only ${legalComparators}`);
//       }
//     }
//   },
//   placeholder: PropTypes.string,
//   withoutEmptyComparatorOption: PropTypes.bool,
//   withoutEmptyNumberOption: PropTypes.bool,
//   style: PropTypes.object,
//   className: PropTypes.string,
//   comparatorStyle: PropTypes.object,
//   comparatorClassName: PropTypes.string,
//   numberStyle: PropTypes.object,
//   numberClassName: PropTypes.string,
//   getFilter: PropTypes.func,
// };

// NumberFilter.defaultProps = {
//   delay: FILTER_DELAY,
//   options: undefined,
//   defaultValue: {
//     number: undefined,
//     comparator: "",
//   },
//   filterState: {},
//   withoutEmptyComparatorOption: false,
//   withoutEmptyNumberOption: false,
//   comparators: legalComparators,
//   placeholder: undefined,
//   style: undefined,
//   className: "",
//   comparatorStyle: undefined,
//   comparatorClassName: "",
//   numberStyle: undefined,
//   numberClassName: "",
//   id: null,
// };

export default NumberFilter;
