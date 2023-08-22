import React from "react";

import SortSymbol from "../../src/sort/symbol";
import { shallowWithContext } from "../test-helpers/new-context";

describe("SortSymbol", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallowWithContext(<SortSymbol />, { bootstrap4: false });
  });
  it("should render sort symbol correctly", () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper.find(".order").length).toBe(1);
    expect(wrapper.find(".caret").length).toBe(2);
    expect(wrapper.find(".dropdown").length).toBe(1);
    expect(wrapper.find(".dropup").length).toBe(1);
  });

  describe("if bootstrap4 prop is true", () => {
    beforeEach(() => {
      wrapper = shallowWithContext(<SortSymbol />, { bootstrap4: true });
    });
    it("should render sort symbol correctly", () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find(".order-4").length).toBe(1);
    });
  });
});
