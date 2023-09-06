import cs from "classnames";
import React from "react";
import { CSSTransition } from "react-transition-group";

interface ExpandRowProps {
  children?: React.ReactNode;
  expanded?: boolean;
  onClosed?: () => void;
  className?: string;
  colSpan: number;
}

class ExpandRow extends React.Component<ExpandRowProps> {
  nodeRef: any;

  constructor(props: ExpandRowProps) {
    super(props);
    this.nodeRef = React.createRef();
  }

  render() {
    const {
      children,
      expanded = false,
      onClosed,
      className = "",
      ...rest
    } = this.props;

    return (
      <tr>
        <td className={cs("reset-expansion-style", className)} {...rest}>
          <CSSTransition
            appear
            in={expanded}
            timeout={400}
            classNames="row-expand-slide"
            onExited={onClosed}
            nodeRef={this.nodeRef}
          >
            <div ref={this.nodeRef}>
              <div className="row-expansion-style">{children}</div>
            </div>
          </CSSTransition>
        </td>
      </tr>
    );
  }
}

// ExpandRow.propTypes = {
//   children: PropTypes.node,
//   expanded: PropTypes.bool,
//   onClosed: PropTypes.func,
//   className: PropTypes.string,
// };

// ExpandRow.defaultProps = {
//   children: null,
//   expanded: false,
//   onClosed: undefined,
//   className: "",
// };

export default ExpandRow;
