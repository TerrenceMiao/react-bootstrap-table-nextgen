import React from "react";

import { SORT_ASC, SORT_DESC } from "../..";
import SortCaret from "../../src/sort/caret";
import { shallowWithContext } from "../test-helpers/new-context";

describe("SortCaret", () => {
  let wrapper: any;

  describe("when bootstrap4 context is false", () => {
    describe(`when order prop is ${SORT_ASC}`, () => {
      beforeEach(() => {
        wrapper = shallowWithContext(<SortCaret order={SORT_ASC} />, {
          bootstrap4: false,
        });
      });

      it("should render caret correctly", () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find("span").length).toBe(2);
        expect(wrapper.find(".caret").length).toBe(1);
        expect(wrapper.find(".dropup").length).toBe(1);
      });
    });

    describe(`when order prop is ${SORT_DESC}`, () => {
      beforeEach(() => {
        wrapper = shallowWithContext(<SortCaret order={SORT_DESC} />, {
          bootstrap4: false,
        });
      });

      it("should render caret correctly", () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find("span").length).toBe(2);
        expect(wrapper.find(".caret").length).toBe(1);
        expect(wrapper.find(".dropup").length).toBe(0);
      });
    });
  });

  describe("when bootstrap4 context is true", () => {
    describe(`when order prop is ${SORT_ASC}`, () => {
      beforeEach(() => {
        wrapper = shallowWithContext(<SortCaret order={SORT_ASC} />, {
          bootstrap4: true,
        });
      });

      it("should render caret correctly", () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find(".caret-4-asc").length).toBe(1);
      });
    });

    describe(`when order prop is ${SORT_DESC}`, () => {
      beforeEach(() => {
        wrapper = shallowWithContext(<SortCaret order={SORT_DESC} />, {
          bootstrap4: true,
        });
      });

      it("should render caret correctly", () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find(".caret-4-desc").length).toBe(1);
      });
    });
  });
});
