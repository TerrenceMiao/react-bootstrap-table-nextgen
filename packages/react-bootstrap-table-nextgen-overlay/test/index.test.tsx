import { render, shallow } from "enzyme";
import React from "react";
import LoadingOverlay from "react-loading-overlay-nextgen";

import overlayFactory from "../index";

describe("overlayFactory", () => {
  let wrapper: any;

  const createTable = () => (
    <table>
      <thead>
        <tr>
          <th>column1</th>
          <th>column2</th>
        </tr>
      </thead>
      <tbody>
        {[1, 2].map((row) => (
          <tr key={row}>
            <td>{row}</td>
            <td>test</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  describe("when loading is false", () => {
    beforeEach(() => {
      const tableElm = createTable();
      const Overlay = overlayFactory()(false);
      wrapper = shallow(<Overlay>{tableElm}</Overlay>);
    });

    it("should rendering Overlay component correctly", () => {
      const overlay = wrapper.find(LoadingOverlay);
      expect(wrapper.length).toBe(1);
      expect(overlay.length).toBe(1);
      expect(overlay.prop("active")).toBeFalsy();
    });
  });

  describe("when loading is true", () => {
    beforeEach(() => {
      const tableElm = createTable();
      const Overlay = overlayFactory()(true);
      wrapper = render(<Overlay>{tableElm}</Overlay>);
    });

    it("should rendering Overlay component correctly", () => {
      expect(wrapper.length).toBe(1);
    });
  });

  describe("when options is given", () => {
    const options: { [key: string]: any } = {
      spinner: true,
      background: "red",
    };
    beforeEach(() => {
      const tableElm = createTable();
      const Overlay = overlayFactory(options)(false);
      wrapper = shallow(<Overlay>{tableElm}</Overlay>);
    });

    it("should rendering Overlay component with options correctly", () => {
      const overlay = wrapper.find(LoadingOverlay);
      expect(wrapper.length).toBe(1);
      expect(overlay.length).toBe(1);
      expect(overlay.prop("active")).toBeFalsy();
      Object.keys(options).forEach((key: string) => {
        expect(overlay.prop(key)).toEqual(options[key]);
      });
    });
  });
});
