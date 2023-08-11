import 'jsdom-global/register';
import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import Const from '../../src/const';
import dataOperator from '../../src/store/operators';
// @ts-expect-error TS(6142): Module '../../src/bootstrap-table' was resolved to... Remove this comment to see the full error message
import BootstrapTable from '../../src/bootstrap-table';
// @ts-expect-error TS(6142): Module '../../src/contexts/sort-context' was resol... Remove this comment to see the full error message
import createSortContext from '../../src/contexts/sort-context';

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('SortContext', () => {
  let wrapper: any;
  let columns: any;
  let SortContext: any;

  let data: any;

  // @ts-expect-error TS(2304): Cannot find name 'jest'.
  const mockBase = jest.fn(((props: any) => <BootstrapTable
    data={ data }
    columns={ columns }
    keyField="id"
    { ...props }
  />));

  // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
  beforeEach(() => {
    data = [{
      id: 1,
      name: 'A'
    }, {
      id: 2,
      name: 'B'
    }];
    columns = [{
      dataField: 'id',
      text: 'ID',
      sort: true
    }, {
      dataField: 'name',
      text: 'Name',
      sort: true
    }];
  });

  // @ts-expect-error TS(2304): Cannot find name 'jest'.
  const handleRemoteSortChange = jest.fn();

  function shallowContext(enableRemote = false, providerProps = {}) {
    handleRemoteSortChange.mockReset();
    mockBase.mockReset();
    SortContext = createSortContext(
      dataOperator,
      // @ts-expect-error TS(2304): Cannot find name 'jest'.
      jest.fn().mockReturnValue(enableRemote),
      handleRemoteSortChange
    );
    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <SortContext.Provider
        columns={ columns }
        data={ data }
        { ...providerProps }
      >
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <SortContext.Consumer>
          {
            (sortProps: any) => mockBase(sortProps)
          }
        </SortContext.Consumer>
      </SortContext.Provider>
    );
  }

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('default render', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(shallowContext());
      wrapper.render();
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should have correct Provider property after calling createSortContext', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(SortContext.Provider).toBeDefined();
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should have correct Consumer property after calling createSortContext', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(SortContext.Consumer).toBeDefined();
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should have correct state.sortOrder', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.state().sortOrder).toBe(undefined);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should have correct state.sortColumn', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.state().sortColumn).toBe(undefined);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should pass correct sort props to children element', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(mockBase).toHaveBeenCalledWith({
        data,
        sortOrder: undefined,
        onSort: wrapper.instance().handleSort,
        sortField: null
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('handleSort function', () => {
    let sortColumn: any;
    let nextOrderSpy: any;

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      sortColumn = columns[0];
      // @ts-expect-error TS(2304): Cannot find name 'jest'.
      nextOrderSpy = jest.spyOn(dataOperator, 'nextOrder');
    });

    // @ts-expect-error TS(2304): Cannot find name 'afterEach'.
    afterEach(() => {
      nextOrderSpy.mockRestore();
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when remote.sort is false', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        wrapper = shallow(shallowContext());
        wrapper.render();
        wrapper.instance().handleSort(sortColumn);
        wrapper.update();
        wrapper.render();
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should set state correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.state().sortColumn).toEqual(sortColumn);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.state().sortOrder).toEqual(Const.SORT_DESC);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call dataOperator.nextOrder correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(nextOrderSpy).toHaveBeenCalledTimes(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(nextOrderSpy).toHaveBeenCalledWith(
          sortColumn,
          { sortColumn: undefined, sortOrder: undefined },
          wrapper.props().defaultSortDirection
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should pass correct sort props to children element', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.length).toBe(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(mockBase).toHaveBeenLastCalledWith({
          data: data.reverse(),
          sortOrder: wrapper.state().sortOrder,
          onSort: wrapper.instance().handleSort,
          sortField: wrapper.state().sortColumn.dataField
        });
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when remote.sort is true', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        wrapper = shallow(shallowContext(true));
        wrapper.render();

        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        nextOrderSpy = jest.spyOn(dataOperator, 'nextOrder');
        wrapper.instance().handleSort(sortColumn);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should set state correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.state().sortColumn).toEqual(sortColumn);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.state().sortOrder).toEqual(Const.SORT_DESC);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call dataOperator.nextOrder correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(nextOrderSpy).toHaveBeenCalledTimes(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(nextOrderSpy).toHaveBeenCalledWith(
          sortColumn,
          { sortColumn: undefined, sortOrder: undefined },
          wrapper.props().defaultSortDirection
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should calling handleRemoteSortChange correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(handleRemoteSortChange).toHaveBeenCalledTimes(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(handleRemoteSortChange).toHaveBeenCalledWith(sortColumn.dataField, Const.SORT_DESC);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when column.onSort prop is defined', () => {
      // @ts-expect-error TS(2304): Cannot find name 'jest'.
      const onSortCB = jest.fn();

      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        columns[0].onSort = onSortCB;
        wrapper = shallow(shallowContext());
        wrapper.instance().handleSort(sortColumn);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should calling column.onSort function correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(onSortCB).toHaveBeenCalledTimes(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(onSortCB).toHaveBeenCalledWith(columns[0].dataField, Const.SORT_DESC);

        wrapper.instance().handleSort(sortColumn);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(onSortCB).toHaveBeenCalledTimes(2);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(onSortCB).toHaveBeenCalledWith(columns[0].dataField, Const.SORT_ASC);
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when defaultSorted prop is defined', () => {
    const defaultSorted = [{
      dataField: 'name',
      order: Const.SORT_DESC
    }];

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(shallowContext(false, { defaultSorted }));
      wrapper.render();
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should pass correct sort props to children element', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(mockBase).toHaveBeenLastCalledWith({
        data: data.reverse(),
        sortOrder: wrapper.state().sortOrder,
        onSort: wrapper.instance().handleSort,
        sortField: wrapper.state().sortColumn.dataField
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should have correct state.sortOrder', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.state().sortOrder).toBe(defaultSorted[0].order);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should have correct state.sortColumn', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.state().sortColumn).toBe(columns[1]);
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when column.onSort prop is defined', () => {
      // @ts-expect-error TS(2304): Cannot find name 'jest'.
      const onSortCB = jest.fn();

      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        columns[1].onSort = onSortCB;
        wrapper = shallow(shallowContext(false, { defaultSorted }));
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should calling column.onSort function correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(onSortCB).toHaveBeenCalledTimes(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(onSortCB).toHaveBeenCalledWith(defaultSorted[0].dataField, defaultSorted[0].order);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when remote.sort is true', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        wrapper = shallow(shallowContext(true, { defaultSorted }));
        wrapper.render();
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should calling handleRemoteSortChange correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(handleRemoteSortChange).toHaveBeenCalledTimes(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(handleRemoteSortChange)
          .toHaveBeenCalledWith(defaultSorted[0].dataField, defaultSorted[0].order);
      });
    });
  });
});
