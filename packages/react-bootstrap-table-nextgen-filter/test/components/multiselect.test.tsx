import { mount, shallow } from "enzyme";
import "jsdom-global/register";
import React from "react";
import sinon from "sinon";
import { FILTER_TYPES } from "../..";
import MultiSelectFilter from "../../src/components/multiselect";

describe("Multi Select Filter", () => {
  let wrapper: any;
  let instance: any;

  // onFilter(x)(y) = filter result
  const onFilter = sinon.stub();
  const onFilterFirstReturn = sinon.stub();

  const column = {
    dataField: "quality",
    text: "Product Quality",
  };

  const options: { [index: number | string]: string } = {
    0: "Bad",
    1: "Good",
    2: "Unknown",
  };

  afterEach(() => {
    onFilter.reset();
    onFilterFirstReturn.reset();

    onFilter.returns(onFilterFirstReturn);
  });

  describe("initialization", () => {
    beforeEach(() => {
      wrapper = mount(
        <MultiSelectFilter
          onFilter={onFilter}
          column={column}
          options={options}
        />
      );
      instance = wrapper.instance();
    });

    it("should have correct state", () => {
      expect(instance.state.isSelected).toBeFalsy();
    });

    it("should rendering component successfully", () => {
      expect(wrapper).toHaveLength(1);
      expect(wrapper.find("select")).toHaveLength(1);
      expect(wrapper.find(".select-filter")).toHaveLength(1);
      expect(wrapper.find(".placeholder-selected")).toHaveLength(1);
    });

    it("should rendering select options correctly", () => {
      const select = wrapper.find("select");
      expect(select.find("option")).toHaveLength(
        Object.keys(options).length + 1
      );
      expect(select.childAt(0).text()).toEqual(`Select ${column.text}...`);

      Object.keys(options).forEach((key, i) => {
        expect(select.childAt(i + 1).prop("value")).toEqual(key);
        expect(select.childAt(i + 1).text()).toEqual(options[key]);
      });
    });
  });

  describe("when defaultValue is defined", () => {
    let defaultValue: any;

    describe("and it is valid", () => {
      beforeEach(() => {
        defaultValue = ["0"];
        wrapper = mount(
          <MultiSelectFilter
            onFilter={onFilter}
            column={column}
            options={options}
            defaultValue={defaultValue}
          />
        );
        instance = wrapper.instance();
      });

      it("should have correct state", () => {
        expect(instance.state.isSelected).toBeTruthy();
      });

      it("should rendering component successfully", () => {
        expect(wrapper).toHaveLength(1);
        expect(wrapper.find(".placeholder-selected")).toHaveLength(0);
      });

      it("should calling onFilter on componentDidMount", () => {
        expect(onFilter.calledOnce).toBeTruthy();
        expect(
          onFilter.calledWith(column, FILTER_TYPES.MULTISELECT)
        ).toBeTruthy();
        expect(onFilterFirstReturn.calledOnce).toBeTruthy();
        expect(onFilterFirstReturn.calledWith(defaultValue)).toBeTruthy();
      });
    });
  });

  describe("when props.getFilter is defined", () => {
    let programmaticallyFilter: any;

    const filterValue = ["foo"];

    const getFilter = (filter: any) => {
      programmaticallyFilter = filter;
    };

    beforeEach(() => {
      wrapper = mount(
        <MultiSelectFilter
          onFilter={onFilter}
          column={column}
          options={options}
          getFilter={getFilter}
        />
      );
      instance = wrapper.instance();

      programmaticallyFilter(filterValue);
    });

    it("should do onFilter correctly when exported function was executed", () => {
      expect(onFilter.calledOnce).toBeTruthy();
      expect(
        onFilter.calledWith(column, FILTER_TYPES.MULTISELECT)
      ).toBeTruthy();
      expect(onFilterFirstReturn.calledOnce).toBeTruthy();
      expect(onFilterFirstReturn.calledWith(filterValue)).toBeTruthy();
    });

    it("should setState correctly when exported function was executed", () => {
      expect(instance.state.isSelected).toBeTruthy();
    });
  });

  describe("when placeholder is defined", () => {
    const placeholder = "test";
    beforeEach(() => {
      wrapper = mount(
        <MultiSelectFilter
          onFilter={onFilter}
          column={column}
          options={options}
          placeholder={placeholder}
        />
      );
      instance = wrapper.instance();
    });

    it("should rendering component successfully", () => {
      expect(wrapper).toHaveLength(1);
      const select = wrapper.find("select");
      expect(select.childAt(0).text()).toEqual(placeholder);
    });
  });

  describe("when style is defined", () => {
    const style = { backgroundColor: "red" };
    beforeEach(() => {
      wrapper = mount(
        <MultiSelectFilter
          onFilter={onFilter}
          column={column}
          options={options}
          style={style}
        />
      );
    });

    it("should rendering component successfully", () => {
      expect(wrapper).toHaveLength(1);
      expect(wrapper.find("select").prop("style")).toEqual(style);
    });
  });

  describe("when withoutEmptyOption is defined", () => {
    beforeEach(() => {
      wrapper = mount(
        <MultiSelectFilter
          onFilter={onFilter}
          column={column}
          options={options}
          withoutEmptyOption
        />
      );
    });

    it("should rendering select without default empty option", () => {
      const select = wrapper.find("select");
      expect(select.find("option")).toHaveLength(Object.keys(options).length);
    });
  });

  describe("componentDidUpdate", () => {
    let prevProps;

    describe("when props.defaultValue is diff from prevProps.defaultValue", () => {
      const defaultValue: any[] = [];

      beforeEach(() => {
        wrapper = shallow(
          <MultiSelectFilter
            onFilter={onFilter}
            column={column}
            options={options}
            defaultValue={defaultValue}
          />
        );
        prevProps = {
          column,
          options,
          defaultValue: ["1"],
        };
        instance = wrapper.instance();
        wrapper.instance().componentDidUpdate(prevProps);
      });

      it("should update", () => {
        expect(onFilter.callCount).toBe(1);
        expect(
          onFilter.calledWith(column, FILTER_TYPES.MULTISELECT)
        ).toBeTruthy();
        expect(onFilterFirstReturn.callCount).toBe(1);
        expect(
          onFilterFirstReturn.calledWith(defaultValue)
        ).toBeTruthy();
      });
    });

    describe("when props.options is diff from prevProps.options", () => {
      const defaultValue: any[] = [];
      beforeEach(() => {
        wrapper = shallow(
          <MultiSelectFilter
            onFilter={onFilter}
            column={column}
            options={{
              ...options,
              3: "Best",
            }}
            defaultValue={defaultValue}
          />
        );
        prevProps = {
          column,
          options,
        };
        instance = wrapper.instance();
        wrapper.instance().componentDidUpdate(prevProps);
      });

      it("should update", () => {
        expect(onFilter.callCount).toBe(1);
        expect(
          onFilter.calledWith(column, FILTER_TYPES.MULTISELECT)
        ).toBeTruthy();
        expect(onFilterFirstReturn.callCount).toBe(1);
        expect(
          onFilterFirstReturn.calledWith(defaultValue)
        ).toBeTruthy();
      });
    });
  });

  describe("cleanFiltered", () => {
    describe("when props.defaultValue is defined", () => {
      const defaultValue = ["0"];
      beforeEach(() => {
        wrapper = mount(
          <MultiSelectFilter
            onFilter={onFilter}
            column={column}
            options={options}
            defaultValue={defaultValue}
          />
        );
        instance = wrapper.instance();
        instance.cleanFiltered();
      });

      it("should setting state correctly", () => {
        expect(instance.state.isSelected).toBeTruthy();
      });

      it("should calling onFilter correctly", () => {
        expect(onFilter.callCount).toBe(2);
        expect(
          onFilter.calledWith(column, FILTER_TYPES.MULTISELECT)
        ).toBeTruthy();
        expect(onFilterFirstReturn.callCount).toBe(2);
        expect(onFilterFirstReturn.calledWith(defaultValue)).toBeTruthy();
      });
    });

    describe("when props.defaultValue is not defined", () => {
      beforeEach(() => {
        wrapper = mount(
          <MultiSelectFilter
            onFilter={onFilter}
            column={column}
            options={options}
          />
        );
        instance = wrapper.instance();
        instance.cleanFiltered();
      });

      it("should setting state correctly", () => {
        expect(instance.state.isSelected).toBeFalsy();
      });

      it("should calling onFilter correctly", () => {
        expect(onFilter.callCount).toBe(1);
        expect(onFilterFirstReturn.callCount).toBe(1);
      });
    });
  });

  describe("applyFilter", () => {
    const values = ["2"];
    beforeEach(() => {
      wrapper = mount(
        <MultiSelectFilter
          onFilter={onFilter}
          column={column}
          options={options}
        />
      );
      instance = wrapper.instance();
      instance.applyFilter(values);
    });

    it("should setting state correctly", () => {
      expect(instance.state.isSelected).toBeTruthy();
    });

    it("should calling onFilter correctly", () => {
      expect(onFilter.calledOnce).toBeTruthy();
      expect(
        onFilter.calledWith(column, FILTER_TYPES.MULTISELECT)
      ).toBeTruthy();
      expect(onFilterFirstReturn.calledOnce).toBeTruthy();
      expect(onFilterFirstReturn.calledWith(values)).toBeTruthy();
    });
  });

  describe("filter", () => {
    const event = { target: { selectedOptions: [{ value: "tester" }] } };

    beforeEach(() => {
      wrapper = mount(
        <MultiSelectFilter
          onFilter={onFilter}
          column={column}
          options={options}
        />
      );
      instance = wrapper.instance();
      instance.filter(event);
    });

    it("should setting state correctly", () => {
      expect(instance.state.isSelected).toBeTruthy();
    });

    it("should calling onFilter correctly", () => {
      expect(onFilter.calledOnce).toBeTruthy();
      expect(
        onFilter.calledWith(column, FILTER_TYPES.MULTISELECT)
      ).toBeTruthy();
      expect(onFilterFirstReturn.calledOnce).toBeTruthy();
      expect(
        onFilterFirstReturn.calledWith(
          event.target.selectedOptions.map((item) => item.value)
        )
      ).toBeTruthy();
    });
  });
});
