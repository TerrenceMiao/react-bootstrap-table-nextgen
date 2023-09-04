import PropTypes from "prop-types";
import React, { Component } from "react";

interface DefaultComponentProps {
  children: any;
}

export default class DefaultComponent extends Component<DefaultComponentProps> {
  static propTypes = {
    children: PropTypes.string,
  };
  static defaultProps = {
    children: "",
  };
  componentDidMount() {
    // code-prettify
    // run the PR.prettyPrint() function once your page has finished loading
    // @ts-ignore
    if (typeof (PR) !== "undefined") PR.prettyPrint();
  }

  render() {
    return (
      <div className="highlight-text-html-basic">
        <pre className="prettyprint lang-js">{this.props.children}</pre>
      </div>
    );
  }
}
