/* eslint no-return-assign: 0 */
import cs from "classnames";
import React, { ChangeEvent, Component } from "react";

interface CheckBoxEditorProps {
  className?: string;
  value?: string;
  defaultValue?: any;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  didMount?: () => void;
  onUpdate?: any;
}

interface CheckBoxEditorState {
  checked: boolean;
}

class CheckBoxEditor extends Component<
  CheckBoxEditorProps,
  CheckBoxEditorState
> {
  checkbox: any;

  constructor(props: CheckBoxEditorProps) {
    super(props);
    this.state = {
      checked:
        (props.defaultValue ?? false).toString() ===
        (props.value ?? "on:off").split(":")[0],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { didMount } = this.props;
    this.checkbox.focus();
    if (didMount) didMount();
  }

  getValue() {
    const [positive, negative] = (this.props.value ?? "on:off").split(":");
    return this.checkbox.checked ? positive : negative;
  }

  handleChange(e: any) {
    if (this.props.onChange) this.props.onChange(e);
    const { target } = e;
    this.setState(() => ({ checked: target.checked }));
  }

  render() {
    const {
      defaultValue = false,
      didMount,
      className = "",
      onUpdate,
      ...rest
    } = this.props;
    const editorClass = cs("editor edit-chseckbox checkbox", className);
    return (
      <input
        ref={(node) => (this.checkbox = node)}
        type="checkbox"
        className={editorClass}
        {...rest}
        checked={this.state.checked}
        onChange={this.handleChange}
      />
    );
  }
}

// CheckBoxEditor.propTypes = {
//   className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
//   value: PropTypes.string,
//   defaultValue: PropTypes.any,
//   onChange: PropTypes.func,
//   didMount: PropTypes.func,
// };

// CheckBoxEditor.defaultProps = {
//   className: "",
//   value: "on:off",
//   defaultValue: false,
//   onChange: undefined,
//   didMount: undefined,
// };

export default CheckBoxEditor;
