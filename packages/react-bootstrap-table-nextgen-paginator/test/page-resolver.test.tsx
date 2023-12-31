import { shallow } from "enzyme";
import React, { Component } from "react";

import pageResolver from "../src/page-resolver";

const extendTo = (Base: typeof Component) =>
  class MockComponent extends Base {
    constructor(props: any) {
      super(props);
      // @ts-ignore
      this.state = this.initialState();
    }
    render() {
      return null;
    }
  };

describe("PageResolver", () => {
  const ExtendBase = pageResolver(Component);
  const MockComponent = extendTo(ExtendBase);

  const createMockProps = () => ({
    dataSize: 100,
    sizePerPageList: [
      { text: "10", value: 20 },
      { text: "30", value: 50 },
    ],
    currPage: 1,
    currSizePerPage: 10,
    pageStartIndex: 1,
    paginationSize: 5,
    withFirstAndLast: true,
    firstPageText: "<<",
    prePageText: "<",
    nextPageText: ">",
    lastPageText: ">>",
    alwaysShowAllBtns: false,
  });

  let wrapper: any;

  describe("initialize", () => {
    beforeEach(() => {
      const mockElement = React.createElement(
        MockComponent,
        createMockProps(),
        null
      );
      wrapper = shallow(mockElement);
    });

    it("should creating initial state correctly", () => {
      const instance = wrapper.instance();
      expect(instance.state.totalPages).toBeDefined();
      expect(instance.state.totalPages).toEqual(instance.calculateTotalPage());
      expect(instance.state.lastPage).toBeDefined();
      expect(instance.state.lastPage).toEqual(
        instance.calculateLastPage(instance.state.totalPages)
      );
    });
  });

  describe("backToPrevPage", () => {
    const props = createMockProps();

    describe("when props.currPage is not hitting props.pageStartIndex", () => {
      beforeEach(() => {
        props.currPage = 2;
        const mockElement = React.createElement(MockComponent, props, null);
        wrapper = shallow(mockElement);
      });

      it("should getting previous page correctly", () => {
        const instance = wrapper.instance();
        expect(instance.backToPrevPage()).toEqual(props.currPage - 1);
      });
    });

    describe("when props.currPage is hitting props.pageStartIndex", () => {
      beforeEach(() => {
        props.currPage = props.pageStartIndex;
        const mockElement = React.createElement(MockComponent, props, null);
        wrapper = shallow(mockElement);
      });

      it("should always getting page which must eq props.pageStartIndex", () => {
        const instance = wrapper.instance();
        expect(instance.backToPrevPage()).toEqual(props.pageStartIndex);
      });
    });
  });

  describe("calculateFromTo", () => {
    const props = createMockProps();
    beforeEach(() => {
      const mockElement = React.createElement(MockComponent, props, null);
      wrapper = shallow(mockElement);
    });

    it("should return correct array with from and to value", () => {
      const instance = wrapper.instance();
      expect(instance.calculateFromTo()).toEqual([1, props.currSizePerPage]);
    });

    describe("if data is empty", () => {
      beforeEach(() => {
        props.dataSize = 87;
        props.currPage = 9;
        const mockElement = React.createElement(MockComponent, props, null);
        wrapper = shallow(mockElement);
      });

      it("should return correct array with from and to value", () => {
        const instance = wrapper.instance();
        expect(instance.calculateFromTo()).toEqual([81, props.dataSize]);
      });
    });

    describe("if current page is last page", () => {
      beforeEach(() => {
        props.dataSize = 0;
        const mockElement = React.createElement(MockComponent, props, null);
        wrapper = shallow(mockElement);
      });

      it("should return correct array with from and to value", () => {
        const instance = wrapper.instance();
        expect(instance.calculateFromTo()).toEqual([0, 0]);
      });
    });
  });

  describe("calculateTotalPage", () => {
    const props = createMockProps();

    describe("when missing sizePerPage argument", () => {
      beforeEach(() => {
        const mockElement = React.createElement(MockComponent, props, null);
        wrapper = shallow(mockElement);
      });

      it("should getting total pages correctly by default props.currSizePerPage", () => {
        const instance = wrapper.instance();
        expect(instance.calculateTotalPage()).toEqual(10);
      });
    });

    describe("when sizePerPage argument given", () => {
      beforeEach(() => {
        const mockElement = React.createElement(MockComponent, props, null);
        wrapper = shallow(mockElement);
      });

      it("should getting total pages correctly by sizePerPage argument", () => {
        const instance = wrapper.instance();
        expect(instance.calculateTotalPage(25)).toEqual(4);
      });
    });
  });

  describe("calculateLastPage", () => {
    beforeEach(() => {
      const props = createMockProps();
      const mockElement = React.createElement(MockComponent, props, null);
      wrapper = shallow(mockElement);
    });

    it("should getting last page correctly", () => {
      const instance = wrapper.instance();
      expect(instance.calculateLastPage(instance.state.totalPages)).toEqual(10);
    });
  });

  describe("calculatePages", () => {
    describe("calculate by totalPages and lastPage", () => {
      const props = createMockProps();
      beforeEach(() => {
        const mockElement = React.createElement(MockComponent, props, null);
        wrapper = shallow(mockElement);
      });

      it("should getting pages list correctly", () => {
        const instance = wrapper.instance();
        expect(
          instance.calculatePages(
            instance.state.totalPages,
            instance.state.lastPage
          )
        ).toEqual([
          props.prePageText,
          1,
          2,
          3,
          4,
          5,
          props.nextPageText,
          props.lastPageText,
        ]);

        expect(instance.calculatePages(4, 4)).toEqual([
          props.prePageText,
          1,
          2,
          3,
          4,
          props.nextPageText,
        ]);
      });
    });

    describe("calculate by props.currPage", () => {
      const props = createMockProps();
      const { firstPageText, prePageText, nextPageText, lastPageText } = props;

      it("should getting pages list correctly", () => {
        const currPages = Array.from(Array(10).keys());
        currPages.forEach((currPage) => {
          props.currPage = currPage + 1;
          wrapper = shallow(<MockComponent {...props} />);
          const instance = wrapper.instance();
          const pageList = instance.calculatePages(
            instance.state.totalPages,
            instance.state.lastPage
          );

          if (props.currPage < 4) {
            expect(pageList).toEqual([
              prePageText,
              1,
              2,
              3,
              4,
              5,
              nextPageText,
              lastPageText,
            ]);
          } else if (props.currPage > 7) {
            expect(pageList).toEqual([
              firstPageText,
              prePageText,
              6,
              7,
              8,
              9,
              10,
              nextPageText,
            ]);
          } else if (props.currPage === 4) {
            expect(pageList).toEqual([
              firstPageText,
              prePageText,
              2,
              3,
              4,
              5,
              6,
              nextPageText,
              lastPageText,
            ]);
          } else if (props.currPage === 5) {
            expect(pageList).toEqual([
              firstPageText,
              prePageText,
              3,
              4,
              5,
              6,
              7,
              nextPageText,
              lastPageText,
            ]);
          } else if (props.currPage === 6) {
            expect(pageList).toEqual([
              firstPageText,
              prePageText,
              4,
              5,
              6,
              7,
              8,
              nextPageText,
              lastPageText,
            ]);
          } else {
            expect(pageList).toEqual([
              firstPageText,
              prePageText,
              5,
              6,
              7,
              8,
              9,
              nextPageText,
              lastPageText,
            ]);
          }
        });
      });
    });

    describe("the quantity of pages is calculated by props.paginationSize", () => {
      const props = createMockProps();
      const indicators = [
        props.firstPageText,
        props.prePageText,
        props.lastPageText,
        props.nextPageText,
      ];

      it("should getting pages list correctly", () => {
        [1, 3, 5, 8, 10].forEach((paginationSize) => {
          props.paginationSize = paginationSize;
          wrapper = shallow(<MockComponent {...props} />);
          const instance = wrapper.instance();
          const pageList = instance.calculatePages(
            instance.state.totalPages,
            instance.state.lastPage
          );
          const result = pageList.filter((p: any) => indicators.indexOf(p) === -1);
          expect(result.length).toEqual(props.paginationSize);
        });
      });
    });

    describe("when props.withFirstAndLast is true", () => {
      const props = createMockProps();
      describe("and last page is not visible by props.currPage", () => {
        it("should getting pages list which contain last page indication", () => {
          [1, 2, 3, 4, 5, 6, 7].forEach((currPage) => {
            props.currPage = currPage;
            wrapper = shallow(<MockComponent {...props} />);
            const instance = wrapper.instance();
            const pageList = instance.calculatePages(
              instance.state.totalPages,
              instance.state.lastPage
            );
            expect(pageList.indexOf(props.lastPageText) > -1).toBeTruthy();
          });
        });
      });

      describe("and first page is not visible by props.currPage", () => {
        it("should getting pages list which contain first page indication", () => {
          [10, 9, 8, 7, 6, 5, 4].forEach((currPage) => {
            props.currPage = currPage;
            wrapper = shallow(<MockComponent {...props} />);
            const instance = wrapper.instance();
            const pageList = instance.calculatePages(
              instance.state.totalPages,
              instance.state.lastPage
            );
            expect(pageList.indexOf(props.firstPageText) > -1).toBeTruthy();
          });
        });
      });
    });

    describe("when props.withFirstAndLast is false", () => {
      const props = createMockProps();
      it("should not contain first and last page indication always", () => {
        const currPages = Array.from(Array(10).keys());
        currPages.forEach((currPage) => {
          props.currPage = currPage + 1;
          props.withFirstAndLast = false;
          wrapper = shallow(<MockComponent {...props} />);
          const instance = wrapper.instance();
          const pageList = instance.calculatePages(
            instance.state.totalPages,
            instance.state.lastPage
          );
          expect(pageList.indexOf(props.lastPageText) > -1).toBeFalsy();
          expect(pageList.indexOf(props.firstPageText) > -1).toBeFalsy();
        });
      });
    });

    describe("when props.pageStartIndex is negative number", () => {
      const props = createMockProps();
      props.pageStartIndex = -2;
      props.currPage = -2;

      beforeEach(() => {
        const mockElement = React.createElement(MockComponent, props, null);
        wrapper = shallow(mockElement);
      });

      it("should getting last page correctly", () => {
        const instance = wrapper.instance();
        const pageList = instance.calculatePages(
          instance.state.totalPages,
          instance.state.lastPage
        );
        expect(pageList).toEqual([
          props.prePageText,
          -2,
          -1,
          0,
          1,
          2,
          props.nextPageText,
          props.lastPageText,
        ]);
      });
    });

    describe("when props.alwaysShowAllBtns is true", () => {
      const props = createMockProps();
      props.alwaysShowAllBtns = true;
      props.currPage = 1;
      props.dataSize = 11;

      beforeEach(() => {
        const mockElement = React.createElement(MockComponent, props, null);
        wrapper = shallow(mockElement);
      });

      it("should always having next and previous page indication", () => {
        const instance = wrapper.instance();
        const pageList = instance.calculatePages(
          instance.state.totalPages,
          instance.state.lastPage
        );
        expect(pageList.indexOf(props.nextPageText) > -1).toBeTruthy();
        expect(pageList.indexOf(props.prePageText) > -1).toBeTruthy();
      });
    });

    describe("when state.totalPages is zero", () => {
      const props = createMockProps();
      props.dataSize = 0;

      beforeEach(() => {
        const mockElement = React.createElement(MockComponent, props, null);
        wrapper = shallow(mockElement);
      });

      it("should getting empty array", () => {
        const instance = wrapper.instance();
        const pageList = instance.calculatePages(
          instance.state.totalPages,
          instance.state.lastPage
        );
        expect(pageList).toEqual([]);
      });
    });
  });

  describe("calculatePageStatus", () => {
    let instance: any;
    let pageStatus: any;

    describe("default case", () => {
      const props = createMockProps();
      beforeEach(() => {
        const mockElement = React.createElement(MockComponent, props, null);
        wrapper = shallow(mockElement);
        instance = wrapper.instance();
        const pageList = instance.calculatePages(
          instance.state.totalPages,
          instance.state.lastPage
        );
        pageStatus = instance.calculatePageStatus(
          pageList,
          instance.state.lastPage
        );
      });

      it("should returning correct format for page status", () => {
        pageStatus.forEach((p: any) => {
          expect(Object.prototype.hasOwnProperty.call(p, "page")).toBeTruthy();
          expect(
            Object.prototype.hasOwnProperty.call(p, "active")
          ).toBeTruthy();
          expect(
            Object.prototype.hasOwnProperty.call(p, "disabled")
          ).toBeTruthy();
          expect(Object.prototype.hasOwnProperty.call(p, "title")).toBeTruthy();
        });
      });

      it("should mark active status as true when it is props.currPage", () => {
        expect(
          pageStatus.find((p: any) => p.page === props.currPage).active
        ).toBeTruthy();
      });

      it("only have one page's active status is true", () => {
        expect(
          pageStatus.filter((p: any) => p.page === props.currPage).length
        ).toEqual(1);
      });
    });

    describe("when alwaysShowAllBtns is false", () => {
      const props = createMockProps();
      describe("and props.currPage is on first page", () => {
        it("should filter out previous page indication", () => {
          const mockElement = React.createElement(MockComponent, props, null);
          wrapper = shallow(mockElement);
          instance = wrapper.instance();
          const pageList = instance.calculatePages(
            instance.state.totalPages,
            instance.state.lastPage
          );
          pageStatus = instance.calculatePageStatus(
            pageList,
            instance.state.lastPage
          );

          expect(
            pageStatus.find((p: any) => p.page === props.prePageText)
          ).not.toBeDefined();
        });
      });

      describe("and props.currPage is on last page", () => {
        it("should filter out next page indication", () => {
          props.currPage = 10;
          const mockElement = React.createElement(MockComponent, props, null);
          wrapper = shallow(mockElement);
          instance = wrapper.instance();
          const pageList = instance.calculatePages(
            instance.state.totalPages,
            instance.state.lastPage
          );
          pageStatus = instance.calculatePageStatus(
            pageList,
            instance.state.lastPage
          );

          expect(
            pageStatus.find((p: any) => p.page === props.nextPageText)
          ).not.toBeDefined();
        });
      });
    });
  });

  describe("calculateSizePerPageStatus", () => {
    describe("when props.sizePerPageList is an number array", () => {
      const props = createMockProps();
      beforeEach(() => {
        const mockElement = React.createElement(MockComponent, props, null);
        wrapper = shallow(mockElement);
      });

      it("should getting correctly sizePerPage status", () => {
        const instance = wrapper.instance();
        const result = instance.calculateSizePerPageStatus();
        expect(result.length).toEqual(props.sizePerPageList.length);
        result.forEach((sizePerPage: any, i: number) => {
          expect(sizePerPage.text).toEqual(`${props.sizePerPageList[i].text}`);
          expect(sizePerPage.page).toEqual(props.sizePerPageList[i].value);
        });
      });
    });

    describe("when props.sizePerPageList is an object array", () => {
      const props = createMockProps();
      props.sizePerPageList = [
        {
          text: "ten",
          value: 10,
        },
        {
          text: "thirty",
          value: 30,
        },
      ];

      beforeEach(() => {
        const mockElement = React.createElement(MockComponent, props, null);
        wrapper = shallow(mockElement);
      });

      it("should getting correctly sizePerPage status", () => {
        const instance = wrapper.instance();
        const result = instance.calculateSizePerPageStatus();
        expect(result.length).toEqual(props.sizePerPageList.length);
        result.forEach((sizePerPage: any, i: number) => {
          expect(sizePerPage.text).toEqual(props.sizePerPageList[i].text);
          expect(sizePerPage.page).toEqual(props.sizePerPageList[i].value);
        });
      });
    });
  });
});
