/* eslint no-return-assign: 0 */
import cs from "classnames";
import React, { Component } from "react";

interface Option {
  label: string;
  value: any;
}

interface DropDownEditorProps {
  row: object;
  column: object;
  defaultValue?: string | number;
  className?: string;
  style?: object;
  options?: Option[];
  didMount?: () => void;
  getOptions?: (
    setOptions: (options: Option[]) => void,
    context: { row: object; column: object }
  ) => Option[] | void;
  onUpdate?: any;
}

interface DropDownEditorState {
  options: Option[];
}

class DropDownEditor extends Component<
  DropDownEditorProps,
  DropDownEditorState
> {
  select: any;
  constructor(props: any) {
    super(props);
    let options = props.options ?? [];
    if (props.getOptions) {
      options =
        props.getOptions(this.setOptions.bind(this), {
          row: props.row,
          column: props.column,
        }) || [];
    }
    this.state = { options };
  }

  componentDidMount() {
    const { defaultValue = "", didMount } = this.props;
    this.select.value = defaultValue;
    this.select.focus();
    if (didMount) {
      didMount();
    }
  }

  setOptions(options: any) {
    this.setState({ options });
  }

  getValue() {
    return this.select.value;
  }

  render() {
    const {
      defaultValue = "",
      didMount,
      getOptions,
      className = "",
      onUpdate,
      ...rest
    } = this.props;
    const editorClass = cs(className, "form-control editor edit-select");

    const attr = {
      ...rest,
      className: editorClass,
    };

    return (
      <select
        {...attr}
        ref={(node) => (this.select = node)}
        defaultValue={defaultValue}
      >
        {this.state.options.map(({ label, value }: any) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    );
  }
}

// DropDownEditor.propTypes = {
//   row: PropTypes.object.isRequired,
//   column: PropTypes.object.isRequired,
//   defaultValue: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number
//   ]),
//   className: PropTypes.string,
//   style: PropTypes.object,
//   options: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.shape({
//       label: PropTypes.string,
//       value: PropTypes.any
//     }))
//   ]),
//   didMount: PropTypes.func,
//   getOptions: PropTypes.func
// };

// DropDownEditor.defaultProps = {
//   className: '',
//   defaultValue: '',
//   style: {},
//   options: [],
//   didMount: undefined,
//   getOptions: undefined
// };

export default DropDownEditor;
