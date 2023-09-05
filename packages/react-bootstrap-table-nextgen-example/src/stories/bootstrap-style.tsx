/* eslint no-return-assign: 0 */
import PropTypes from "prop-types";
import React, { Fragment, PureComponent } from "react";

interface WithBootstrapStyleProps {
  version: string;
  render: (loading: boolean) => React.ReactNode;
}

interface WithBootstrapStyleState{
  loading: boolean;
}

export const BOOTSTRAP_VERSION = {
  FOUR: "4.1.3",
  THREE: "3.3.7",
};

class WithBootstrapStyle extends PureComponent<WithBootstrapStyleProps, WithBootstrapStyleState> {
  static propTypes = {
    version: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
  };

  style: HTMLLinkElement | null = null;

  constructor(props: WithBootstrapStyleProps) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    this.style?.addEventListener("load", this.handleLoadEvent);
  }

  componentWillUnmount() {
    this.style?.removeEventListener("load", this.handleLoadEvent);
  }

  handleLoadEvent = () => {
    this.setState({ loading: false });
  };

  render() {
    const { version, render } = this.props;

    const href = `style/bootstrap.${version}.min.css`;

    return (
      <Fragment>
        <link
          href={href}
          rel="stylesheet"
          ref={(element) => (this.style = element)}
        />
        {render(this.state.loading)}
      </Fragment>
    );
  }
}

/**
 * Currently we adopt version 3 as default.
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default (version: string = BOOTSTRAP_VERSION.THREE) => (story: () => React.ReactNode) => (
  <WithBootstrapStyle
    version={version}
    render={(loading) => !loading && story()}
  />
);
