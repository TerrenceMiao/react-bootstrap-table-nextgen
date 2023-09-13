import { mount } from "enzyme";
import "jsdom-global/register";
import React from "react";

import TextEditor from "../src/text-editor";

describe("TextEditor", () => {
  let wrapper: any;
  const value = "test";

  beforeEach(() => {
    wrapper = mount(<TextEditor defaultValue={value} onUpdate={() => {}} />);
  });

  it("should render TextEditor correctly", () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper.find("input").length).toBe(1);
    expect(wrapper.find("input").prop("type")).toEqual("text");
    expect(wrapper.find(".form-control.editor.edit-text").length).toBe(1);
  });

  describe("when className prop defined", () => {
    const className = "test-class";
    beforeEach(() => {
      wrapper = mount(
        <TextEditor
          defaultValue={value}
          className={className}
          onUpdate={() => {}}
        />
      );
    });

    it("should render correct custom classname", () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.hasClass(className)).toBeTruthy();
    });
  });
});
