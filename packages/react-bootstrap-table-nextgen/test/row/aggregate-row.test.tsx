import 'jsdom-global/register';
import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { mount } from 'enzyme';
import mockBodyResolvedProps from '../test-helpers/mock/body-resolved-props';
// @ts-expect-error TS(6142): Module '../../src/contexts/selection-context' was ... Remove this comment to see the full error message
import SelectionContext from '../../src/contexts/selection-context';
// @ts-expect-error TS(6142): Module '../../src/contexts/row-expand-context' was... Remove this comment to see the full error message
import ExpansionContext from '../../src/contexts/row-expand-context';
// @ts-expect-error TS(6142): Module '../../src/row-selection/row-consumer' was ... Remove this comment to see the full error message
import bindSelection from '../../src/row-selection/row-consumer';
// @ts-expect-error TS(6142): Module '../../src/row-expand/row-consumer' was res... Remove this comment to see the full error message
import bindExpansion from '../../src/row-expand/row-consumer';
// @ts-expect-error TS(6142): Module '../../src/row-expand/expand-cell' was reso... Remove this comment to see the full error message
import ExpandCell from '../../src/row-expand/expand-cell';
// @ts-expect-error TS(6142): Module '../../src/row-selection/selection-cell' wa... Remove this comment to see the full error message
import SelectionCell from '../../src/row-selection/selection-cell';
// @ts-expect-error TS(6142): Module '../../src/row/aggregate-row' was resolved ... Remove this comment to see the full error message
import RowAggregator from '../../src/row/aggregate-row';
import Const from '../../src/const';

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('Row Aggregator', () => {
  let wrapper: any;
  let rowAggregator: any;
  const RowAggregatorWithSelection = bindSelection(RowAggregator);
  const RowAggregatorWithExpansion = bindExpansion(RowAggregator);

  const data = [{
    id: 1,
    name: 'A'
  }, {
    id: 2,
    name: 'B'
  }, {
    id: 3,
    name: 'C'
  }];
  const columns = [{
    dataField: 'id',
    text: 'ID'
  }, {
    dataField: 'name',
    text: 'Name'
  }];
  const rowIndex = 1;
  const row = data[rowIndex];
  const keyField = 'id';

  const getBaseProps = () => ({
    row,
    value: row[keyField],
    columns,
    keyField,
    rowIndex,
    ...mockBodyResolvedProps
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when selectRow is enable', () => {
    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if props.selectRow.hideSelectColumn is false', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        const selectRow = { mode: 'radio' };
        wrapper = mount(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <RowAggregatorWithSelection { ...getBaseProps() } />
          </SelectionContext.Provider>
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render RowAggregator correctly', () => {
        rowAggregator = wrapper.find(RowAggregator);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(rowAggregator).toHaveLength(1);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render selection column correctly', () => {
        const selectionCell = wrapper.find(SelectionCell);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(selectionCell).toHaveLength(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(selectionCell.props().selected).toEqual(rowAggregator.props().selected);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(selectionCell.props().disabled).toEqual(!rowAggregator.props().selectable);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if props.selectRow.hideSelectColumn is true', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        const selectRow = { mode: 'radio', hideSelectColumn: true };
        wrapper = mount(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <RowAggregatorWithSelection { ...getBaseProps() } />
          </SelectionContext.Provider>
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render RowAggregator correctly', () => {
        rowAggregator = wrapper.find(RowAggregator);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(rowAggregator).toHaveLength(1);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should not render selection column', () => {
        const selectionCell = wrapper.find(SelectionCell);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(selectionCell).toHaveLength(0);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if props.selectRow.clickToSelect is defined', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        const selectRow = { mode: 'radio', clickToSelect: true };
        wrapper = mount(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <RowAggregatorWithSelection { ...getBaseProps() } />
          </SelectionContext.Provider>
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render RowAggregator correctly', () => {
        rowAggregator = wrapper.find(RowAggregator);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(rowAggregator).toHaveLength(1);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should add onClick prop to Row Component', () => {
        const tr = wrapper.find('tr');
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(tr).toHaveLength(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(tr.props().onClick).toBeDefined();
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when expandRow is enable', () => {
    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if props.expandRow.showExpandColumn is false', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        const expandRow = { renderer: jest.fn() };
        wrapper = mount(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <ExpansionContext.Provider data={ data } keyField={ keyField } expandRow={ expandRow }>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <RowAggregatorWithExpansion { ...getBaseProps() } />
          </ExpansionContext.Provider>
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render RowAggregator correctly', () => {
        rowAggregator = wrapper.find(RowAggregator);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(rowAggregator).toHaveLength(1);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should not render expansion column', () => {
        const expandCell = wrapper.find(ExpandCell);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(expandCell).toHaveLength(0);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if props.expandRow.showExpandColumn is true', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        const expandRow = { renderer: jest.fn(), showExpandColumn: true };
        wrapper = mount(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <ExpansionContext.Provider data={ data } keyField={ keyField } expandRow={ expandRow }>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <RowAggregatorWithExpansion { ...getBaseProps() } />
          </ExpansionContext.Provider>
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render RowAggregator correctly', () => {
        rowAggregator = wrapper.find(RowAggregator);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(rowAggregator).toHaveLength(1);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render expansion column correctly', () => {
        const expandCell = wrapper.find(ExpandCell);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(expandCell).toHaveLength(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(expandCell.props().expanded).toEqual(rowAggregator.props().expanded);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if props.expandRow.showExpandColumn is true but props.expandRow.expandColumnPosition is "right"', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        const expandRow = {
          // @ts-expect-error TS(2304): Cannot find name 'jest'.
          renderer: jest.fn(),
          showExpandColumn: true,
          expandColumnPosition: Const.INDICATOR_POSITION_RIGHT
        };
        wrapper = mount(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <ExpansionContext.Provider data={ data } keyField={ keyField } expandRow={ expandRow }>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <RowAggregatorWithExpansion { ...getBaseProps() } />
          </ExpansionContext.Provider>
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render expansion column correctly', () => {
        rowAggregator = wrapper.find(RowAggregator);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(rowAggregator).toHaveLength(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(rowAggregator.children().children().last().type()).toEqual(ExpandCell);
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('createClickEventHandler', () => {
    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if props.attrs.onClick is defined', () => {
      // @ts-expect-error TS(2304): Cannot find name 'jest'.
      const attrs = { onClick: jest.fn() };

      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        const selectRow = { mode: 'radio' };
        wrapper = mount(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <RowAggregatorWithSelection { ...getBaseProps() } attrs={ attrs } />
          </SelectionContext.Provider>
        );
        wrapper.find('tr').simulate('click');
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call attrs.onClick correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(attrs.onClick).toHaveBeenCalledTimes(1);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if props.selectRow.clickToSelect is true', () => {
      const selectRow = { mode: 'radio', clickToSelect: true };
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        wrapper = mount(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <RowAggregatorWithSelection { ...getBaseProps() } />
          </SelectionContext.Provider>
        );
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        wrapper.find(RowAggregator).props().selectRow.onRowSelect = jest.fn();
        wrapper.find('tr').simulate('click');
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call selectRow.onRowSelect correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(RowAggregator).props().selectRow.onRowSelect).toHaveBeenCalledTimes(1);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if props.selectRow.clickToSelect is true', () => {
      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('but selectable props is false', () => {
        const selectRow = { mode: 'radio', clickToSelect: true, nonSelectable: [row[keyField]] };
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          wrapper = mount(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <RowAggregatorWithSelection { ...getBaseProps() } />
            </SelectionContext.Provider>
          );
          // @ts-expect-error TS(2304): Cannot find name 'jest'.
          wrapper.find(RowAggregator).props().selectRow.onRowSelect = jest.fn();
          wrapper.find('tr').simulate('click');
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should call selectRow.onRowSelect correctly', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(RowAggregator).props().selectRow.onRowSelect)
            .toHaveBeenCalledTimes(0);
        });
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if props.expandRow is not defined', () => {
      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('but expandable props is false', () => {
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        const expandRow = { renderer: jest.fn(), nonExpandable: [row[keyField]] };
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          wrapper = mount(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <ExpansionContext.Provider data={ data } keyField={ keyField } expandRow={ expandRow }>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <RowAggregatorWithExpansion { ...getBaseProps() } />
            </ExpansionContext.Provider>
          );
          // @ts-expect-error TS(2304): Cannot find name 'jest'.
          wrapper.find(RowAggregator).props().expandRow.onRowExpand = jest.fn();
          wrapper.find('tr').simulate('click');
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should call expandRow.onRowExpand correctly', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(RowAggregator).props().expandRow.onRowExpand)
            .toHaveBeenCalledTimes(0);
        });
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if props.expandRow is defined', () => {
      // @ts-expect-error TS(2304): Cannot find name 'jest'.
      const expandRow = { renderer: jest.fn() };
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        wrapper = mount(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <ExpansionContext.Provider data={ data } keyField={ keyField } expandRow={ expandRow }>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <RowAggregatorWithExpansion { ...getBaseProps() } />
          </ExpansionContext.Provider>
        );
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        wrapper.find(RowAggregator).props().expandRow.onRowExpand = jest.fn();
        wrapper.find('tr').simulate('click');
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call expandRow.onRowExpand correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(RowAggregator).props().expandRow.onRowExpand).toHaveBeenCalledTimes(1);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if props.attrs.onClick and props.expandRow both are defined', () => {
      // @ts-expect-error TS(2304): Cannot find name 'jest'.
      const attrs = { onClick: jest.fn() };
      // @ts-expect-error TS(2304): Cannot find name 'jest'.
      const expandRow = { renderer: jest.fn() };

      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        wrapper = mount(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <ExpansionContext.Provider data={ data } keyField={ keyField } expandRow={ expandRow }>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <RowAggregatorWithExpansion { ...getBaseProps() } attrs={ attrs } />
          </ExpansionContext.Provider>
        );
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        wrapper.find(RowAggregator).props().expandRow.onRowExpand = jest.fn();
        wrapper.find('tr').simulate('click');
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call attrs.onClick and expandRow.onRowExpand correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(attrs.onClick).toHaveBeenCalledTimes(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(RowAggregator).props().expandRow.onRowExpand).toHaveBeenCalledTimes(1);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if props.attrs.onClick and props.selectRow.clickToSelect both are defined', () => {
      // @ts-expect-error TS(2304): Cannot find name 'jest'.
      const attrs = { onClick: jest.fn() };
      const selectRow = { mode: 'radio', clickToSelect: true };

      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        wrapper = mount(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <RowAggregatorWithSelection { ...getBaseProps() } attrs={ attrs } />
          </SelectionContext.Provider>
        );
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        wrapper.find(RowAggregator).props().selectRow.onRowSelect = jest.fn();
        wrapper.find('tr').simulate('click');
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call attrs.onClick and selectRow.onRowSelect correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(attrs.onClick).toHaveBeenCalledTimes(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(RowAggregator).props().selectRow.onRowSelect).toHaveBeenCalledTimes(1);
      });
    });
  });
});
