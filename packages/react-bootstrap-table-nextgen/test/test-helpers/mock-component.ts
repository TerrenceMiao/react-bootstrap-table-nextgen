export const extendTo = (Base: any) =>
  class MockComponent extends Base {
    render() {
      return null;
    }
  };
