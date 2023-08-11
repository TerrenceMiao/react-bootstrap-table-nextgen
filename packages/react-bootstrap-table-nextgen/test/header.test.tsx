import 'jsdom-global/register';
import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow, mount } from 'enzyme';

// @ts-expect-error TS(6142): Module '../src/header-cell' was resolved to '/User... Remove this comment to see the full error message
import HeaderCell from '../src/header-cell';
// @ts-expect-error TS(6142): Module '../src/row-selection/selection-header-cell... Remove this comment to see the full error message
import SelectionHeaderCell from '../src/row-selection/selection-header-cell';
// @ts-expect-error TS(6142): Module '../src/row-expand/expand-header-cell' was ... Remove this comment to see the full error message
import ExpandHeaderCell from '../src/row-expand/expand-header-cell';
// @ts-expect-error TS(6142): Module '../src/contexts/selection-context' was res... Remove this comment to see the full error message
import SelectionContext from '../src/contexts/selection-context';
// @ts-expect-error TS(6142): Module '../src/contexts/row-expand-context' was re... Remove this comment to see the full error message
import ExpansionContext from '../src/contexts/row-expand-context';
// @ts-expect-error TS(6142): Module '../src/header' was resolved to '/Users/ter... Remove this comment to see the full error message
import Header from '../src/header';
import Const from '../src/const';
import mockHeaderResolvedProps from './test-helpers/mock/header-resolved-props';

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('Header', () => {
  let wrapper: any;
  const columns = [{
    dataField: 'id',
    text: 'ID'
  }, {
    dataField: 'name',
    text: 'Name'
  }];

  const data = [{
    id: 1,
    name: 'A'
  }, {
    id: 2,
    name: 'B'
  }];

  const keyField = 'id';

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('simplest header', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      wrapper = shallow(<Header { ...mockHeaderResolvedProps } columns={ columns } />);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render successfully', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('tr').length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find(HeaderCell).length).toBe(columns.length);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('className prop is exists', () => {
    const className = 'test-class';

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Header
          { ...mockHeaderResolvedProps }
          columns={ columns }
          className={ className }
        />
      );
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render successfully', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find(`.${className}`).length).toBe(1);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('header with columns enable sort', () => {
    const sortField = columns[1].dataField;

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Header
          { ...mockHeaderResolvedProps }
          columns={ columns }
          sortField={ sortField }
          sortOrder={ Const.SORT_ASC }
        />);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('The HeaderCell should receive correct sorting props', () => {
      const headerCells = wrapper.find(HeaderCell);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(headerCells.length).toBe(columns.length);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(headerCells.at(0).prop('sorting')).toBe(false);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(headerCells.at(1).prop('sorting')).toBe(true);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(headerCells.at(1).prop('sortOrder')).toBe(Const.SORT_ASC);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('selectRow', () => {
    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when selectRow.mode is ROW_SELECT_DISABLED (row is not able to select)', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Header
            { ...mockHeaderResolvedProps }
            columns={ columns }
          />
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should not render <SelectionHeaderCell />', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(SelectionHeaderCell).length).toBe(0);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when selectRow.mode is radio (single selection)', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        const selectRow = { mode: 'radio' };
        wrapper = mount(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SelectionContext.Provider
            data={ data }
            keyField={ keyField }
            selectRow={ selectRow }
          >
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Header
              { ...mockHeaderResolvedProps }
              columns={ columns }
              selectRow={ selectRow }
            />
          </SelectionContext.Provider>
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render <SelectionHeaderCell />', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(SelectionHeaderCell).length).toBe(1);
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('when selectRow.hideSelectColumn is true', () => {
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          const selectRow = { mode: 'radio', hideSelectColumn: true };
          wrapper = mount(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <SelectionContext.Provider
              data={ data }
              keyField={ keyField }
              selectRow={ selectRow }
            >
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Header
                { ...mockHeaderResolvedProps }
                columns={ columns }
                selectRow={ selectRow }
              />
            </SelectionContext.Provider>
          );
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should not render <SelectionHeaderCell />', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(SelectionHeaderCell).length).toBe(0);
        });
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when selectRow.mode is checkbox (multiple selection)', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        const selectRow = { mode: 'checkbox' };
        wrapper = mount(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SelectionContext.Provider
            data={ data }
            keyField={ keyField }
            selectRow={ selectRow }
          >
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Header
              { ...mockHeaderResolvedProps }
              columns={ columns }
              selectRow={ selectRow }
            />
          </SelectionContext.Provider>
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render <SelectionHeaderCell />', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(SelectionHeaderCell).length).toBe(1);
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('when selectRow.hideSelectColumn is true', () => {
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          const selectRow = { mode: 'checkbox', hideSelectColumn: true };
          wrapper = mount(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <SelectionContext.Provider
              data={ data }
              keyField={ keyField }
              selectRow={ selectRow }
            >
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Header
                { ...mockHeaderResolvedProps }
                columns={ columns }
                selectRow={ selectRow }
              />
            </SelectionContext.Provider>
          );
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should not render <SelectionHeaderCell />', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(SelectionHeaderCell).length).toBe(0);
        });
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('expandRow', () => {
    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when expandRow.showExpandColumn is false', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Header
            { ...mockHeaderResolvedProps }
            columns={ columns }
          />
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should not render <ExpandHeaderCell />', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(ExpandHeaderCell).length).toBe(0);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when expandRow.showExpandColumn is true', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        const expandRow = { renderer: jest.fn(), expanded: [], showExpandColumn: true };
        wrapper = mount(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <ExpansionContext.Provider
            data={ data }
            keyField={ keyField }
            expandRow={ expandRow }
          >
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Header
              { ...mockHeaderResolvedProps }
              columns={ columns }
              expandRow={ expandRow }
            />
          </ExpansionContext.Provider>
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render <ExpandHeaderCell /> correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(ExpandHeaderCell).length).toBe(1);
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
          <ExpansionContext.Provider
            data={ data }
            keyField={ keyField }
            expandRow={ expandRow }
          >
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Header
              { ...mockHeaderResolvedProps }
              columns={ columns }
              expandRow={ expandRow }
            />
          </ExpansionContext.Provider>
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render expansion column correctly', () => {
        const header = wrapper.find(Header).children();
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(header.children().children().last().find(ExpandHeaderCell)).toHaveLength(1);
      });
    });
  });
});
