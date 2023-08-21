import sinon from "sinon";

import { SORT_ASC, SORT_DESC } from "../..";
import { nextOrder, sort } from "../../src/store/sort";

describe("Sort Function", () => {
  const data = [
    { id: 3, name: "name2" },
    { id: 2, name: "ABC" },
    { id: 4, name: "123tester" },
    { id: 1, name: "!@#" },
  ];

  describe("sort", () => {
    const sortColumn = {
      dataField: "id",
      text: "ID",
    };
    let sortOrder;
    let result: any;

    it("should sort array with ASC order correctly", () => {
      sortOrder = SORT_ASC;
      result = sort(data, sortOrder, sortColumn);
      expect(result.length).toEqual(data.length);

      const sortedArray = data.map((e) => e.id).sort((a, b) => a - b);
      sortedArray.forEach((e, i) => {
        expect(e).toEqual(result[i].id);
      });
    });

    it("should sort array with DESC order correctly", () => {
      sortOrder = SORT_DESC;
      result = sort(data, sortOrder, sortColumn);
      expect(result.length).toEqual(data.length);

      const sortedArray = data.map((e) => e.id).sort((a, b) => b - a);
      sortedArray.forEach((e, i) => {
        expect(e).toEqual(result[i].id);
      });
    });

    it("should call custom sort function when sortFunc given", () => {
      const sortFunc = sinon.stub().returns(1);
      sortOrder = SORT_DESC;
      sort(data, sortOrder, { ...sortColumn, sortFunc });
      expect(sortFunc.callCount).toBe(3);
    });
  });

  describe("nextOrder", () => {
    const currentSortColumn = {
      dataField: "name",
      text: "Product Name",
    };
    it("should return correcly order when current sortField is not eq next sort field", () => {
      const nextSort = {
        sortColumn: {
          dataField: "id",
          text: "ID",
        },
        sortOrder: SORT_DESC,
      };
      expect(nextOrder(currentSortColumn, nextSort)).toBe(SORT_DESC);
    });

    it("should return correcly order if even next sort column is undefined", () => {
      expect(nextOrder(currentSortColumn, {})).toBe(SORT_DESC);
    });

    it("should return correcly order when current sortField is not eq next sort field and default sort direction is given", () => {
      const nextSort = {
        sortColumn: {
          dataField: "id",
          text: "ID",
        },
        sortOrder: SORT_DESC,
      };
      expect(nextOrder(currentSortColumn, nextSort, SORT_ASC)).toBe(SORT_ASC);
    });

    it("should return correcly order when current sortField is eq next sort field", () => {
      const nextSort = {
        sortColumn: currentSortColumn,
        sortOrder: SORT_ASC,
      };
      expect(nextOrder(currentSortColumn, nextSort)).toBe(SORT_DESC);
    });
  });
});
