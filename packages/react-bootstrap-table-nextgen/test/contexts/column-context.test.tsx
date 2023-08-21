import { shallow } from "enzyme";
import "jsdom-global/register";
import React from "react";

import BootstrapTable from "../../src/bootstrap-table";
import createColumnContext from "../../src/contexts/column-context";

describe("ColumnManagementContext", () => {
  let wrapper: any;

  const data = [
    {
      id: 1,
      name: "A",
    },
    {
      id: 2,
      name: "B",
    },
  ];

  const columns = [
    {
      dataField: "id",
      text: "ID",
    },
    {
      dataField: "name",
      text: "Name",
    },
  ];

  const mockBase = jest.fn((props) => (
    <BootstrapTable data={data} columns={columns} keyField="id" {...props} />
  ));

  const ColumnContext = createColumnContext();

  function shallowContext(options = {}) {
    return (
      <ColumnContext.Provider
        data={data}
        columns={columns}
        {...options}
      >
        <ColumnContext.Consumer>
          {(columnToggleProps) => mockBase(columnToggleProps)}
        </ColumnContext.Consumer>
      </ColumnContext.Provider>
    );
  }

  describe("default render", () => {
    beforeEach(() => {
      wrapper = shallow(shallowContext());
      wrapper.render();
    });

    it("should have correct Provider property after calling createColumnManagementContext", () => {
      expect(ColumnContext.Provider).toBeDefined();
    });

    it("should have correct Consumer property after calling createColumnManagementContext", () => {
      expect(ColumnContext.Consumer).toBeDefined();
    });
  });

  describe("when toggles props exist", () => {
    beforeEach(() => {
      wrapper = shallow(
        shallowContext({
          toggles: {
            id: true,
            name: false,
          },
        })
      );
    });

    it("should render component with correct columns props", () => {
      expect(wrapper.prop("value").columns).toHaveLength(columns.length - 1);
      expect(wrapper.prop("value").columns[0].dataField).toEqual("id");
    });
  });

  describe("if there is any column.hidden is true", () => {
    beforeEach(() => {
      wrapper = shallow(
        shallowContext({
          columns: [
            {
              dataField: "id",
              text: "ID",
            },
            {
              dataField: "name",
              text: "Name",
              hidden: true,
            },
          ],
        })
      );
    });

    it("should render component with correct columns props", () => {
      expect(wrapper.prop("value").columns).toHaveLength(columns.length - 1);
      expect(wrapper.prop("value").columns[0].dataField).toEqual("id");
    });
  });
});
