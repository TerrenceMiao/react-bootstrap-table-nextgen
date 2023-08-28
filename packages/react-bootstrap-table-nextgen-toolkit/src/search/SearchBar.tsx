/* eslint camelcase: 0 */
/* eslint no-return-assign: 0 */
import React, { CSSProperties } from "react";
import { SearchProps } from "react-bootstrap-table-nextgen";

// const handleDebounce = (func: any, wait: any, immediate: any) => {
//   let timeout: any;

//   return () => {
//     const later = () => {
//       timeout = null;

//       if (!immediate) {
//         func.apply(this, arguments);
//       }
//     };

//     const callNow = immediate && !timeout;

//     clearTimeout(timeout);

//     timeout = setTimeout(later, wait || 0);

//     if (callNow) {
//       func.appy(this, arguments);
//     }
//   };
// };

const handleDebounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number,
  immediate?: boolean
) => {
  let timeout: NodeJS.Timeout | undefined;

  return (...args: Parameters<T>) => {
    const later = () => {
      timeout = undefined;

      if (!immediate) {
        func.apply(this, args);
      }
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait || 0);

    if (callNow) {
      func.apply(this, args);
    }
  };
};

// interface SearchBarProps {
//   onSearch: (searchText: string) => void;
//   className?: string;
//   placeholder?: string;
//   style?: React.CSSProperties;
//   delay?: number;
//   searchText?: string;
//   tableId?: string;
//   srText?: string;
// }

export interface SearchBarProps<T = any> extends SearchProps<T> {
  className?: string | undefined;
  style?: CSSProperties | undefined;
  delay?: number | undefined;
  searchText?: string | undefined;
  tableId?: string | undefined;
  ref?: React.RefObject<React.Component<SearchProps<T>>>;
}

interface SearchBarState {
  value: string;
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  input: HTMLInputElement | null = null;

  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      value: props.searchText ?? "",
    };
  }

  onChangeValue = (e: any) => {
    this.setState({ value: e.target.value });
  };

  onKeyup = () => {
    const { delay = 250, onSearch } = this.props;
    const debounceCallback = handleDebounce(() => {
      onSearch!(this.input?.value ?? "");
    }, delay);
    debounceCallback();
  };

  componentDidUpdate(prevProps: SearchBarProps) {
    if (this.props.searchText !== prevProps.searchText) {
      this.setState({ value: this.props.searchText || "" });
    }
  }

  render() {
    const {
      className = "",
      style = {},
      placeholder = "Search",
      tableId = "0",
      searchText = "Search this table",
    } = this.props;

    return (
      <label htmlFor={`search-bar-${tableId}`} className="search-label">
        <span id={`search-bar-${tableId}-label`} className="sr-only">
          {searchText}
        </span>
        <input
          ref={(n) => (this.input = n)}
          id={`search-bar-${tableId}`}
          type="text"
          style={style}
          aria-labelledby={`search-bar-${tableId}-label`}
          onKeyUp={() => this.onKeyup()}
          onChange={this.onChangeValue}
          className={`form-control ${className}`}
          value={this.state.value}
          placeholder={placeholder}
        />
      </label>
    );
  }
}

// SearchBar.propTypes = {
//   onSearch: PropTypes.func.isRequired,
//   className: PropTypes.string,
//   placeholder: PropTypes.string,
//   style: PropTypes.object,
//   delay: PropTypes.number,
//   searchText: PropTypes.string,
//   tableId: PropTypes.string,
//   srText: PropTypes.string
// };

// SearchBar.defaultProps = {
//   className: '',
//   style: {},
//   placeholder: 'Search',
//   delay: 250,
//   searchText: '',
//   tableId: '0',
//   srText: 'Search this table'
// };

export default SearchBar;
