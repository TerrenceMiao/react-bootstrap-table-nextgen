/* eslint no-return-assign: 0 */
import cs from "classnames";
import React, { Component } from "react";

interface DateEditorProps {
  className?: string;
  defaultValue?: string;
  didMount?: () => void;
  onUpdate?: any;
}

class DateEditor extends Component<DateEditorProps> {
  date: any;
  componentDidMount() {
    const { defaultValue = "", didMount } = this.props;
    this.date.valueAsDate = new Date(defaultValue);
    this.date.focus();
    if (didMount) {
      didMount();
    }
  }

  getValue() {
    return this.date.value;
  }

  render() {
    const {
      defaultValue = "",
      didMount,
      className = "",
      onUpdate,
      ...rest
    } = this.props;
    const editorClass = cs(className, "form-control editor edit-date");
    return (
      <input
        ref={(node) => (this.date = node)}
        type="date"
        className={editorClass}
        {...rest}
      />
    );
  }
}

// DateEditor.propTypes = {
//   className: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.object
//   ]),
//   defaultValue: PropTypes.string,
//   didMount: PropTypes.func
// };
// DateEditor.defaultProps = {
//   className: '',
//   defaultValue: '',
//   didMount: undefined
// };

export default DateEditor;
