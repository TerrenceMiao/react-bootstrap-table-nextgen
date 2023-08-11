import 'jsdom-global/register';
import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import dataOperator from '../../src/store/operators';
// @ts-expect-error TS(6142): Module '../../src/bootstrap-table' was resolved to... Remove this comment to see the full error message
import BootstrapTable from '../../src/bootstrap-table';
// @ts-expect-error TS(6142): Module '../../src/contexts/selection-context' was ... Remove this comment to see the full error message
import SelectionContext from '../../src/contexts/selection-context';

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('DataContext', () => {
  let wrapper: any;

  const data = [{
    id: 1,
    name: 'A'
  }, {
    id: 2,
    name: 'B'
  }, {
    id: 3,
    name: 'B'
  }];

  const keyField = 'id';

  const columns = [{
    dataField: 'id',
    text: 'ID'
  }, {
    dataField: 'name',
    text: 'Name'
  }];

  // @ts-expect-error TS(2304): Cannot find name 'jest'.
  const mockBase = jest.fn(((props: any) => <BootstrapTable
    data={ data }
    columns={ columns }
    keyField={ keyField }
    { ...props }
  />));

  const defaultSelectRow = {
    mode: 'checkbox'
  };

  function shallowContext(selectRow = defaultSelectRow) {
    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <SelectionContext.Provider
        data={ data }
        keyField={ keyField }
        selectRow={ selectRow }
      >
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <SelectionContext.Consumer>
          {
            (selectionProps: any) => mockBase(selectionProps)
          }
        </SelectionContext.Consumer>
      </SelectionContext.Provider>
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
    it('should have correct Provider property after calling createSelectionContext', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(SelectionContext.Provider).toBeDefined();
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should have correct Consumer property after calling createSelectionContext', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(SelectionContext.Consumer).toBeDefined();
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should have correct this.selected', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().selected).toEqual([]);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should pass correct sort props to children element', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(mockBase).toHaveBeenCalledWith({
        ...defaultSelectRow,
        selected: wrapper.instance().selected,
        onRowSelect: wrapper.instance().handleRowSelect,
        onAllRowsSelect: wrapper.instance().handleAllRowsSelect,
        allRowsNotSelected: true,
        allRowsSelected: false,
        checkedStatus: 'unchecked'
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('componentWillReceiveProps', () => {
    const newSelectRow = {
      ...defaultSelectRow,
      selected: [1]
    };

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(shallowContext());
      wrapper.instance().UNSAFE_componentWillReceiveProps({
        selectRow: newSelectRow
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should have correct this.selected', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().selected).toEqual(newSelectRow.selected);
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if nextProps.selectRow is not existing', () => {
      const defaultSelected = [1];
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        wrapper = shallow(shallowContext({
          ...defaultSelectRow,
          // @ts-expect-error TS(2345): Argument of type '{ selected: number[]; mode: stri... Remove this comment to see the full error message
          selected: defaultSelected
        }));
        wrapper.instance().UNSAFE_componentWillReceiveProps({
          selectRow: defaultSelectRow
        });
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should keep origin this.selected', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().selected).toEqual(defaultSelected);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if nextProps.selectRow is not existing', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        wrapper = shallow(shallowContext());
        wrapper.instance().UNSAFE_componentWillReceiveProps({});
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should not set this.selected', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().selected).toEqual([]);
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when selectRow.selected prop is defined', () => {
    let selectRow: any;

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      selectRow = {
        ...defaultSelectRow,
        selected: [1]
      };
      wrapper = shallow(shallowContext(selectRow));
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should have correct this.selected', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().selected).toEqual(selectRow.selected);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('handleRowSelect', () => {
    const rowIndex = 1;
    const firstSelectedRow = data[0][keyField];
    const secondSelectedRow = data[1][keyField];

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when selectRow.mode is \'radio\'', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        const selectRow = { mode: 'radio' };
        wrapper = shallow(shallowContext(selectRow));
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should set this.selected correctly', () => {
        wrapper.instance().handleRowSelect(firstSelectedRow, true, rowIndex);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().selected).toEqual([firstSelectedRow]);

        wrapper.instance().handleRowSelect(secondSelectedRow, true, rowIndex);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().selected).toEqual([secondSelectedRow]);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when selectRow.mode is \'checkbox\'', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        wrapper = shallow(shallowContext());
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should set this.selected correctly', () => {
        wrapper.instance().handleRowSelect(firstSelectedRow, true, rowIndex);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().selected).toEqual(expect.arrayContaining([firstSelectedRow]));

        wrapper.instance().handleRowSelect(secondSelectedRow, true, rowIndex);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().selected)
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          .toEqual(expect.arrayContaining([firstSelectedRow, secondSelectedRow]));

        wrapper.instance().handleRowSelect(firstSelectedRow, false, rowIndex);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().selected).toEqual(expect.arrayContaining([secondSelectedRow]));

        wrapper.instance().handleRowSelect(secondSelectedRow, false, rowIndex);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().selected).toEqual([]);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when selectRow.onSelect is defined', () => {
      // @ts-expect-error TS(2304): Cannot find name 'jest'.
      const onSelect = jest.fn();
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        wrapper = shallow(shallowContext({
          ...defaultSelectRow,
          // @ts-expect-error TS(2345): Argument of type '{ onSelect: any; mode: string; }... Remove this comment to see the full error message
          onSelect
        }));
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('call selectRow.onSelect correctly', () => {
        const e = { target: {} };
        const row = dataOperator.getRowByRowId(data, keyField, firstSelectedRow);
        wrapper.instance().handleRowSelect(firstSelectedRow, true, rowIndex, e);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(onSelect).toHaveBeenCalledWith(row, true, rowIndex, e);
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('handleAllRowsSelect', () => {
    const e = { target: {} };

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when isUnSelect argument is false', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        wrapper = shallow(shallowContext());
        wrapper.instance().handleAllRowsSelect(e, false);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should set this.selected correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().selected).toEqual(data.map(d => d[keyField]));
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('when selectRow.onSelectAll is defined', () => {
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        const onSelectAll = jest.fn();
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          wrapper = shallow(shallowContext({
            ...defaultSelectRow,
            // @ts-expect-error TS(2345): Argument of type '{ onSelectAll: any; mode: string... Remove this comment to see the full error message
            onSelectAll
          }));
          wrapper.instance().handleAllRowsSelect(e, false);
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should call selectRow.onSelectAll correctly', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(onSelectAll).toHaveBeenCalledWith(
            true,
            dataOperator.getSelectedRows(data, keyField, wrapper.instance().selected),
            e
          );
        });
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when isUnSelect argument is true', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        wrapper = shallow(shallowContext({
          ...defaultSelectRow,
          // @ts-expect-error TS(2345): Argument of type '{ selected: number[]; mode: stri... Remove this comment to see the full error message
          selected: data.map(d => d[keyField])
        }));
        wrapper.instance().handleAllRowsSelect(e, true);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should set this.selected correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().selected).toEqual([]);
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('when selectRow.onSelectAll is defined', () => {
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        const onSelectAll = jest.fn();
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          wrapper = shallow(shallowContext({
            ...defaultSelectRow,
            // @ts-expect-error TS(2345): Argument of type '{ selected: number[]; onSelectAl... Remove this comment to see the full error message
            selected: data.map(d => d[keyField]),
            onSelectAll
          }));
          wrapper.instance().handleAllRowsSelect(e, true);
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should call selectRow.onSelectAll correctly', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(onSelectAll).toHaveBeenCalledWith(
            false,
            dataOperator.getSelectedRows(data, keyField, data.map(d => d[keyField])),
            e
          );
        });
      });
    });
  });
});
