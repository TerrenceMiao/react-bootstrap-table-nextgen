/* eslint no-return-assign: 0 */
import cs from "classnames";
import React, { Component } from "react";

interface TextEditorProps {
  className?: string;
  defaultValue?: string | number;
  autoSelectText?: boolean;
  didMount?: () => void;
  onKeyDown: (event: any) => void;
}

class TextAreaEditor extends Component<TextEditorProps> {
  text: any;
  constructor(props: TextEditorProps) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    const {
      defaultValue = null,
      didMount,
      autoSelectText = false,
    } = this.props;
    this.text.value = defaultValue;
    this.text.focus();
    if (autoSelectText) this.text.select();
    if (didMount) didMount();
  }

  getValue() {
    return this.text.value;
  }

  handleKeyDown(e: any) {
    if (e.keyCode === 13 && !e.shiftKey) return;
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  }

  render() {
    const {
      defaultValue = "",
      didMount,
      className = "",
      autoSelectText = false,
      ...rest
    } = this.props;
    const editorClass = cs(className, "form-control editor edit-textarea");
    return (
      <textarea
        ref={(node) => (this.text = node)}
        // type="textarea"
        className={editorClass}
        {...rest}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}

// TextAreaEditor.propTypes = {
//   className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
//   defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   onKeyDown: PropTypes.func,
//   autoSelectText: PropTypes.bool,
//   didMount: PropTypes.func,
// };

// TextAreaEditor.defaultProps = {
//   className: "",
//   defaultValue: "",
//   autoSelectText: false,
//   onKeyDown: undefined,
//   didMount: undefined,
// };

export default TextAreaEditor;
