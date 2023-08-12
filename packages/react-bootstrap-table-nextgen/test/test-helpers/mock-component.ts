import { Component } from "react";

export const extendTo = (Base: any) =>
  class MockComponent extends Component<typeof Base> {
    render() {
      return null;
    }
  };
