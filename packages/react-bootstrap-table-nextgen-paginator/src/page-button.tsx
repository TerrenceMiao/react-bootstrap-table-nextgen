/* eslint react/require-default-props: 0 */
import cs from "classnames";
import React, { Component } from "react";

interface PageButtonProps {
  onPageChange: (page: any) => void;
  page: React.ReactNode | number | string;
  active: boolean;
  disabled: boolean;
  className?: string;
  title?: string;
}

class PageButton extends Component<PageButtonProps> {
  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: any) {
    e.preventDefault();
    this.props.onPageChange(this.props.page);
  }

  render() {
    const { page, title, active, disabled, className } = this.props;
    const classes = cs(
      {
        active,
        disabled,
        "page-item": true,
      },
      className
    );

    return (
      <li className={classes} title={title}>
        <a href="#" onClick={this.handleClick} className="page-link">
          {page}
        </a>
      </li>
    );
  }
}

// PageButton.propTypes = {
//   onPageChange: PropTypes.func.isRequired,
//   page: PropTypes.oneOfType([
//     PropTypes.node,
//     PropTypes.number,
//     PropTypes.string,
//   ]).isRequired,
//   active: PropTypes.bool.isRequired,
//   disabled: PropTypes.bool.isRequired,
//   className: PropTypes.string,
//   title: PropTypes.string,
// };

export default PageButton;
