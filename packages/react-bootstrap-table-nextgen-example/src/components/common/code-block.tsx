import PropTypes from "prop-types";
import React from "react";

interface DefaultComponentProps {
  children: any;
}

export default class DefaultComponent extends React.Component<DefaultComponentProps> {
  static propTypes = {
    children: PropTypes.string,
  };

  static defaultProps = {
    children: "",
  };

  componentDidMount() {
    // code-prettify https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js
    // run the PR.prettyPrint() function once your page has finished loading
    // defined in .storybook/main.ts file
    // @ts-ignore
    if (typeof PR !== "undefined") {
      // @ts-ignore
      PR.prettyPrint();
    }
  }

  render() {
    return (
      <div className="highlight-text-html-basic">
        <pre className="prettyprint lang-js">{this.props.children}</pre>
      </div>
    );
  }
}
