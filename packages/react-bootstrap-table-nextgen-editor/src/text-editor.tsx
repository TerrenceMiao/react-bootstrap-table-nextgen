/* eslint no-return-assign: 0 */
import cs from "classnames";
import React, { Component } from "react";

interface TextEditorProps {
  className?: string;
  defaultValue?: string | number;
  autoSelectText?: boolean;
  didMount?: () => void;
  onUpdate: (row: object, column: object, value: any) => void;
}

class TextEditor extends Component<TextEditorProps> {
  text: any;
  componentDidMount() {
    const { defaultValue = "", didMount, autoSelectText = false } = this.props;
    this.text.value = defaultValue;
    this.text.focus();
    if (autoSelectText) this.text.select();
    if (didMount) didMount();
  }

  getValue() {
    return this.text.value;
  }

  render() {
    const {
      defaultValue = "",
      didMount,
      className = "",
      autoSelectText = false,
      onUpdate,
      ...rest
    } = this.props;
    const editorClass = cs(className, "form-control editor edit-text");
    return (
      <input
        ref={(node) => (this.text = node)}
        type="text"
        className={editorClass}
        {...rest}
      />
    );
  }
}

// TextEditor.propTypes = {
//   className: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.object
//   ]),
//   defaultValue: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number
//   ]),
//   autoSelectText: PropTypes.bool,
//   didMount: PropTypes.func
// };

// TextEditor.defaultProps = {
//   className: null,
//   defaultValue: '',
//   autoSelectText: false,
//   didMount: undefined
// };

export default TextEditor;
